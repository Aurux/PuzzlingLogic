import React, { useState } from "react";
import styled from "styled-components";

import ChipGif from "/src/assets/chip.gif";
import ChipStill from "/src/assets/chip.png";

// Style
const Wrapper = styled.section`
  padding 2em;
  background: #25a07f;
  height: 100vh;
  display: flex;
  flex-grow: 1;
  justify-content:center;
  margin: 0 auto;
`;

const Content = styled.div`
  display: grid;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #25a07f;
`;

const Image = styled.img`
  
  position: relative;
  
  margin-left: auto;
  margin-right: auto;
  width: auto;
  height auto;
`;

const Info = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CpuBackground = styled.div<{ animated: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => (props.animated ? ChipGif : ChipStill)});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

interface Props {
  onChangeContent: (page: string) => void;
}

const Home = ({ onChangeContent }: Props) => {
  const [currentState, setCurrentState] = useState(false);
  const clickPlay = (state: boolean) => {
    setCurrentState(state);
    setTimeout(waitFunction, 2500);

    function waitFunction() {
      window.location.href = "#Play";
      onChangeContent("Play");
    }
  };
  return (
    <Wrapper>
      <CpuBackground animated={currentState}>
        {currentState === false ? (
          <Info>
            <Title>
              Learn about the logic operations <br />
              that power your computer!
            </Title>

            <br />
            <button
              type="button"
              className="btn btn-success"
              onClick={() => clickPlay(true)}
            >
              Play
            </button>
          </Info>
        ) : null}
      </CpuBackground>
    </Wrapper>
  );
};

export default Home;
