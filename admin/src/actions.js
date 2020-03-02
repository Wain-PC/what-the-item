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
  LOAD_IMAGES_ERROR,
  REMOVE_IMAGE_START,
  REMOVE_IMAGE_SUCCESS,
  REMOVE_IMAGE_ERROR,
  LOAD_IMAGE_START,
  LOAD_IMAGE_SUCCESS,
  LOAD_IMAGE_ERROR,
  IMAGE_DATA_CLEAR,
  LOADER_SHOW,
  LOADER_HIDE,
  ERROR_HIDE,
  ERROR_SHOW,
  LOAD_GAME_START,
  LOAD_GAME_SUCCESS
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
              timers {
                controls
              }
              gameplay {
                roundsInGame
              }
            }
            startedOn
            winner {
              name
              score
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
  const isEdit = Boolean(image._id);

  dispatch({
    type: SAVE_IMAGE_START
  });

  try {
    const {
      data: { saveImage: updatedImage }
    } = await mutation(
      gql`
        mutation saveImage($image: InputImage!) {
          saveImage(image: $image) {
            _id
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
      payload: { ...updatedImage, isEdit }
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
            _id
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

export const clearImageData = () => ({
  type: IMAGE_DATA_CLEAR
});

export const getImage = _id => async dispatch => {
  dispatch({
    type: LOAD_IMAGE_START
  });

  try {
    // DB request here
    const {
      data: { image }
    } = await query(
      gql`
        query getImage($_id: ID!) {
          image(_id: $_id) {
            _id
            image
            title
            incorrectTitles
            active
          }
        }
      `,
      { _id }
    );

    dispatch({
      type: LOAD_IMAGE_SUCCESS,
      payload: image
    });
  } catch (e) {
    dispatch({
      type: LOAD_IMAGE_ERROR,
      payload: e.message
    });
  }
};

export const removeImage = _id => async dispatch => {
  dispatch({
    type: REMOVE_IMAGE_START
  });

  try {
    const {
      data: { removeImage: images }
    } = await mutation(
      gql`
        mutation removeImage($_id: ID!) {
          removeImage(_id: $_id) {
            images {
              _id
              active
              extension
              image
              incorrectTitles
              title
            }
            active
            total
          }
        }
      `,
      { _id }
    );

    dispatch({
      type: REMOVE_IMAGE_SUCCESS
    });

    dispatch({
      type: LOAD_IMAGES_SUCCESS,
      payload: images
    });
  } catch (e) {
    dispatch({
      type: REMOVE_IMAGE_ERROR,
      payload: e.message
    });
  }
};

export const getGame = _id => async dispatch => {
  dispatch({
    type: LOAD_GAME_START
  });

  try {
    // DB request here
    const {
      data: { game }
    } = await query(
      gql`
        query getGame($_id: ID!) {
          game(_id: $_id) {
            config {
              gameplay {
                maxPointsPerRound
                roundsInGame
              }
              timers {
                round
              }
            }
            finished
            startedOn
            finishedOn
            players {
              _id
              name
              score
            }
            rounds {
              started
              finished
              image {
                _id
                image
                title
                incorrectTitles
              }
              answerIndex
              answered
              answeredBy
              index
              pointsReceived
              timeLeft
              selection {
                selected
                selectedBy
                title
              }
            }
          }
        }
      `,
      { _id }
    );

    dispatch({
      type: LOAD_GAME_SUCCESS,
      payload: game
    });
  } catch (e) {
    dispatch({
      type: LOAD_GAMES_ERROR,
      payload: e.message
    });
  }
};

export const hideLoader = () => ({
  type: LOADER_HIDE
});

export const showLoader = seconds => dispatch => {
  dispatch({
    type: LOADER_SHOW
  });

  if (seconds) {
    return setTimeout(() => {
      dispatch(hideLoader());
    }, seconds * 1000);
  }

  return null;
};

export const hideError = () => ({
  type: ERROR_HIDE
});

export const showError = seconds => dispatch => {
  dispatch({
    type: ERROR_SHOW
  });

  if (seconds) {
    return setTimeout(() => {
      dispatch(hideError());
    }, seconds * 1000);
  }

  return null;
};
