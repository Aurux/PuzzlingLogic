import React from "react";
import { useHref } from "react-router-dom";

interface Props {
  onChangeContent: (page: string) => void;
}

const NavBar = ({ onChangeContent }: Props) => {
  const items = ["Home", "Play", "About"];
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#Home"
          onClick={() => onChangeContent("Home")}
        >
          Puzzling Logic
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#Home"
                onClick={() => onChangeContent("Home")}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#Play"
                onClick={() => onChangeContent("Play")}
              >
                Play
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#About"
                onClick={() => onChangeContent("About")}
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
