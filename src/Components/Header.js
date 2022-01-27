import React, { useState } from "react";
import "./Header.css";

function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className="header">
      <h5 className="logoText">
        <a href="https://fl4v.io/">Fl4v.io</a>
      </h5>
      <div
        className={click ? "toggle active" : "toggle"}
        onClick={handleClick}
      ></div>
      <div
        className={click ? "sidebar active" : "sidebar"}
        onClick={handleClick}
      >
        <ul className="menu">
          <li>
            <a
              href="#home"
              className={click ? "active" : ""}
              onClick={handleClick}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={click ? "active" : ""}
              onClick={handleClick}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={click ? "active" : ""}
              onClick={handleClick}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#work"
              className={click ? "active" : ""}
              onClick={handleClick}
            >
              Work
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={click ? "active" : ""}
              onClick={handleClick}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
