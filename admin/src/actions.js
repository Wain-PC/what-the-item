import { gql } from "apollo-boost";

import {
  LOAD_TOP_PLAYERS_SUCCESS,
  SET_SCREEN_DASHBOARD,
  SET_SCREEN_TOP_PLAYERS,
  SET_SCREEN_GAMES,
  LOAD_GAMES_SUCCESS,
  SET_SCREEN_CONFIG,
  LOAD_CONFIG_SUCCESS,
  SET_SCREEN_IMAGE,
  IMAGE_PROPERTY_CHANGE,
  ADD_INCORRECT_ANSWER,
  REMOVE_INCORRECT_ANSWER,
  CHANGE_INCORRECT_ANSWER,
  SAVE_IMAGE_START,
  SAVE_IMAGE_SUCCESS
} from "./constants/actions";

import { query, mutation } from "./utils/request";

export const setScreenDashboard = () => dispatch => {
  dispatch({
    type: SET_SCREEN_DASHBOARD
  });
};

export const setScreenTopPlayers = () => async dispatch => {
  dispatch({
    type: SET_SCREEN_TOP_PLAYERS
  });

  // DB request here
  const {
    data: { players }
  } = await query(gql`
    {
      players {
        players {
          gameId
          name
          score
        }
        total
      }
    }
  `);

  dispatch({
    type: LOAD_TOP_PLAYERS_SUCCESS,
    payload: players
  });
};

export const setScreenGames = () => async dispatch => {
  dispatch({
    type: SET_SCREEN_GAMES
  });

  // DB request here
  const {
    data: { games }
  } = await query(gql`
    {
      games {
        games {
          _id
          finished
          players {
            name
            score
          }
          config {
            __typename
            timers {
              controls
            }
          }
        }
        total
        finished
      }
    }
  `);

  dispatch({
    type: LOAD_GAMES_SUCCESS,
    payload: games
  });
};

export const setScreenConfig = () => async dispatch => {
  dispatch({
    type: SET_SCREEN_CONFIG
  });

  // DB request here
  const {
    data: { config }
  } = await query(gql`
    {
      config {
        gameplay {
          answersInRound
          defaultPlayers
          maxPlayers
          maxPointsPerRound
          minPlayers
          roundsInGame
          topPlayers
          winnerNickNameLetterTable
          winnerNickNameMaxLetters
        }
        timers {
          controls
          round
          roundEnd
        }
      }
    }
  `);

  dispatch({
    type: LOAD_CONFIG_SUCCESS,
    payload: config
  });
};

export const setScreenImage = () => async dispatch => {
  dispatch({
    type: SET_SCREEN_IMAGE
  });
};

export const imagePropertyChange = (field, value) => ({
  type: IMAGE_PROPERTY_CHANGE,
  payload: { field, value }
});

export const addIncorrectAnswer = () => ({
  type: ADD_INCORRECT_ANSWER
});

export const removeIncorrectAnswer = () => ({
  type: REMOVE_INCORRECT_ANSWER
});

export const changeIncorrectAnswer = (index, value) => ({
  type: CHANGE_INCORRECT_ANSWER,
  payload: { index, value }
});

export const saveImage = () => async (dispatch, getState) => {
  const { image } = getState();
  dispatch({
    type: SAVE_IMAGE_START
  });

  await mutation(
    gql`
      mutation saveImage($image: InputImage!) {
        saveImage(image: $image) {
          image
          title
          incorrectTitles
          active
        }
      }
    `,
    { image }
  );

  dispatch({
    type: SAVE_IMAGE_SUCCESS,
    payload: image
  });
};
