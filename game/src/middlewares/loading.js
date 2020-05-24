import actions from "../actions";

const loader = store => next => action => {
  const { type } = action;
  if (type.endsWith("_START")) {
    store.dispatch(actions.showLoader());
  } else if (type.endsWith("_SUCCESS") || type.endsWith("_ERROR")) {
    store.dispatch(actions.hideLoader());
  }

  return next(action);
};

export default loader;
