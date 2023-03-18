import React from "react";
import styled from "styled-components";
import Draggable from "react-draggable";

// Style
const Wrapper = styled.section`
padding 4em 0.5em 0.5em 0.5em;
background: #25a07f;
height: 100vh;
display: flex;
flex-grow: 1;
justify-content:center;
margin: 0 auto;

`;

const PlayArea = styled.div`
  display: block;
  position: relative;
  float: right;
  width: 80%;
  border: solid #444853;
  border-radius: 0 10px 10px 0;
  background: white;
`;

const Toolbox = styled.div`
  display: block;
  float: left;
  width: 20%;
  border: solid #444853;
  border-radius: 10px 0 0 10px;
  background: #444853;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

const GateIcon = styled.img`
  width: 80%;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftItem = styled.div`
  position: relative;
  float: left;
  font-size: larger;
`;

const RightItem = styled.div`
  display: block;
  position: relative;
  float: right;
  width: 50%;
`;

const Scrollable = styled.ul`
  max-height: 45em;
  overflow: auto;
`;

const Play = () => {
  return (
    <>
      <Wrapper>
        <Toolbox>
          <Buttons
            className="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button type="button" className="btn btn-danger">
              Reset
            </button>
            <button type="button" className="btn btn-warning">
              Pause
            </button>
            <button type="button" className="btn btn-success">
              Run
            </button>
          </Buttons>
          <Scrollable className="list-group">
            <ListItem className="list-group-item">
              <LeftItem>LED&emsp;&emsp;</LeftItem>
              <RightItem>
                <Draggable>
                  <GateIcon src="/src/assets/gates/led_off.png" />
                </Draggable>
              </RightItem>
            </ListItem>
            <ListItem className="list-group-item">
              <LeftItem>Input&emsp;&emsp;</LeftItem>
              <RightItem>
                <GateIcon src="/src/assets/gates/switch-off.png" />
              </RightItem>
            </ListItem>
            <ListItem className="list-group-item">
              <LeftItem>AND gate&emsp;&emsp;</LeftItem>
              <RightItem>
                <GateIcon src="/src/assets/gates/and.png" />
              </RightItem>
            </ListItem>
            <ListItem className="list-group-item">
              <LeftItem>NOT gate&emsp;&emsp;</LeftItem>
              <RightItem>
                <GateIcon src="/src/assets/gates/not.png" />
              </RightItem>
            </ListItem>
            <ListItem className="list-group-item">
              <LeftItem>OR gate&emsp;&emsp;</LeftItem>
              <RightItem>
                <GateIcon src="/src/assets/gates/or.png" />
              </RightItem>
            </ListItem>
            <ListItem className="list-group-item">
              <LeftItem>XOR gate&emsp;&emsp;</LeftItem>
              <RightItem>
                <GateIcon src="/src/assets/gates/xor.png" />
              </RightItem>
            </ListItem>
          </Scrollable>
        </Toolbox>
        <PlayArea></PlayArea>
      </Wrapper>
    </>
  );
};

export default Play;
