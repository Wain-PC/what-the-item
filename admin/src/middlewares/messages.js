import { showError } from "../actions";

const messages = store => next => action => {
  const { type } = action;
  if (type.endsWith("_ERROR")) {
    store.dispatch(showError("Ошибка операции", 5));
  }

  return next(action);
};

export default messages;
