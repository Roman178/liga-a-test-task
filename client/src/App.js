import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { checkRoutes } from "./routes";

function App(props) {
  const flag = false;
  const routes = checkRoutes(flag);

  return (
    <div className="main">
      <header className="header">
        {flag && <button className="btn">Выйти</button>}
      </header>
      <Router>{routes}</Router>
    </div>
  );
}

export default App;
