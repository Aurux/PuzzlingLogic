import React, { useState } from "react";
import styled from "styled-components";

import LEDOn from "/src/assets/gates/lon.png";
import Play from "./Play";

// Style
const Wrapper = styled.section`
padding 4em 0.5em 0.5em 0.5em;
background: #25a07f;
height: 100vh;
display: flex;
justify-content:center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: green;
`;

const CardDiv = styled.div`
  width: 18rem;
  height: fit-content;
  margin: 1em;
`;

const OssCirc = [
  {
    id: "4ae90180-3af0-49b0-bbc2-a895d6888d45",
    type: "LED",
    src: "http://localhost:5174/src/assets/gates/lof.png",
    x: 937,
    y: 398,
    addedToPlayArea: true,
    outputHigh: false,
  },
  {
    id: "9452f47e-aaae-420c-8780-74e1dd6c5f1f",
    type: "INPUT",
    src: "http://localhost:5174/src/assets/gates/sof.png",
    x: 642,
    y: 307,
    addedToPlayArea: true,
    outputHigh: false,
  },
];

const OssArr = [
  {
    start: "9452f47e-aaae-420c-8780-74e1dd6c5f1f-output0",
    end: "4ae90180-3af0-49b0-bbc2-a895d6888d45-input0",
    active: false,
    key: "71b02bcd-dc22-493b-a744-63173d6b47e8",
  },
];

export interface CircuitItem {
  id: string;
  type: string;
  src: string;
  x: number;
  y: number;
  addedToPlayArea: boolean;
  outputHigh: boolean;
}

export interface ArrowItem {
  start: string;
  end: string;
  active: boolean;
  key: string;
}

interface Props {
  importContent: (circuit: CircuitItem[], arrows: ArrowItem[]) => void;
}

const Examples = ({ importContent }: Props) => {
  const [showPlay, setShowPlay] = useState(false);
  const OpenCirc = (name: string) => {
    if (name === "Osscillator") {
      importContent(OssCirc, OssArr);
      //setShowPlay(true);
    }
  };

  return (
    <Wrapper>
      <CardDiv className="card">
        <img src={LEDOn} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Simple Osscillator</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a
            onClick={() => OpenCirc("Osscillator")}
            className="btn btn-success"
          >
            Open in sandbox
          </a>
        </div>
      </CardDiv>
      <CardDiv className="card">
        <img src={LEDOn} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">S-R Latch</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-success">
            Open in sandbox
          </a>
        </div>
      </CardDiv>
      <CardDiv className="card">
        <img src={LEDOn} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">D Latch</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-success">
            Open in sandbox
          </a>
        </div>
      </CardDiv>
      <CardDiv className="card">
        <img src={LEDOn} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">1-Bit Full Adder</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-success">
            Open in sandbox
          </a>
        </div>
      </CardDiv>
    </Wrapper>
  );
};

export default Examples;
