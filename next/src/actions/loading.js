import { LOADER_SHOW, LOADER_HIDE } from "../constants/actions";

const showLoader = () => ({
  type: LOADER_SHOW
});
const hideLoader = () => ({
  type: LOADER_HIDE
});

export { showLoader, hideLoader };
