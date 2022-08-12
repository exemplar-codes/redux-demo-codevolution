const { createStore } = require("redux");
const axios = require("axios").default;

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return { ...state, loading: true };

    case FETCH_USERS_SUCCEEDED:
      return { ...state, loading: false, users: action.payload, error: "" };

    case FETCH_USERS_FAILED:
      return { ...state, loading: false, users: [], error: action.payload };

    default:
      return state;
  }
}

function fetchUsersRequest() {
  return { type: FETCH_USERS_REQUESTED };
}

function fetchUsersSuccess(users) {
  return { type: FETCH_USERS_SUCCEEDED, payload: users };
}

function fetchUsersFailure(error) {
  return { type: FETCH_USERS_FAILED, payload: error };
}

async function fetchUsers(username) {
  try {
    store.dispatch(fetchUsersRequest());

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const data = await response.json();

    store.dispatch(fetchUsersSuccess(data));
  } catch (error) {
    store.dispatch(fetchUsersFailure(error.message));
  }
}

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));
fetchUsers("sanjarcode");
