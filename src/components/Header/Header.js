import React from "react";
import "./Header.scss";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header id="header">
      <div>
        <div className="logo">
          <span>Mindmap Flow</span>
        </div>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
