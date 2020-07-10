import {
  LOAD_LANGUAGE_START,
  LOAD_LANGUAGE_SUCCESS,
  LOAD_LANGUAGE_ERROR
} from "../constants/actions";

// eslint-disable-next-line import/prefer-default-export
export const getTranslation = () => async (dispatch, getState) => {
  dispatch({
    type: LOAD_LANGUAGE_START
  });

  try {
    const { language } = getState().translation;
    const { default: translation } = await import(
      `../languages/${language}.json`
    );

    dispatch({
      type: LOAD_LANGUAGE_SUCCESS,
      payload: translation
    });
  } catch (e) {
    dispatch({
      type: LOAD_LANGUAGE_ERROR,
      payload: e.message
    });
  }
};
