import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const feedbackGetter = (state = [], action) => {
  let newState = [...state];
  if (action.type === "SET_ALL_FEEDBACK") {
    // payload must be an array of order objects
    newState = [...action.payload];
  }
  return newState;
};

// //put pizzas from database onto page (GET)
// const feedbackGetter = (state = [], action) => {
//   let newState = [...state];
//   if (action.type === "GET_FEEDBACK") {
//     // payload must be an array of pizza objects
//     newState = [...action.payload];
//   }
//   return newState;
// };

const feedback = (state = { array: [] }, action) => {
  let newState = { ...state };
  if (action.type === "UPDATE_FEEDBACK_INFO") {
    // payload need to be an object containing all of the customer info
    newState = { ...newState, ...action.payload };
  } else if (action.type === "RESET_FEEDBACK") {
    newState = { array: [] };
  }
  return newState;
};

const storeInstance = createStore(
  combineReducers({
    feedback: feedback,
    feedbackGetter: feedbackGetter,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
