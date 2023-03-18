import React, { useState } from "react";
import styled from "styled-components";

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
  color: white;
  text-align: center;
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
      <Image
        src={
          currentState === true
            ? "/src/assets/chip.gif"
            : "/src/assets/chip.png"
        }
      />
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
    </Wrapper>
  );
};

export default Home;
