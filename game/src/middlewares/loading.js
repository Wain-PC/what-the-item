import actions from "../actions";

const loader = store => next => action => {
  const { type } = action;
  const nextAction = next(action);

  if (type.endsWith("_START")) {
    store.dispatch(actions.showLoader());
  } else if (type.endsWith("_SUCCESS") || type.endsWith("_ERROR")) {
    store.dispatch(actions.hideLoader());
  }

  return nextAction;
};

export default loader;
