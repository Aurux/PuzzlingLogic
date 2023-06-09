import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import { v4 as uuidv4 } from "uuid";

import { CircuitItem, ArrowItem } from "./Examples";

// Multimedia imports
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

import resetVid from "/src/assets/helpVideos/reset.webm";
import linkVid from "/src/assets/helpVideos/makeLink.webm";
import addMoveVid from "/src/assets/helpVideos/addRemoveMoveComp.webm";
import inputVid from "/src/assets/helpVideos/toggleInputs.webm";

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
  display: flex;
  position: relative;
  float: right;
  width: 85%;
  border: solid #444853;
  border-radius: 0 10px 10px 0;
  background: #b3b3b3;
  justify-content: center;
  align-items: center;
`;

const Toolbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  float: left;
  width: 15%;
  border: solid #444853;
  border-radius: 10px 0 0 10px;
  background: #444853;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

const InfoPill = styled.span`
  zindex: 50;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: larger;
`;

const LogoIcon = styled.img`
  width: 90%;
  height: 90%;

  top: 50%;
  left: 50%;
  transform: translate(5%, 5%);
`;

const GateIcon = styled.img`
  width: 80%;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #b3b3b3;
  position: relative;
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
  max-height: 70%;
  overflow: auto;
  body::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Node = styled.button`
  font-size: 10px;
  width: 20px;
  height: 20px;
  border: solid black;
  border-radius: 50%;
  background: #25a07f;
  color: #25a07f;
  display: inline-block;
  cursor: crosshair;
  z-index: 10;
`;

const HelpButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const HelpDiv = styled.div`
  background: #444853;
  display: flex;
  flex-direction: column;
  position: relative;
  float: right;
  width: 85%;
  border: solid #444853;
  border-radius: 0 10px 10px 0;
  justify-content: center;
  align-items: center;
  color: white;
`;

const HelpTableData = styled.td`
  text-align: center;
`;

const ToolBoxImgDiv = styled.div`
  position: relative;

  justify-content: center;
  align-items: center;
  height: 30%;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const TooltipDiv = styled.div`
  position: relative;

  justify-content: center;
  align-items: center;

  height: 30%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TooltipTable = styled.table`
  width: 100%;
  table-layout: fixed;
  background-color: rgba(255, 255, 255, 0.3);
`;

const TooltipTableHead = styled.th`
  text-align: center;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;
`;

