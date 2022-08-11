const { createStore } = require("redux");

const INCREASE = "INCREASE";
const INCREASE_BY = "INCREASE_BY";
const SET_COUNT = "SET_COUNT";

// action creators
function increaseCount() {
  return { type: INCREASE };
}

function increaseCountBy(delta) {
  return { type: INCREASE_BY, payload: delta };
}

function setCount(newCount) {
  return { type: SET_COUNT, payload: newCount };
}

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
const store = createStore(reducer);

// app code - working with the store
console.log(store.getState());
store.dispatch(increaseCount());
console.log(store.getState());
store.dispatch(increaseCountBy(99));
console.log(store.getState());

// working with subscribers
store.dispatch(setCount(0)); // reset count to 0

function subscriberCallback1(arg) {
  console.log("SUBSCRIBER 1's code running...");
}

function subscriberCallback2(arg) {
  console.log("SUBSCRIBER 2's code running...");
}

const removeSubscription1 = store.subscribe(subscriberCallback1); // subscribed to the store
store.subscribe(subscriberCallback2);

store.dispatch(increaseCountBy(0)); // subscribers will run on state change

// unsubscribing
removeSubscription1(); // remove subscription1
store.dispatch(increaseCountBy(0));
