import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

export function checkRoutes(loggedIn) {
  if (loggedIn) {
    return (
      <Switch>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Redirect to="/profile" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup" exact>
        <Signup />
      </Route>
      <Redirect to="signup" />
    </Switch>
  );
}
