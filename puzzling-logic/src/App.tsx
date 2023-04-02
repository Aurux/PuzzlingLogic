import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Play from "./components/Play";
import Examples from "./components/Examples";
import { CircuitItem, ArrowItem } from "./components/Examples";

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [importCirc, setImportCirc] = useState<CircuitItem[]>();
  const [importArrows, setImportArrows] = useState<ArrowItem[]>();

  const handleContentChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleCircuitImport = (circuit: CircuitItem[], arrows: ArrowItem[]) => {
    setImportCirc(circuit);
    setImportArrows(arrows);
    setCurrentPage("Play");
  };

  const handlePlayMount = () => {
    setImportCirc(undefined);
    setImportArrows(undefined);
  };

  return (
    <>
      <NavBar onChangeContent={handleContentChange} />
      {currentPage === "Home" ? (
        <Home onChangeContent={handleContentChange} />
      ) : null}
      {currentPage === "Play" ? (
        <Play
          {...(importCirc && { circuit: importCirc })}
          {...(importArrows && { arrows: importArrows })}
          onMount={handlePlayMount}
        />
      ) : null}
      {currentPage === "Examples" ? (
        <Examples importContent={handleCircuitImport} />
      ) : null}
    </>
  );
}

export default App;