const TooltipTableData = styled.td`
  text-align: center;
  font-weight: 300;
  color: #fff;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
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

// Offset map for connection nodes.
const nodeOffset = [
  { type: "LED", inputs: { y1: -10, x1: -60 } },
  {
    type: "AND",
    inputs: { y1: -20, x1: -60, y2: 0, x2: -60 },
    outputs: { y1: -10, x1: 45 },
  },
  {
    type: "NAND",
    inputs: { y1: -20, x1: -60, y2: 0, x2: -60 },
    outputs: { y1: -10, x1: 48 },
  },
  {
    type: "OR",
    inputs: { y1: -20, x1: -60, y2: 0, x2: -60 },
    outputs: { y1: -10, x1: 45 },
  },
  {
    type: "NOR",
    inputs: { y1: -20, x1: -60, y2: 0, x2: -60 },
    outputs: { y1: -10, x1: 45 },
  },
  {
    type: "XOR",
    inputs: { y1: -20, x1: -60, y2: 0, x2: -60 },
    outputs: { y1: -10, x1: 45 },
  },
  {
    type: "XNOR",
    inputs: { y1: -20, x1: -60, y2: 0, x2: -60 },
    outputs: { y1: -10, x1: 48 },
  },
  { type: "NOT", inputs: { y1: -13, x1: -60 }, outputs: { y1: -13, x1: 42 } },
  { type: "INPUT", outputs: { y1: -10, x1: 40 } },
];

interface Props {
  circuit?: CircuitItem[];
  arrows?: ArrowItem[];
  onMount: () => void;
}

const Play: React.FC<Props> = (props) => {
  // Get states of various things
  const [circuit, setCircuit] = useState<any[]>([]);
  const [arrows, setArrows] = useState<any[]>([]);
  const [start, setStart] = useState<string>("");
  const [toolDrag, setToolDrag] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(false);
  const [isHelpHidden, setIsHelpHidden] = useState(true);
  const [tooltipShow, setTooltipShow] = useState<string>("");

  // Set circuit from example if props are set.
  useEffect(() => {
    if (props.circuit !== undefined && props.arrows !== undefined) {
      setCircuit(props.circuit);
      setArrows(props.arrows);
      props.onMount();
    }
  }, []);

  // Used to run the circuit simulation constantly when started.
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
    data: string,
    id: string
  ) => {
    event.dataTransfer.setData("text", data);
    event.dataTransfer.setData("id", id);
  };

  // Triggered when dropping
  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!running) {
      const data = event.dataTransfer.getData("text");
      const sentID = event.dataTransfer.getData("id");
      console.log("Item dragged: ", data);
      console.log("Item dragged: ", sentID);

      if (event.currentTarget.id === "playArea") {
        const yPos = event.clientY;
        const xPos = event.clientX;
        let type = "";
        let isGate = true;
        if (data.includes("lof") || data.includes("lon")) {
          type = "LED";
        }
        if (data.includes("sof") || data.includes("son")) {
          type = "INPUT";
        }
        if (data.includes("orr")) {
          type = "OR";
        }
        if (data.includes("nan")) {
          type = "NAND";
        }
        if (data.includes("xno")) {
          type = "XNOR";
        }
        if (data.includes("xor")) {
          type = "XOR";
        }
        if (data.includes("not")) {
          type = "NOT";
        }
        if (data.includes("and")) {
          type = "AND";
        }
        if (data.includes("nor")) {
          type = "NOR";
        }
        if (data.includes("github") || data.includes("chip")) {
          isGate = false;
        }

        const existingItemIndex = circuit.findIndex(
          (item) =>
            item.type === type && item.addedToPlayArea && item.id === sentID
        );

        if (isGate) {
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
                src: data,
                x: xPos,
                y: yPos,
                addedToPlayArea: true,
                outputHigh: output,
              },
            ]);
            setToolDrag(false);
          }
        }
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

  // Called when user starts dragging from start node.
  const handleNodeStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    setStart(target.id);
  };

  // Connects start to end node.
  const handleNodeEnd = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!running) {
      const target = event.target as HTMLElement;
      if (start !== target.id) {
        const startBtn = document.getElementById(start);
        const endBtn = document.getElementById(target.id);
        if (startBtn) {
          startBtn.style.backgroundColor = "yellow";
          startBtn.style.color = "yellow";
        }
        if (endBtn) {
          endBtn.style.backgroundColor = "yellow";
          endBtn.style.color = "yellow";
        }

        setArrows((previous) => [
          ...previous,
          { start: start, end: target.id, active: false, key: uuidv4() },
        ]);
        setTimeout(() => {
          if (startBtn) {
            startBtn.style.backgroundColor = "#25a07f";
            startBtn.style.color = "#25a07f";
          }
          if (endBtn) {
            endBtn.style.backgroundColor = "#25a07f";
            endBtn.style.color = "#25a07f";
          }
        }, 1000);
      }

      setStart((previous) => "");
    }
  };

  // Clear all connections from selected node.
  const handleClearConnections = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!running && event.button === 1) {
      const target = event.target as HTMLElement;
      const arrowsToKeep = arrows.filter(
        (item) => !(item.start === target.id || item.end === target.id)
      );

      setArrows(arrowsToKeep);
    }
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
          onAuxClick={handleClearConnections}
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
            onAuxClick={handleClearConnections}
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
          onAuxClick={handleClearConnections}
        >
          B
        </Node>
      );
    }

    return returnArr;
  }

  // Topological sort function for setting the order in which nodes are processed during simulation. This makes sure the signal stays "true" from input to output.
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

  // Simulate logical operations for the circuit.
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

  // Toggle output for input components.
  const switchInput = (id: string) => {
    if (!running) {
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
    }
  };

  interface CircuitComponentProps {
    id: string;
  }

  // Delete selected circuit component.
  const handleDeleteComponent = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (!running && event.button === 1) {
      const arrowsToKeep = arrows.filter(
        (item) =>
          !(
            item.start.slice(0, 36) === target.id ||
            item.end.slice(0, 36) === target.id
          )
      );
      const circuitToKeep = circuit.filter((item) => !(item.id === target.id));

      setArrows(arrowsToKeep);
      setCircuit(circuitToKeep);
    }
  };

  // Circuit "componenent" component. Also handles arrow updates when components are moved.
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

    // Labels for example circuits.
    const labelXOffset =
      foundItem.type === "INPUT"
        ? foundItem.x - 65 - foundItem.label?.length * 8.5
        : foundItem.x + 60;

    let labelVisible =
      foundItem.type === "INPUT" || foundItem.type === "LED" ? true : false;

    labelVisible = foundItem.label?.length > 0 ? true : false;

    return (
      <>
        <img
          id={id}
          className="compo"
          src={imgSrc}
          style={{
            position: "fixed",
            height: "50px",
            left: foundItem.x - 50,
            top: foundItem.y - 25,
            cursor: "move",
            zIndex: 5,
          }}
          onDrag={() => {
            updateXarrow;
          }}
          onDragStart={(event) => {
            dragStartHandler(event, imgSrc, id);
          }}
          onDragEnd={() => {
            setTimeout(() => {
              updateXarrow();
            }, 500);
          }}
          onClick={
            foundItem.type === "INPUT"
              ? () => inputSwap(foundItem.id)
              : () => {}
          }
          onAuxClick={handleDeleteComponent}
          onMouseEnter={() => handleMouseEnter(foundItem.type)}
          onMouseLeave={handleMouseLeave}
        />
        {labelVisible ? (
          <div
            style={{
              position: "fixed",
              left: labelXOffset,
              top: foundItem.y - 14,
              fontWeight: "bold",
              fontSize: "larger",
              textAlign: "right",
              border: "2px solid black",
              borderRadius: "5px",
              padding: "2px",
              background: "white",
            }}
            dangerouslySetInnerHTML={{ __html: foundItem.label }}
          ></div>
        ) : null}
      </>
    );
  };

  // For hiding and showing the help window.
  const handleHideHelp = () => {
    setIsHelpHidden(!isHelpHidden);
  };

  // Handlers for showing component tooltip on mouseover.
  const handleMouseEnter = (item: string) => {
    setTooltipShow(item);
  };

  const handleMouseLeave = () => {
    setTooltipShow("");
  };

  // Tooltip view component.
  const ComponentTooltip = () => {
    if (tooltipShow == "Output" || tooltipShow == "LED") {
      return (
        <TooltipDiv>
          <h2>Ouptut LED</h2>
          Lights up when receiving a signal.
        </TooltipDiv>
      );
    }
    if (tooltipShow == "Input" || tooltipShow == "INPUT") {
      return (
        <TooltipDiv>
          <h2>Input Switch</h2>
          Outputs a signal when turned on.
        </TooltipDiv>
      );
    }
    if (tooltipShow == "AND gate" || tooltipShow == "AND") {
      return (
        <TooltipDiv>
          <h2>{tooltipShow}</h2>
          Only outputs when both inputs are high.
          <br />
          <TooltipTable>
            <thead>
              <TooltipTableHead>Input A</TooltipTableHead>
              <TooltipTableHead>Input B</TooltipTableHead>
              <TooltipTableHead>Output</TooltipTableHead>
            </thead>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
          </TooltipTable>
        </TooltipDiv>
      );
    }
    if (tooltipShow == "NOT gate" || tooltipShow == "NOT") {
      return (
        <TooltipDiv>
          <h2>{tooltipShow}</h2>
          Outputs the opposite of the input.
          <br />
          <TooltipTable>
            <thead>
              <TooltipTableHead>Input </TooltipTableHead>

              <TooltipTableHead>Output</TooltipTableHead>
            </thead>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
          </TooltipTable>
        </TooltipDiv>
      );
    }
    if (tooltipShow == "OR gate" || tooltipShow == "OR") {
      return (
        <TooltipDiv>
          <h2>{tooltipShow}</h2>
          Outputs a signal when either inputs are high.
          <br />
          <TooltipTable>
            <thead>
              <TooltipTableHead>Input A</TooltipTableHead>
              <TooltipTableHead>Input B</TooltipTableHead>
              <TooltipTableHead>Output</TooltipTableHead>
            </thead>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
          </TooltipTable>
        </TooltipDiv>
      );
    }
    if (tooltipShow == "XOR gate" || tooltipShow == "XOR") {
      return (
        <TooltipDiv>
          <h2>{tooltipShow}</h2>
          Outputs a signal when only 1 of the inputs is high.
          <br />
          <TooltipTable>
            <thead>
              <TooltipTableHead>Input A</TooltipTableHead>
              <TooltipTableHead>Input B</TooltipTableHead>
              <TooltipTableHead>Output</TooltipTableHead>
            </thead>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
          </TooltipTable>
        </TooltipDiv>
      );
    }
    if (tooltipShow == "NAND gate" || tooltipShow == "NAND") {
      return (
        <TooltipDiv>
          <h2>{tooltipShow}</h2>
          Outputs a signal unless both outputs are high.
          <br />
          <TooltipTable>
            <thead>
              <TooltipTableHead>Input A</TooltipTableHead>
              <TooltipTableHead>Input B</TooltipTableHead>
              <TooltipTableHead>Output</TooltipTableHead>
            </thead>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
          </TooltipTable>
        </TooltipDiv>
      );
    }
    if (tooltipShow == "NOR gate" || tooltipShow == "NOR") {
      return (
        <TooltipDiv>
          <h2>{tooltipShow}</h2>
          Outputs a signal only when both outputs are low.
          <br />
          <TooltipTable>
            <thead>
              <TooltipTableHead>Input A</TooltipTableHead>
              <TooltipTableHead>Input B</TooltipTableHead>
              <TooltipTableHead>Output</TooltipTableHead>
            </thead>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
          </TooltipTable>
        </TooltipDiv>
      );
    }
    if (tooltipShow == "XNOR gate" || tooltipShow == "XNOR") {
      return (
        <TooltipDiv>
          <h2>{tooltipShow}</h2>
          Outputs a signal when both inputs are high or both inputs are low.
          <br />
          <TooltipTable>
            <thead>
              <TooltipTableHead>Input A</TooltipTableHead>
              <TooltipTableHead>Input B</TooltipTableHead>
              <TooltipTableHead>Output</TooltipTableHead>
            </thead>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
              <TooltipTableData>0</TooltipTableData>
            </tr>
            <tr>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
              <TooltipTableData>1</TooltipTableData>
            </tr>
          </TooltipTable>
        </TooltipDiv>
      );
    } else {
      return null;
    }
  };

  return (
    <Wrapper>
      <Toolbox>
        {tooltipShow !== "" ? (
          <ComponentTooltip />
        ) : (
          <ToolBoxImgDiv>
            <LogoIcon src={InvertedChip} />
            <InfoPill
              className={
                running
                  ? "badge badge-pill badge-warning"
                  : "badge badge-pill badge-info"
              }
            >
              {running ? "Running" : "Stopped"}
            </InfoPill>
          </ToolBoxImgDiv>
        )}
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
            title="Reset all gates and connections."
          >
            Reset
          </button>

          <button
            type="button"
            className={running ? "btn btn-warning" : "btn btn-success"}
            onClick={() => setRunning(!running)}
            title={running ? "Pause logic" : "Run logic"}
          >
            {running ? "Pause" : "Run"}
          </button>
        </Buttons>
        <Scrollable className="list-group">
          {ImageList.map((item, index) => {
            if (item.name !== "INPUT-ON" && item.name !== "LED-ON") {
              return (
                <ListItem
                  className="list-group-item"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <LeftItem>{item.name}&emsp;&emsp;</LeftItem>
                  <RightItem>
                    <GateIcon
                      src={item.src}
                      onDragStart={(event) =>
                        dragStartHandler(event, item.src, "")
                      }
                    />
                  </RightItem>
                </ListItem>
              );
            }
          })}
        </Scrollable>
      </Toolbox>
      {isHelpHidden && (
        <PlayArea id="playArea" onDragOver={allowDrop} onDrop={dropHandler}>
          <Xwrapper>
            {circuit.map((item, index) => (
              <div id={item.id} key={item.id + "div"}>
                <CircuitComponent id={item.id} key={item.id} />
                {setupNodes(item.type, item.id, [item.x, item.y])}
              </div>
            ))}
            {arrows.map((ar) => (
              <Xarrow
                showHead={false}
                showTail={false}
                //animateDrawing={true}
                path="grid"
                gridBreak="20%20"
                start={ar.start}
                end={ar.end}
                color={ar.active ? "#25A07F" : "#444853"}
                startAnchor="bottom"
                endAnchor="top"
                //key={ar.key}
                zIndex={ar.active ? 2 : 1}
                SVGcanvasStyle={{ margin: 20 }}
              />
            ))}
          </Xwrapper>

          <HelpButton
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleHideHelp}
          >
            Help
          </HelpButton>
        </PlayArea>
      )}
      {!isHelpHidden && (
        <HelpDiv>
          <h1>Video Tutorials</h1>
          <br />
          <table>
            <tr>
              <HelpTableData>
                <b>Adding, removing & repositioning components.</b> <br />
                Drag items with left click, remove with middle click. (Circuit
                must be paused)
                <br />
                <video width="500" controls muted>
                  <source src={addMoveVid} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </HelpTableData>
              <HelpTableData>
                <b>Linking components. (Circuit must be paused)</b>
                <br /> Drag from an output node to an input node.
                <br />
                <video width="500" controls muted>
                  <source src={linkVid} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </HelpTableData>
            </tr>
            <tr>
              <HelpTableData>
                <b>Toggling input components & running the circuit.</b>
                <br /> Left click the component. (Circuit must be paused to
                toggle inputs)
                <br />
                <video width="500" controls muted>
                  <source src={inputVid} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </HelpTableData>
              <HelpTableData>
                <b>Resetting the circuit.</b>
                <br />
                Clears the entire circuit and stops the circuit running.
                <br />
                <video width="500" controls muted>
                  <source src={resetVid} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </HelpTableData>
            </tr>
          </table>
          <HelpButton
            type="button"
            className="btn btn-outline-danger"
            onClick={handleHideHelp}
          >
            Close
          </HelpButton>
        </HelpDiv>
      )}
    </Wrapper>
  );
};

export default Play;
