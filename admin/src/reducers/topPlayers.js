import { LOAD_TOP_PLAYERS_SUCCESS } from "../constants/actions";

const initialState = {
  players: [],
  page: 1,
  pages: 1,
  total: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TOP_PLAYERS_SUCCESS: {
      const { players, pages, page, total } = action.payload;
      return {
        ...state,
        players,
        pages,
        page,
        total
      };
    }
    default: {
      return state;
    }
  }
};
