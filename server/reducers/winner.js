const {
  SET_WINNER,
  SET_WINNER_LETTER_INCREASE,
  SET_WINNER_LETTER_DECREASE,
  SET_WINNER_LETTER_INDEX_INCREASE,
  SET_WINNER_LETTER_INDEX_DECREASE
} = require("../constants/actions");

const {
  WINNER_NICKNAME_MAX_LETTERS,
  NICKNAME_LETTER_TABLE
} = require("../constants/gameplay");

const initialState = {
  index: 0,
  name: "",
  score: 0,
  activeLetter: 0,
  nickName: Array(WINNER_NICKNAME_MAX_LETTERS)
    .fill("_")
    .join("")
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_WINNER: {
      const { index, name, score } = action.payload;
      return {
        ...initialState,
        index,
        name,
        score
      };
    }
    case SET_WINNER_LETTER_INDEX_INCREASE: {
      return {
        ...state,
        activeLetter: (state.activeLetter + 1) % WINNER_NICKNAME_MAX_LETTERS
      };
    }

    case SET_WINNER_LETTER_INDEX_DECREASE: {
      return {
        ...state,
        activeLetter:
          (state.activeLetter + WINNER_NICKNAME_MAX_LETTERS - 1) %
          WINNER_NICKNAME_MAX_LETTERS
      };
    }

    case SET_WINNER_LETTER_INCREASE: {
      const { activeLetter, nickName } = state;
      const currentLetterIndex = NICKNAME_LETTER_TABLE.indexOf(
        nickName.charAt(activeLetter)
      );
      const newLetter =
        NICKNAME_LETTER_TABLE[
          (currentLetterIndex + 1) % NICKNAME_LETTER_TABLE.length
        ];
      const nickNameArray = nickName.split("");
      nickNameArray.splice(activeLetter, 1, newLetter);
      return {
        ...state,
        nickName: nickNameArray.join("")
      };
    }

    case SET_WINNER_LETTER_DECREASE: {
      const { activeLetter, nickName } = state;
      const currentLetterIndex = NICKNAME_LETTER_TABLE.indexOf(
        nickName.charAt(activeLetter)
      );
      const newLetter =
        NICKNAME_LETTER_TABLE[
          (currentLetterIndex + NICKNAME_LETTER_TABLE.length - 1) %
            NICKNAME_LETTER_TABLE.length
        ];
      const nickNameArray = nickName.split("");
      nickNameArray.splice(activeLetter, 1, newLetter);
      return {
        ...state,
        nickName: nickNameArray.join("")
      };
    }

    default: {
      return state;
    }
  }
};
