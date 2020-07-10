import PropTypes from "prop-types";
import { connect } from "react-redux";
import { initializeStore } from "../src/store";
import * as actions from "../src/ducks/index";

const IndexPage = ({ id }) => {
  return <div>This is a main page with id: {id}</div>;
};

IndexPage.propTypes = {
  id: PropTypes.string.isRequired
};

export const getServerSideProps = async () => {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  await dispatch(actions.actionCreator("mainPage"));

  return { props: { initialReduxState: reduxStore.getState() } };
};

const mapStateToProps = state => {
  const { index, loading } = state;
  return {
    ...index,
    ...loading
  };
};

export default connect(mapStateToProps, actions)(IndexPage);
