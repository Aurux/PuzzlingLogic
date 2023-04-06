import styled from "styled-components";
import GithubLogo from "/src/assets/github.svg";

interface Props {
  onChangeContent: (page: string) => void;
}

const Logo = styled.img`
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const NavBar = ({ onChangeContent }: Props) => {
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
                className="nav-link"
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
                title="Play in the circuit sandbox"
              >
                Play
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#Examples"
                onClick={() => onChangeContent("Examples")}
                title="View example circuits"
              >
                Examples
              </a>
            </li>
          </ul>
        </div>

        <a
          className="navbar-brand"
          href="https://github.com/Aurux/PuzzlingLogic"
          target="_blank"
        >
          <Logo
            src={GithubLogo}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
            title="View source code!"
          />
          View on Github
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
