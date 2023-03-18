import React from "react";
import styled from "styled-components";

// Style
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Play = () => {
  return (
    <Wrapper>
      <Title>Play</Title>
    </Wrapper>
  );
};

export default Play;
