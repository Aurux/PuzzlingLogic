import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import { v4 as uuidv4 } from "uuid";

import InvertedChip from "/src/assets/chip2.png";
import LEDOff from "/src/assets/gates/lof.png";
import SwitchOff from "/src/assets/gates/sof.png";
import ANDGate from "/src/assets/gates/and.png";
import NOTGate from "/src/assets/gates/not.png";
import ORGate from "/src/assets/gates/orr.png";
import XORGate from "/src/assets/gates/xor.png";
import LEDOn from "/src/assets/gates/lon.png";
import SwitchOn from "/src/assets/gates/son.png";
import NANDGate from "/src/assets/gates/nan.png";
import NORGate from "/src/assets/gates/nor.png";
import XNORGate from "/src/assets/gates/xno.png";

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
    name: "Output",
    src: LEDOff,
  },
  {
    name: "Input",
    src: SwitchOff,
  },
  {
    name: "AND gate",
    src: ANDGate,
  },
  {
    name: "NOT gate",
    src: NOTGate,
  },
  {
    name: "OR gate",
    src: ORGate,
  },
  {
    name: "XOR gate",
    src: XORGate,
  },
  {
    name: "LED-ON",
    src: LEDOn,
  },
  {
    name: "INPUT-ON",
    src: SwitchOn,
  },
  {
    name: "NAND gate",
    src: NANDGate,
  },
  {
    name: "NOR gate",
    src: NORGate,
  },
  {
    name: "XNOR gate",
    src: XNORGate,
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
    type: "NAND",
    inputs: { y1: -24, x1: -60, y2: -4, x2: -60 },
    outputs: { y1: -14, x1: 42 },
  },
  {
    type: "OR",
    inputs: { y1: -24, x1: -60, y2: -4, x2: -60 },
    outputs: { y1: -14, x1: 42 },
  },
  {
    type: "NOR",
    inputs: { y1: -24, x1: -60, y2: -4, x2: -60 },
    outputs: { y1: -14, x1: 42 },
  },
  {
    type: "XOR",
    inputs: { y1: -24, x1: -60, y2: -4, x2: -60 },
    outputs: { y1: -14, x1: 42 },
  },
  {
    type: "XNOR",
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
  const [toolDrag, setToolDrag] = useState<boolean>(false);
  const [draggedID, setDraggedID] = useState<any>("");
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (running) {
        simLogic();
      }
    }, 500);
    return () => clearInterval(timer);
  }, [running]);

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
      if (type === "LOF" || type === "LON") {
        type = "LED";
      }
      if (type === "SOF" || type === "SON") {
        type = "INPUT";
      }
      if (type === "ORR") {
        type = "OR";
      }
      if (type === "NAN") {
        type = "NAND";
      }
      if (type === "XNO") {
        type = "XNOR";
      }

      const existingItemIndex = circuit.findIndex(
        (item) =>
          item.type === type && item.addedToPlayArea && item.id === draggedID
      );

      // If it exists and has been added to the playArea before, update its x and y values
      if (existingItemIndex !== -1 && toolDrag === false) {
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
        let output = type === "NOT" ? true : false;
        setCircuit((previous) => [
          ...previous,
          {
            id: uuidv4(),
            type: type,
            src: newData,
            x: xPos,
            y: yPos,
            addedToPlayArea: true,
            outputHigh: output,
          },
        ]);
        setToolDrag(false);
        setDraggedID("");
      }
    }
  };

  // This makes box become droppable
  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Reset play area
  function resetPlay() {
    setCircuit((previous) => []);
    setArrows((previous) => []);
  }

  const handleNodeStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    setStart(target.id);
  };

  const handleNodeEnd = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    if (start !== target.id) {
      setArrows((previous) => [
        ...previous,
        { start: start, end: target.id, active: false, key: uuidv4() },
      ]);
    }

    setStart((previous) => "");
  };

  const handleClearConnections = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = event.target as HTMLElement;
    const arrowsToKeep = arrows.filter(
      (item) => !(item.start === target.id || item.end === target.id)
    );

    setArrows(arrowsToKeep);
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
          id={componentInd.toString() + "-input0"}
          onMouseUp={handleNodeEnd}
          style={{
            position: "fixed",

            left: itemPos[0] + nodeOffset[index].inputs!.x1,
            top: itemPos[1] + nodeOffset[index].inputs!.y1,
          }}
          onDoubleClick={handleClearConnections}
        >
          B
        </Node>
      );
      if (typeof nodeOffset[index].inputs!.y2 !== "undefined") {
        returnArr.push(
          <Node
            id={componentInd.toString() + "-input1"}
            onMouseUp={handleNodeEnd}
            style={{
              position: "fixed",

              left: itemPos[0] + nodeOffset[index].inputs!.x2!,
              top: itemPos[1] + nodeOffset[index].inputs!.y2!,
            }}
            onDoubleClick={handleClearConnections}
          >
            B
          </Node>
        );
      }
    }
    if (typeof nodeOffset[index].outputs !== "undefined") {
      returnArr.push(
        <Node
          id={componentInd.toString() + "-output0"}
          onMouseDown={handleNodeStart}
          style={{
            position: "fixed",

            left: itemPos[0] + nodeOffset[index].outputs!.x1,
            top: itemPos[1] + nodeOffset[index].outputs!.y1,
          }}
          onDoubleClick={handleClearConnections}
        >
          B
        </Node>
      );
    }

    return returnArr;
  }

  function topologicalSort(circuit: any[], arrows: any[]) {
    // Create an adjacency list to represent the DAG (directed acyclic graph)
    let graph: { [key: string]: any } = {};
    circuit.forEach((item) => {
      graph[item.id] = [];
    });
    arrows.forEach((arrow) => {
      graph[arrow.start.slice(0, 36)].push(arrow.end.slice(0, 36));
    });

    // Perform DFS on the DAG
    let visited: Set<Object> = new Set();
    let stack: any[] = [];
    console.log(graph);
    for (let node in graph) {
      if (!visited.has(node)) {
        dfs(node, visited, stack, graph);
      }
    }

    // Return the topological order
    return stack.reverse();
  }

  function dfs(
    node: string,
    visited: Set<Object>,
    stack: any[],
    graph: { [key: string]: any }
  ) {
    // Depth first search algorithm
    visited.add(node);
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, visited, stack, graph);
      }
    }
    stack.push(node);
  }

  function simLogic() {
    // Store temporary state arrays
    let updatedArrows = [...arrows];
    let updatedCircuit = [...circuit];

    let topoOrder = topologicalSort(circuit, arrows);

    for (let i = 0; i < topoOrder.length; i++) {
      let item = updatedCircuit.find((item) => item.id === topoOrder[i]);

      // Process logic for inputs

      if (item.type === "INPUT") {
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = item.outputHigh;
            }
          }
        }
      }
      // Process logic for AND
      if (item.type === "AND") {
        let inputArrows0 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let inputArrows1 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input1" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = inputArrows0 && inputArrows1;
            }
          }
        }
      }

      // Process logic for NAND
      if (item.type === "NAND") {
        let inputArrows0 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let inputArrows1 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input1" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = !(inputArrows0 && inputArrows1);
            }
          }
        }
      }

      // Process logic for NOT
      if (item.type === "NOT") {
        let inputArrows = updatedArrows.filter(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        const isActive = inputArrows.length > 0;

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (updatedArrows[k].start === outputArrows[j].start) {
              updatedArrows[k].active = !(isActive && item.outputHigh);
            }
          }
        }
      }

      // Process logic for OR
      if (item.type === "OR") {
        let inputArrows0 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let inputArrows1 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input1" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = inputArrows0 || inputArrows1;
            }
          }
        }
      }

      // Process logic for NOR
      if (item.type === "NOR") {
        let inputArrows0 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let inputArrows1 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input1" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = !(inputArrows0 || inputArrows1);
            }
          }
        }
      }

      // Process logic for XOR
      if (item.type === "XOR") {
        let inputArrows0 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let inputArrows1 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input1" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = inputArrows0 != inputArrows1;
            }
          }
        }
      }

      // Process logic for XNOR
      if (item.type === "XNOR") {
        let inputArrows0 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );
        let inputArrows1 = updatedArrows.some(
          (arrow) => arrow.end === item.id + "-input1" && arrow.active === true
        );
        let outputArrows = updatedArrows.filter(
          (arrow) => arrow.start === item.id + "-output0"
        );

        for (let j = 0; j < outputArrows.length; j++) {
          for (let k = 0; k < updatedArrows.length; k++) {
            if (
              updatedArrows[k].start === outputArrows[j].start ||
              updatedArrows[k].end === outputArrows[j].end
            ) {
              updatedArrows[k].active = !(inputArrows0 != inputArrows1);
            }
          }
        }
      }

      // Process logic for LEDs

      if (item.type === "LED") {
        let inputArrows = updatedArrows.filter(
          (arrow) => arrow.end === item.id + "-input0" && arrow.active === true
        );

        if (inputArrows.length > 0) {
          updatedCircuit = updatedCircuit.map((comp) =>
            comp.id === item.id ? { ...comp, outputHigh: true } : { ...comp }
          );
        } else if (inputArrows.length === 0) {
          updatedCircuit = updatedCircuit.map((comp) =>
            comp.id === item.id ? { ...comp, outputHigh: false } : { ...comp }
          );
        }
      }
    }
    setArrows(updatedArrows);
    setCircuit(updatedCircuit);
  }

  const switchInput = (id: string) => {
    const foundItem = circuit.find((item) => item.id === id);

    switch (foundItem.outputHigh) {
      case false:
        setCircuit(
          circuit.map((item) =>
            item.id === foundItem.id
              ? { ...item, src: ImageList[7].src, outputHigh: true }
              : { ...item }
          )
        );

        break;
      case true:
        setCircuit(
          circuit.map((item) =>
            item.id === foundItem.id
              ? { ...item, src: ImageList[1].src, outputHigh: false }
              : { ...item }
          )
        );
        break;
      default:
        break;
    }
  };

  interface CircuitComponentProps {
    id: string;
  }

  const CircuitComponent: React.FunctionComponent<CircuitComponentProps> = ({
    id,
  }) => {
    const updateXarrow = useXarrow();

    const foundItem = circuit.find((item) => item.id === id);

    let imgSrc = foundItem.src;
    if (foundItem.type === "LED" && foundItem.outputHigh) {
      imgSrc = ImageList[6].src;
    }

    const inputSwap = (id: string) => {
      if (running) {
        setTimeout(() => {
          () => setRunning(false);
        }, 500);

        switchInput(foundItem.id);
        setTimeout(() => {
          () => setRunning(true);
        }, 500);
      } else {
        switchInput(foundItem.id);
      }
    };

    return (
      <img
        id={id}
        className="compo"
        src={imgSrc}
        style={{
          position: "fixed",
          width: "100px",
          left: foundItem.x - 50,
          top: foundItem.y - 25,
          cursor: "move",
          zIndex: 5,
        }}
        onDrag={() => {
          setDraggedID(id);
          updateXarrow;
        }}
        onDragEnd={() => {
          setTimeout(() => {
            updateXarrow();
          }, 500);
        }}
        onClick={
          foundItem.type === "INPUT" ? () => inputSwap(foundItem.id) : () => {}
        }
      />
    );
  };

  const arrowStates = () => {
    // For testing purposes
    console.log("arrows");
    console.log(arrows);
    console.log("circuit");
    console.log(circuit);
  };

  return (
    <Wrapper>
      <Toolbox id="toolbox">
        <img src={InvertedChip} />
        <Buttons
          className="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setRunning(false);
              resetPlay();
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => setRunning(false)}
          >
            Pause
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setRunning(true)}
          >
            {running ? "Running" : "Run"}
          </button>
        </Buttons>
        <Scrollable className="list-group">
          {ImageList.map((item) => {
            if (item.name !== "INPUT-ON" && item.name !== "LED-ON") {
              return (
                <ListItem className="list-group-item">
                  <LeftItem>{item.name}&emsp;&emsp;</LeftItem>
                  <RightItem>
                    <GateIcon
                      src={item.src}
                      onDragStart={() => setToolDrag(true)}
                    />
                  </RightItem>
                </ListItem>
              );
            }
          })}
        </Scrollable>
      </Toolbox>
      <PlayArea id="playArea" onDragOver={allowDrop} onDrop={dropHandler}>
        <Xwrapper>
          {circuit.map((item, index) => (
            <div id={item.id} key={item.id}>
              <CircuitComponent id={item.id} key={item.id} />
              {setupNodes(item.type, item.id, [item.x, item.y])}
            </div>
          ))}
          {arrows.map((ar) => (
            <Xarrow
              showHead={false}
              showTail={false}
              animateDrawing={true}
              path="grid"
              gridBreak="20%-20%"
              start={ar.start}
              end={ar.end}
              color={ar.active ? "#25A07F" : "#444853"}
              startAnchor={"bottom"}
              endAnchor={"top"}
              //key={ar.key}
              zIndex={ar.active ? 2 : 1}
            />
          ))}
        </Xwrapper>
      </PlayArea>
    </Wrapper>
  );
};

export default Play;
