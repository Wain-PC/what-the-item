import App from "../src/App";
import { initializeStore } from "../src/store";
import actions from "../src/actions";

export default App;

export const getServerSideProps = async () => {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  await dispatch(actions.getTranslation());
  await dispatch(actions.getConfig());
  await dispatch(actions.setScreenTop());
  return { props: { initialReduxState: reduxStore.getState() } };
};
