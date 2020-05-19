import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import * as reducers from "./reducers";
import messages from "./middlewares/messages";
import loading from "./middlewares/loading";
import App from "./App";
import "./index.css";

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const store = createStore(
  combineReducers(reducers),
  compose(applyMiddleware(thunk, messages, loading), devTools)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
