const DUCK_ID = "index";

const ACTION = `${DUCK_ID}/ACTION`;

const initialState = {
  id: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION: {
      return {
        ...state,
        id: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const actionCreator = id => {
  return {
    type: ACTION,
    payload: id
  };
};
