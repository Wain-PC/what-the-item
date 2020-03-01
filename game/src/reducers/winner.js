import {
  SET_WINNER,
  SET_SCREEN_TOP,
  SET_WINNER_LETTER_INDEX,
  SET_WINNER_LETTER
} from "../constants/actions";

const initialState = {
  index: 0,
  name: "",
  score: 0,
  activeLetter: 0,
  nickName: "_______"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WINNER: {
      const {
        winner: { index, name, score },
        nickName
      } = action.payload;
      return {
        ...initialState,
        index,
        name,
        score,
        nickName
      };
    }
    case SET_WINNER_LETTER_INDEX: {
      return {
        ...state,
        activeLetter: action.payload
      };
    }

    case SET_WINNER_LETTER: {
      const { activeLetter, nickName } = state;

      const nickNameArray = nickName.split("");
      nickNameArray.splice(activeLetter, 1, action.payload);

      return {
        ...state,
        nickName: nickNameArray.join("")
      };
    }

    case SET_SCREEN_TOP: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
