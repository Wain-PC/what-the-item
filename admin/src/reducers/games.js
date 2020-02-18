import { LOAD_GAMES_SUCCESS } from "../constants/actions";

const initialState = {
  games: [],
  page: 1,
  pages: 1,
  total: 0,
  finished: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAMES_SUCCESS: {
      const { games, pages, page, total, finished } = action.payload;
      return {
        ...state,
        games,
        pages,
        page,
        total,
        finished
      };
    }
    default: {
      return state;
    }
  }
};
