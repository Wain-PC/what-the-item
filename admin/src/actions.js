import { gql } from "apollo-boost";

import {
  LOAD_TOP_PLAYERS_SUCCESS,
  LOAD_GAMES_SUCCESS,
  LOAD_CONFIG_SUCCESS,
  IMAGE_PROPERTY_CHANGE,
  ADD_INCORRECT_ANSWER,
  REMOVE_INCORRECT_ANSWER,
  CHANGE_INCORRECT_ANSWER,
  SAVE_IMAGE_START,
  SAVE_IMAGE_SUCCESS,
  LOAD_TOP_PLAYERS_START,
  LOAD_TOP_PLAYERS_ERROR,
  LOAD_CONFIG_START,
  LOAD_CONFIG_ERROR,
  SAVE_IMAGE_ERROR,
  LOAD_GAMES_START,
  LOAD_GAMES_ERROR,
  SAVE_CONFIG_START,
  SAVE_CONFIG_SUCCESS,
  SAVE_CONFIG_ERROR,
  CONFIG_PROPERTY_CHANGE,
  LOAD_IMAGES_START,
  LOAD_IMAGES_SUCCESS,
  LOAD_IMAGES_ERROR
} from "./constants/actions";

import { query, mutation } from "./utils/request";

export const loadTopPlayers = () => async dispatch => {
  dispatch({
    type: LOAD_TOP_PLAYERS_START
  });

  try {
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
  } catch (e) {
    dispatch({
      type: LOAD_TOP_PLAYERS_ERROR,
      payload: e.message
    });
  }
};

export const loadGames = () => async dispatch => {
  dispatch({
    type: LOAD_GAMES_START
  });

  try {
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
  } catch (e) {
    dispatch({
      type: LOAD_GAMES_ERROR,
      payload: e.message
    });
  }
};

export const loadConfig = () => async dispatch => {
  dispatch({
    type: LOAD_CONFIG_START
  });

  try {
    // DB request here
    const {
      data: { config }
    } = await query(gql`
      {
        config {
          gameplay {
            defaultPlayers
            maxPointsPerRound
            roundsInGame
            topPlayers
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
  } catch (e) {
    dispatch({
      type: LOAD_CONFIG_ERROR,
      payload: e.message
    });
  }
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

  try {
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
  } catch (e) {
    dispatch({
      type: SAVE_IMAGE_ERROR,
      payload: e.message
    });
  }
};

export const saveConfig = () => async (dispatch, getState) => {
  const {
    config: { timers, gameplay }
  } = getState();
  dispatch({
    type: SAVE_CONFIG_START
  });

  try {
    const newConfig = await mutation(
      gql`
        mutation saveConfig($config: InputConfig!) {
          saveConfig(config: $config) {
            gameplay {
              defaultPlayers
              maxPointsPerRound
              roundsInGame
              topPlayers
              winnerNickNameMaxLetters
            }
            timers {
              controls
              round
              roundEnd
            }
          }
        }
      `,
      { config: { timers, gameplay } }
    );

    dispatch({
      type: SAVE_CONFIG_SUCCESS,
      payload: newConfig
    });
  } catch (e) {
    dispatch({
      type: SAVE_CONFIG_ERROR,
      payload: e.message
    });
  }
};

export const changeConfig = (type, id, value) => ({
  type: CONFIG_PROPERTY_CHANGE,
  payload: { type, id, value }
});

export const loadImages = () => async dispatch => {
  dispatch({
    type: LOAD_IMAGES_START
  });

  try {
    // DB request here
    const {
      data: { images }
    } = await query(gql`
      {
        images {
          images {
            image
            title
            incorrectTitles
            active
          }
          total
          active
        }
      }
    `);

    dispatch({
      type: LOAD_IMAGES_SUCCESS,
      payload: images
    });
  } catch (e) {
    dispatch({
      type: LOAD_IMAGES_ERROR,
      payload: e.message
    });
  }
};
