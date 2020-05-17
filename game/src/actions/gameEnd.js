import { CHANGE_WINNER_NICKNAME } from "../constants/actions";
import { saveName as dbSaveName } from "../utils/db";

const saveName = () => async (dispatch, getState) => {
  const {
    player: { name, contact },
    game: { id: gameId }
  } = getState();

  await dbSaveName({ gameId, name, contact });
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
      type: CHANGE_WINNER_NICKNAME
    });
  }
};

export { saveName, changeName };
