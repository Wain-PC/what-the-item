import {
  CHANGE_WINNER_NICKNAME,
  CHANGE_WINNER_CONTACT
} from "../constants/actions";
import { saveName as dbSaveName } from "../utils/db";
import { setScreenTop } from "./screen";

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

export { saveName, changeContact, changeName };
