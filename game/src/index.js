import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import loading from "./middlewares/loading";

import * as reducers from "./reducers";
import App from "./App";
import "./index.css";

const devTools =
  window.devToolsExtension && process.env.NODE_ENV !== "production"
    ? window.devToolsExtension()
    : f => f;
const store = createStore(
  combineReducers(reducers),
  compose(applyMiddleware(thunk, loading), devTools)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
