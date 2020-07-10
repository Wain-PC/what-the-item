import {
  LOAD_LANGUAGE_START,
  LOAD_LANGUAGE_SUCCESS,
  LOAD_LANGUAGE_ERROR
} from "../constants/actions";

import { getTranslation as loadTranslation } from "../utils/db";

// eslint-disable-next-line import/prefer-default-export
export const getTranslation = () => async dispatch => {
  dispatch({
    type: LOAD_LANGUAGE_START
  });

  try {
    const payload = await loadTranslation();

    dispatch({
      type: LOAD_LANGUAGE_SUCCESS,
      payload
    });
  } catch (e) {
    dispatch({
      type: LOAD_LANGUAGE_ERROR,
      payload: e.message
    });
  }
};
