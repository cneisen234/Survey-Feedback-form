import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

//reducer for GET
const feedbackGetter = (state = [], action) => {
  let newState = [...state];
  if (action.type === "SET_ALL_FEEDBACK") {
    // payload must be an array of objects
    newState = [...action.payload];
  }
  return newState;
};
//reducer for POST
const feedback = (state = { array: [] }, action) => {
  let newState = { ...state };
  if (action.type === "UPDATE_FEEDBACK_INFO") {
    // payload must be an array of objects
    newState = { ...newState, ...action.payload };
  } else if (action.type === "RESET_FEEDBACK") {
    newState = { array: [] };
  }
  return newState;
};
//Redux state
const storeInstance = createStore(
  combineReducers({
    feedback: feedback,
    feedbackGetter: feedbackGetter,
  }),
  //React DEVTOOLS extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
//renders APP to html Id of root
ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
