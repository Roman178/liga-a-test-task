// const userData = JSON.parse(localStorage.getItem("userData"));
// const initialState = userData
//   ? { loggedIn: true, userData, apiCallsInProgress: 0 }
//   : { loggedIn: false, userData: null, apiCallsInProgress: 0 };

const initialState = { loggedIn: false, userData: null, apiCallsInProgress: 0 };

export default initialState;
