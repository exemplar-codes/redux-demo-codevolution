const { combineReducers, createStore } = require("redux");

const cakeInitialState = { numOfCakes: 10 };

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

function cakeReducer(state = cakeInitialState, action) {
  console.log("Cake reducer called");
  switch (action.type) {
    case CAKE_ORDERED:
      return { ...state, numOfCakes: state.numOfCakes - 1 };
    case CAKE_RESTOCKED:
      return { ...state, numOfCakes: state.numOfCakes + action.payload };

    default:
      return state;
  }
}

const iceCreamInitialState = { numOfIceCreams: 20 };

const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function iceCreamReducer(state = iceCreamInitialState, action) {
  console.log("Ice cream reducer called");
  switch (action.type) {
    case ICECREAM_ORDERED:
      return { ...state, numOfIceCreams: state.numOfIceCreams - 1 };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer);

console.log(store.getState());

store.dispatch({ type: CAKE_ORDERED });
console.log(store.getState());

store.dispatch({ type: ICECREAM_RESTOCKED, payload: 20 });
console.log(store.getState());
