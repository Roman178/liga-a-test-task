import React from "react";

function Header(props) {
  return (
    <header className="header">
      {props.loggedInFlag && (
        <button onClick={props.handleClick} className="btn">
          Выйти
        </button>
      )}
    </header>
  );
}

export default Header;
