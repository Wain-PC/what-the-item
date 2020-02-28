import { showError, hideError } from "../actions";

const loader = store => next => action => {
  const { type } = action;
  if (type.endsWith("_START")) {
    store.dispatch(showError());
  } else if (type.endsWith("_SUCCESS") || type.endsWith("_START")) {
    store.dispatch(hideError());
  }

  return next(action);
};

export default loader;
