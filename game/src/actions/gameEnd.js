import {
  CHANGE_WINNER_NICKNAME,
  CHANGE_WINNER_CONTACT,
  TOGGLE_NAME_ENTERED
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

const changeName = letter => async (dispatch, getState) => {
  const {
    config: {
      gameplay: { winnerNickNameMaxLetters, winnerNickNameLetterTable }
    },
    game: {
      player: { name: oldName }
    }
  } = getState();

  let name;
  if (letter) {
    name = oldName + letter;
  } else {
    name = oldName.slice(0, -1);
  }

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

const changeContact = letter => async (dispatch, getState) => {
  const {
    config: {
      gameplay: { contactMaxLetters, contactLetterTable }
    },
    game: {
      player: { contact: oldContact }
    }
  } = getState();

  let contact;
  if (letter) {
    contact = oldContact + letter;
  } else {
    contact = oldContact.slice(0, -1);
  }

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

const enterLetter = letter => async (dispatch, getState) => {
  const {
    game: {
      player: { nameFilled }
    }
  } = getState();

  if (!nameFilled) {
    dispatch(changeName(letter));
  } else {
    dispatch(changeContact(letter));
  }
};

const removeLetter = () => async (dispatch, getState) => {
  const {
    game: {
      player: { nameFilled, contact }
    }
  } = getState();

  if (!nameFilled) {
    dispatch(changeName());
  } else if (contact.length) {
    dispatch(changeContact());
  } else {
    dispatch({
      type: TOGGLE_NAME_ENTERED
    });
  }
};

const enterPress = () => async (dispatch, getState) => {
  const {
    game: {
      player: { nameFilled }
    }
  } = getState();

  if (nameFilled) {
    await dispatch(saveName());
  } else {
    dispatch({
      type: TOGGLE_NAME_ENTERED
    });
  }
};

export { saveName, enterLetter, removeLetter, enterPress };
