const { createStore, applyMiddleware } = require("redux");
const { logger } = require("redux-logger");

const INCREASE = "INCREASE";
const INCREASE_BY = "INCREASE_BY";
const SET_COUNT = "SET_COUNT";

// reducer
const initialState = { count: 0 };
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return { ...state, count: state.count + 1 };
    case INCREASE_BY:
      return { ...state, count: state.count + action.payload };
    case SET_COUNT:
      return { ...state, count: action.payload };
    default:
      return state;
  }
}

// setting up the store
const store = createStore(reducer, applyMiddleware(logger));

// app code - working with the store
console.log(store.getState());
store.dispatch({ type: INCREASE });
store.dispatch({ type: INCREASE_BY, payload: 5 });
