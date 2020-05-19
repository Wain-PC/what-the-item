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
  LOAD_GAME_SUCCESS,
  SUCCESS_HIDE,
  SUCCESS_SHOW
} from "./constants/actions";

import { send } from "./utils/request";

export const loadTopPlayers = () => async dispatch => {
  dispatch({
    type: LOAD_TOP_PLAYERS_START
  });

  try {
    const payload = await send("getAllPlayers");

    dispatch({
      type: LOAD_TOP_PLAYERS_SUCCESS,
      payload
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
    const payload = await send("getGames");

    dispatch({
      type: LOAD_GAMES_SUCCESS,
      payload
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
    const config = await send("getConfig");

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
    const updatedImage = await send("saveImage", image);

    dispatch({
      type: SAVE_IMAGE_SUCCESS,
      payload: { ...updatedImage, isEdit }
    });

    // eslint-disable-next-line no-use-before-define
    dispatch(showSuccess("Изображение сохранено", 3));
  } catch (e) {
    dispatch({
      type: SAVE_IMAGE_ERROR,
      payload: e.message
    });
  }
};

export const saveConfig = () => async (dispatch, getState) => {
  const { config } = getState();
  dispatch({
    type: SAVE_CONFIG_START
  });

  try {
    const newConfig = await send("saveConfig", config);

    dispatch({
      type: SAVE_CONFIG_SUCCESS,
      payload: newConfig
    });
    // eslint-disable-next-line no-use-before-define
    dispatch(showSuccess("Конфигурация обновлена", 3));
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
    const payload = await send("getImages");

    dispatch({
      type: LOAD_IMAGES_SUCCESS,
      payload
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

export const getImage = id => async dispatch => {
  dispatch({
    type: LOAD_IMAGE_START
  });

  try {
    // DB request here
    const image = await send("getImage", id);

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

export const removeImage = id => async dispatch => {
  dispatch({
    type: REMOVE_IMAGE_START
  });

  try {
    await send("removeImage", id);

    dispatch({
      type: REMOVE_IMAGE_SUCCESS
    });

    // eslint-disable-next-line no-use-before-define
    dispatch(showSuccess("Изображение удалено", 3));
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
    const game = await send("getGame", _id);

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

export const showError = (message, seconds) => dispatch => {
  dispatch({
    type: ERROR_SHOW,
    payload: message
  });

  if (seconds) {
    return setTimeout(() => {
      dispatch(hideError());
    }, seconds * 1000);
  }

  return null;
};
export const hideSuccess = () => ({
  type: SUCCESS_HIDE
});

export const showSuccess = (message, seconds) => dispatch => {
  dispatch({
    type: SUCCESS_SHOW,
    payload: message
  });

  if (seconds) {
    return setTimeout(() => {
      dispatch(hideSuccess());
    }, seconds * 1000);
  }

  return null;
};
