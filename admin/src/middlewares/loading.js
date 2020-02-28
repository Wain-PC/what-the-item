import { showLoader, hideLoader } from "../actions";

const loader = store => next => action => {
  const { type } = action;
  if (type.endsWith("_START")) {
    store.dispatch(showLoader());
  } else if (type.endsWith("_SUCCESS") || type.endsWith("_ERROR")) {
    store.dispatch(hideLoader());
  }

  return next(action);
};

export default loader;
