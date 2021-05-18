const userData = JSON.parse(localStorage.getItem("userData"));
const initialState = userData
  ? { loggedIn: true, userData }
  : { loggedIn: false, userData: null };

export default initialState;
