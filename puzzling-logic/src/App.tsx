import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Play from "./components/Play";
import About from "./components/About";

function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const handleContentChange = (page: string) => {
    setCurrentPage(page);
  };
  return (
    <>
      <NavBar onChangeContent={handleContentChange} />
      {currentPage === "Home" ? (
        <Home onChangeContent={handleContentChange} />
      ) : null}
      {currentPage === "Play" ? <Play /> : null}
      {currentPage === "About" ? <About /> : null}
    </>
  );
}

export default App;
