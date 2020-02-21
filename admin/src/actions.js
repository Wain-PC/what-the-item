import { gql } from "apollo-boost";

import {
  LOAD_TOP_PLAYERS_SUCCESS,
  SET_SCREEN_DASHBOARD,
  SET_SCREEN_TOP_PLAYERS,
  SET_SCREEN_GAMES,
  LOAD_GAMES_SUCCESS,
  SET_SCREEN_CONFIG,
  LOAD_CONFIG_SUCCESS
} from "./constants/actions";

import query from "./utils/request";

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
