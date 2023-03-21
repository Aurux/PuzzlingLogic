import React, { useState } from "react";
import styled from "styled-components";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import { v4 as uuidv4 } from "uuid";

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
  cursor: "grab";
`;

const Scrollable = styled.ul`
  max-height: 60%;
  overflow: auto;
`;

const Node = styled.button`
  font-size: 10px;
  width: 20px;
  border: solid black;
  border-radius: 50%;
  background: #25a07f;
  color: #25a07f;
  display: inline-block;
  cursor: crosshair;
  z-index: 10;
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
  { type: "LED", inputs: { y1: -8.5, x1: -60 } },
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
  const [circuit, setCircuit] = useState<any[]>([]);
  const [arrows, setArrows] = useState<any[]>([]);
  const [start, setStart] = useState<string>("");
  const [compIndex, setCompIndex] = useState<number>(0);
  const updateXarrow = useXarrow();

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
    let newData = data.slice(-25);
    if (event.currentTarget.id === "playArea") {
      const yPos = event.clientY;
      const xPos = event.clientX;
      let type = data.slice(-7, -4).toUpperCase();
      if (type === "LOF") {
        type = "LED";
      }
      if (type === "SOF" || type === "SON") {
        type = "INPUT";
      }
      if (type === "ORR") {
        type = "OR";
      }

      // Check if an item with the same src and type already exists in the circuit array
      const existingItemIndex = circuit.findIndex(
        (item) => item.src === newData && item.type === type
      );

      // If it exists and has been added to the playArea before, update its x and y values
      if (
        existingItemIndex !== -1 &&
        circuit[existingItemIndex].addedToPlayArea
      ) {
        setCircuit((previous) =>
          previous.map((item, index) => {
            if (index === existingItemIndex) {
              return { ...item, x: xPos, y: yPos };
            }
            return item;
          })
        );
      } else {
        // If it doesn't exist or hasn't been added to the playArea before,
        // create a new item with a new UUID and set addedToPlayArea to true
        setCircuit((previous) => [
          ...previous,
          {
            id: uuidv4(),
            type: type,
            src: newData,
            x: xPos,
            y: yPos,
            addedToPlayArea: true,
          },
        ]);
      }
    }
    console.log(circuit);
    updateXarrow();
  };

  // This makes box become droppable
  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Reset play area
  const resetPlay = () => {
    setCircuit((previous) => []);
    setArrows((previous) => []);
  };

  const printArrows = () => {
    console.log(arrows);
  };

  const handleNodeStart = (event) => {
    setStart(event.currentTarget.id);
    console.log(start.slice(1, 3));
  };

  const handleNodeEnd = (event) => {
    setArrows((previous) => [
      ...previous,
      { start: start, end: event.target.id },
    ]);
    setStart((previous) => "");
  };

  // Set node buttons
  function setupNodes(type: string, componentInd: number, itemPos: number[]) {
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
          onMouseDown={handleNodeStart}
          onMouseUp={handleNodeEnd}
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
            onMouseDown={handleNodeStart}
            onMouseUp={handleNodeEnd}
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
          onMouseDown={handleNodeStart}
          onMouseUp={handleNodeEnd}
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

  const switchInput = (index: number) => {
    console.log(circuit[index].src);
    switch (circuit[index].src) {
      case "/src/assets/gates/sof.png":
        setCircuit(
          circuit.map((item, ind) =>
            ind === index
              ? { ...item, src: "/src/assets/gates/son.png" }
              : { ...item }
          )
        );
        console.log(circuit[index].src);
        break;
      case "/src/assets/gates/son.png":
        setCircuit(
          circuit.map((item, ind) =>
            ind === index
              ? { ...item, src: "/src/assets/gates/sof.png" }
              : { ...item }
          )
        );
        break;
      default:
        break;
    }
  };

  const updateArr = (event) => {
    updateXarrow();
  };

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
          <button
            type="button"
            className="btn btn-warning"
            onClick={printArrows}
          >
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
        <Xwrapper>
          {circuit.map((item, index) => (
            <div id={item.id}>
              <img
                key={index}
                id={item.id}
                className="compo"
                src={item.src}
                style={{
                  position: "fixed",
                  width: "100px",
                  left: item.x - 50,
                  top: item.y - 25,
                  cursor: "move",
                  zIndex: 5,
                }}
                onDrop={updateArr}
                onClick={
                  item.type === "INPUT" ? () => switchInput(index) : null
                }
              />
              {setupNodes(item.type, item.id, [item.x, item.y])}
            </div>
          ))}
          {arrows.map((ar) => (
            <Xarrow
              showHead={false}
              curveness={0.5}
              animateDrawing={true}
              path="grid"
              start={ar.start}
              end={ar.end}
              startAnchor={ar.start.slice(1, 3) === "ou" ? "right" : "left"}
              endAnchor={ar.end.slice(1, 3) === "ou" ? "left" : "right"}
              key={ar.start + "-." + ar.start}
              zIndex={1}
            />
          ))}
        </Xwrapper>
      </PlayArea>
    </Wrapper>
  );
};

export default Play;
