import {
  CHANGE_WINNER_NICKNAME,
  CHANGE_WINNER_CONTACT,
  LOAD_IS_IN_TOP_START,
  LOAD_IS_IN_TOP_SUCCESS,
  LOAD_IS_IN_TOP_ERROR
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

  await dbSaveName({ gameId, name, contact });
  await dispatch(setScreenTop());
};

const changeName = name => async (dispatch, getState) => {
  const {
    config: {
      gameplay: { winnerNickNameMaxLetters, winnerNickNameLetterTable }
    }
  } = getState();

  if (
    name.length <= winnerNickNameMaxLetters &&
    name.indexOf(winnerNickNameLetterTable) === -1
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
      gameplay: { contactMaxLetters, contactLetterTable }
    }
  } = getState();

  if (
    contact.length <= contactMaxLetters &&
    contact.indexOf(contactLetterTable) === -1
  ) {
    dispatch({
      type: CHANGE_WINNER_CONTACT,
      payload: contact
    });
  }
};

export { saveName, changeContact, changeName, getIsInTop };
