import React, { useState, useRef } from "react";
import styled from "styled-components";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
`;

const RightItem = styled.div`
  display: block;
  position: relative;
  float: right;
  width: 50%;
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
`;

const Scrollable = styled.ul`
  max-height: 60%;
  overflow: auto;
`;

const Component = styled.img`
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
`;

const Node = styled.button`
  font-size: 10px;
  width: 20px;
  border: solid black;
  border-radius: 50%;
  background: #25a07f;
  color: #25a07f;
  display: inline-block;
`;

// Image List
const ImageList = [
  {
    id: 0,
    src: "/src/assets/gates/lof.png",
  },
  {
    id: 1,
    src: "/src/assets/gates/sof.png",
  },
  {
    id: 2,
    src: "/src/assets/gates/and.png",
  },
  {
    id: 3,
    src: "/src/assets/gates/not.png",
  },
  {
    id: 4,
    src: "/src/assets/gates/orr.png",
  },
  {
    id: 5,
    src: "/src/assets/gates/xor.png",
  },
];

const nodeOffset = [
  { type: "LED", inputs: { y1: -9.2, x1: -60 } },
  {
    type: "AND",
    inputs: { y1: -24, x1: -60, y2: -4, x2: -60 },
    outputs: { y1: -14, x1: 42 },
  },
  {
    type: "OR",
    inputs: { y1: -24, x1: -60, y2: -4, x2: -60 },
    outputs: { y1: -14, x1: 42 },
  },
  {
    type: "XOR",
    inputs: { y1: -24, x1: -60, y2: -4, x2: -60 },
    outputs: { y1: -14, x1: 42 },
  },
  { type: "NOT", inputs: { y1: -13, x1: -60 }, outputs: { y1: -13, x1: 42 } },
  { type: "INPUT", outputs: { y1: -10, x1: 45 } },
];

const Play = () => {
  // Get states of various things
  const [content, setContent] = useState<string>("");
  const [pos, setPos] = useState<number[]>([]);
  const [circuit, setCircuit] = useState<any[]>([]);

  // Triggered when drag starts
  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    data: string
  ) => {
    event.dataTransfer.setData("text", data);
  };

  // Triggered when dropping
  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    console.log(data);
    if (event.currentTarget.id === "playArea") {
      const yPos = event.clientY;
      const xPos = event.clientX;
      let type = data.slice(-7, -4).toUpperCase();
      if (type === "LOF") {
        type = "LED";
      }
      if (type === "SOF") {
        type = "INPUT";
      }
      if (type === "ORR") {
        type = "OR";
      }
      setCircuit((previous) => [
        ...previous,
        { type: type, src: data, x: xPos, y: yPos },
      ]);
      console.log(circuit);
    }
  };

  // This makes box become droppable
  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(event.currentTarget.id);
  };

  // Reset play area
  const resetPlay = () => {
    setCircuit((previous) => []);
  };

  // For moving components that are in the play area
  const moveComp = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.currentTarget.id;
    //const document.getElementById('playArea')?.offsetLeft
    const yPos = event.clientY;
    const xPos = event.clientX;
    setCircuit(
      circuit.map((item, index) =>
        index === parseInt(id) ? { ...item, x: xPos, y: yPos } : { ...item }
      )
    );

    console.log(id);
  };

  // Set node buttons
  function setupNodes(type: string, componentInd: number, itemPos: number[]) {
    console.log("here: " + type);
    let index = 0;
    for (let i = 0; i < nodeOffset.length; i++) {
      if (nodeOffset[i].type === type) {
        index = i;
      }
    }
    var returnArr = [];
    if (typeof nodeOffset[index].inputs !== "undefined") {
      returnArr.push(
        <Node
          id={componentInd.toString() + "input0"}
          className={componentInd.toString() + "input0"}
          style={{
            position: "fixed",

            left: itemPos[0] + nodeOffset[index].inputs.x1,
            top: itemPos[1] + nodeOffset[index].inputs.y1,
          }}
        >
          B
        </Node>
      );
      if (typeof nodeOffset[index].inputs.y2 !== "undefined") {
        returnArr.push(
          <Node
            id={componentInd.toString() + "input1"}
            className={componentInd.toString() + "input1"}
            style={{
              position: "fixed",

              left: itemPos[0] + nodeOffset[index].inputs.x2,
              top: itemPos[1] + nodeOffset[index].inputs.y2,
            }}
          >
            B
          </Node>
        );
      }
    }
    if (typeof nodeOffset[index].outputs !== "undefined") {
      returnArr.push(
        <Node
          id={componentInd.toString() + "output0"}
          className={componentInd.toString() + "output0"}
          style={{
            position: "fixed",

            left: itemPos[0] + nodeOffset[index].outputs.x1,
            top: itemPos[1] + nodeOffset[index].outputs.y1,
          }}
        >
          B
        </Node>
      );
    }

    return returnArr;
  }

  return (
    <Wrapper>
      <Toolbox id="toolbox">
        <img src="/src/assets/chip2.png" />
        <Buttons
          className="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button type="button" className="btn btn-danger" onClick={resetPlay}>
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
              <GateIcon src={ImageList[0].src} />
            </RightItem>
          </ListItem>
          <ListItem className="list-group-item">
            <LeftItem>Input&emsp;&emsp;</LeftItem>
            <RightItem>
              <GateIcon src={ImageList[1].src} />
            </RightItem>
          </ListItem>
          <ListItem className="list-group-item">
            <LeftItem>AND gate&emsp;&emsp;</LeftItem>
            <RightItem>
              <GateIcon src={ImageList[2].src} />
            </RightItem>
          </ListItem>
          <ListItem className="list-group-item">
            <LeftItem>NOT gate&emsp;&emsp;</LeftItem>
            <RightItem>
              <GateIcon src={ImageList[3].src} />
            </RightItem>
          </ListItem>
          <ListItem className="list-group-item">
            <LeftItem>OR gate&emsp;&emsp;</LeftItem>
            <RightItem>
              <GateIcon src={ImageList[4].src} />
            </RightItem>
          </ListItem>
          <ListItem className="list-group-item">
            <LeftItem>XOR gate&emsp;&emsp;</LeftItem>
            <RightItem>
              <GateIcon src={ImageList[5].src} />
            </RightItem>
          </ListItem>
        </Scrollable>
      </Toolbox>
      <PlayArea id="playArea" onDragOver={allowDrop} onDrop={dropHandler}>
        <canvas>
          {circuit.map((item, index) => (
            <div>
              <img
                key={index}
                id={index.toString()}
                src={item.src}
                style={{
                  position: "fixed",
                  width: "100px",
                  left: item.x - 50,
                  top: item.y - 25,
                }}
                onDrag={moveComp}
              />
              {setupNodes(item.type, index, [item.x, item.y])}
            </div>
          ))}
        </canvas>
      </PlayArea>
    </Wrapper>
  );
};

export default Play;
