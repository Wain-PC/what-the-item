import {
  CHANGE_WINNER_NICKNAME,
  CHANGE_WINNER_CONTACT,
  LOAD_IS_IN_TOP_START,
  LOAD_IS_IN_TOP_SUCCESS,
  LOAD_IS_IN_TOP_ERROR,
  SAVE_NAME_START,
  SAVE_NAME_SUCCESS,
  SAVE_NAME_ERROR
} from "../constants/actions";
import { saveName as dbSaveName, isInTop as loadIsInTop } from "../utils/db";
// eslint-disable-next-line import/no-cycle
import { setScreenTop } from "./screen";

const getIsInTop = () => async (dispatch, getState) => {
  const {
    game: { id: gameId }
  } = getState();

  dispatch({
    type: LOAD_IS_IN_TOP_START
  });

  try {
    const { isInTop, place } = await loadIsInTop({ gameId });

    if (isInTop) {
      dispatch({
        type: LOAD_IS_IN_TOP_SUCCESS,
        payload: { place }
      });

      return true;
    }

    return false;
  } catch (error) {
    dispatch({
      type: LOAD_IS_IN_TOP_ERROR
    });

    return false;
  }
};

const saveName = () => async (dispatch, getState) => {
  const {
    game: {
      id: gameId,
      player: { name, contact }
    }
  } = getState();

  dispatch({
    type: SAVE_NAME_START
  });

  try {
    await dbSaveName({ gameId, name, contact });
    dispatch({
      type: SAVE_NAME_SUCCESS
    });

    await dispatch(setScreenTop());
  } catch (e) {
    dispatch({
      type: SAVE_NAME_ERROR
    });
  }
};

const changeName = name => async (dispatch, getState) => {
  const {
    config: {
      gameplay: { winnerNickNameMaxLetters }
    }
  } = getState();

  if (
    !name.length ||
    (name.length <= winnerNickNameMaxLetters &&
      /^[A-Za-z0-9-_а-яА-Я]+$/.test(name))
  ) {
    dispatch({
      type: CHANGE_WINNER_NICKNAME,
      payload: name
    });
  }
};

const changeContact = contact => async (dispatch, getState) => {
  const {
    config: {
      gameplay: { contactMaxLetters }
    }
  } = getState();

  if (
    !contact.length ||
    (contact.length <= contactMaxLetters && /[A-Za-z0-9-_.@]+$/.test(contact))
  ) {
    dispatch({
      type: CHANGE_WINNER_CONTACT,
      payload: contact
    });
  }
};

export { saveName, changeContact, changeName, getIsInTop };
