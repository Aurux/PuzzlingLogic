import React, { useState } from "react";
import styled from "styled-components";

import LEDOn from "/src/assets/gates/lon.png";
import OssImg from "/src/assets/examples/oss.png";
import SRLatImg from "/src/assets/examples/SRLatch.png";
import DLatImg from "/src/assets/examples/dlatch.png";
import AdderImg from "/src/assets/examples/adder.png";
// Style
const Wrapper = styled.div`
padding 4em 0.5em 0.5em 0.5em;
background: #25a07f;
height: 100vh;
display: flex;
justify-content:center;
`;

const CardDiv = styled.div`
  width: 18rem;
  height: fit-content;
  margin: 1em;
`;

const LearnLink = styled.a`
  text-decoration: none;
`;

const OssCirc = [
  {
    id: "5fecb288-2e0d-4e85-acab-848351f54f07",
    type: "NOT",
    src: "http://localhost:5173/src/assets/gates/not.png",
    x: 854,
    y: 404,
    addedToPlayArea: true,
    outputHigh: true,
    label: "",
  },
  {
    id: "ea3e6222-ae9d-4bb2-9c9c-1e288baec430",
    type: "NOT",
    src: "http://localhost:5173/src/assets/gates/not.png",
    x: 1000,
    y: 461,
    addedToPlayArea: true,
    outputHigh: true,
    label: "",
  },
  {
    id: "892fe9ec-bd10-47a2-9f5c-e83dd6ce1b3b",
    type: "NOT",
    src: "http://localhost:5173/src/assets/gates/not.png",
    x: 1127,
    y: 523,
    addedToPlayArea: true,
    outputHigh: true,
    label: "",
  },
  {
    id: "ba4dd108-3183-4780-af4d-a3d46cbea772",
    type: "LED",
    src: "http://localhost:5173/src/assets/gates/lof.png",
    x: 1370,
    y: 531,
    addedToPlayArea: true,
    outputHigh: false,
    label: "Output Signal",
  },
];

const OssArr = [
  {
    start: "5fecb288-2e0d-4e85-acab-848351f54f07-output0",
    end: "ea3e6222-ae9d-4bb2-9c9c-1e288baec430-input0",
    active: false,
    key: "978fbbdf-3309-44dd-88c5-b35326143b06",
  },
  {
    start: "ea3e6222-ae9d-4bb2-9c9c-1e288baec430-output0",
    end: "892fe9ec-bd10-47a2-9f5c-e83dd6ce1b3b-input0",
    active: false,
    key: "3fa736bb-66ee-4a5e-9d10-b241fbcf260c",
  },
  {
    start: "892fe9ec-bd10-47a2-9f5c-e83dd6ce1b3b-output0",
    end: "5fecb288-2e0d-4e85-acab-848351f54f07-input0",
    active: false,
    key: "6548c78d-ba4e-43cf-a09f-d0b57f062678",
  },
  {
    start: "892fe9ec-bd10-47a2-9f5c-e83dd6ce1b3b-output0",
    end: "ba4dd108-3183-4780-af4d-a3d46cbea772-input0",
    active: false,
    key: "5aac1e43-ab70-4ecd-b183-79beb510fd06",
  },
];

const SRcirc = [
  {
    id: "7e6a2677-b946-42e8-bb7e-c8b39b5cd436",
    type: "NOR",
    src: "http://localhost:5173/src/assets/gates/nor.png",
    x: 962,
    y: 392,
    addedToPlayArea: true,
    outputHigh: false,
  },
  {
    id: "b029396f-82b3-418f-a0be-c823b5beb3fd",
    type: "NOR",
    src: "http://localhost:5173/src/assets/gates/nor.png",
    x: 940,
    y: 515,
    addedToPlayArea: true,
    outputHigh: false,
  },
  {
    id: "0993bf4a-2580-487d-bd28-2dfc095a89da",
    type: "LED",
    src: "http://localhost:5173/src/assets/gates/lof.png",
    x: 1199,
    y: 388,
    addedToPlayArea: true,
    outputHigh: false,
    label: "Q",
  },
  {
    id: "c78954e0-5580-410d-87ea-e0f6b83f7311",
    type: "LED",
    src: "http://localhost:5173/src/assets/gates/lof.png",
    x: 1201,
    y: 510,
    addedToPlayArea: true,
    outputHigh: false,
    label: "Q&#772;",
  },
  {
    id: "b0ab3c36-1398-4c1a-b99c-1422422f9aaa",
    type: "INPUT",
    src: "http://localhost:5173/src/assets/gates/sof.png",
    x: 738,
    y: 379,
    addedToPlayArea: true,
    outputHigh: false,
    label: "R",
  },
  {
    id: "01ef208c-1526-47ec-ac3e-64e23ae5eadb",
    type: "INPUT",
    src: "http://localhost:5173/src/assets/gates/sof.png",
    x: 741,
    y: 538,
    addedToPlayArea: true,
    outputHigh: false,
    label: "S",
  },
];

const SRarr = [
  {
    start: "7e6a2677-b946-42e8-bb7e-c8b39b5cd436-output0",
    end: "b029396f-82b3-418f-a0be-c823b5beb3fd-input0",
    active: false,
    key: "3547aaa3-cc9a-498c-8da2-89edb57816bd",
  },
  {
    start: "b029396f-82b3-418f-a0be-c823b5beb3fd-output0",
    end: "7e6a2677-b946-42e8-bb7e-c8b39b5cd436-input1",
    active: false,
    key: "cb94293e-e240-48f8-beac-3b3949308c16",
  },
  {
    start: "7e6a2677-b946-42e8-bb7e-c8b39b5cd436-output0",
    end: "0993bf4a-2580-487d-bd28-2dfc095a89da-input0",
    active: false,
    key: "0ea6a309-7dd5-45b5-bf92-0409d6738946",
  },
  {
    start: "b029396f-82b3-418f-a0be-c823b5beb3fd-output0",
    end: "c78954e0-5580-410d-87ea-e0f6b83f7311-input0",
    active: false,
    key: "d6bdab60-58bc-4f9c-b5ca-0bc23efa2f72",
  },
  {
    start: "01ef208c-1526-47ec-ac3e-64e23ae5eadb-output0",
    end: "b029396f-82b3-418f-a0be-c823b5beb3fd-input1",
    active: false,
    key: "d38c3b8a-1607-4673-8a2c-ddd3f78d8072",
  },
  {
    start: "b0ab3c36-1398-4c1a-b99c-1422422f9aaa-output0",
    end: "7e6a2677-b946-42e8-bb7e-c8b39b5cd436-input0",
    active: false,
    key: "cfa790e9-8a67-498c-8c28-d7e81f10a968",
  },
];

const DlatCirc = [
  {
    id: "25086aea-8bec-44f6-84bb-839b34e4aae7",
    type: "NOT",
    src: "http://localhost:5173/src/assets/gates/not.png",
    x: 517,
    y: 384,
    addedToPlayArea: true,
    outputHigh: true,
  },
  {
    id: "452d81b6-de29-4bac-93e6-8e2674d13c51",
    type: "NOT",
    src: "http://localhost:5173/src/assets/gates/not.png",
    x: 623,
    y: 439,
    addedToPlayArea: true,
    outputHigh: true,
  },
  {
    id: "961b9d81-f03d-467a-8287-f37dbfc2d72d",
    type: "NOT",
    src: "http://localhost:5173/src/assets/gates/not.png",
    x: 724,
    y: 486,
    addedToPlayArea: true,
    outputHigh: true,
  },
  {
    id: "8b555d66-5ca5-49fe-8364-50c10fa0fe65",
    type: "INPUT",
    src: "http://localhost:5173/src/assets/gates/sof.png",
    x: 723,
    y: 597,
    addedToPlayArea: true,
    outputHigh: false,
  },
  {
    id: "c82696c7-4383-4c19-b1a3-3b9efa186927",
    type: "LED",
    src: "http://localhost:5173/src/assets/gates/lof.png",
    x: 1420,
    y: 424,
    addedToPlayArea: true,
    outputHigh: false,
  },
  {
    id: "a2faa1f1-4d9c-4189-b148-9e0cb5043514",
    type: "LED",
    src: "http://localhost:5173/src/assets/gates/lof.png",
    x: 1421,
    y: 528,
    addedToPlayArea: true,
    outputHigh: false,
  },
  {
    id: "03841811-06b2-4c4f-8df1-c3ee1e2ed567",
    type: "NOT",
    src: "http://localhost:5173/src/assets/gates/not.png",
    x: 898,
    y: 410,
    addedToPlayArea: true,
    outputHigh: true,
  },
  {
    id: "c0abd5c4-9fc3-4346-ae18-35fe36d0dcfa",
    type: "AND",
    src: "http://localhost:5173/src/assets/gates/and.png",
    x: 1030,
    y: 421,
    addedToPlayArea: true,
    outputHigh: false,
  },
  {
    id: "9ee39945-cd86-444b-a5ca-997faf7f1887",
    type: "AND",
    src: "http://localhost:5173/src/assets/gates/and.png",
    x: 1030,
    y: 546,
    addedToPlayArea: true,
    outputHigh: false,
  },
  {
    id: "67a08a32-081d-4459-8688-26aaa1ca8b89",
    type: "NOR",
    src: "http://localhost:5173/src/assets/gates/nor.png",
    x: 1251,
    y: 432,
    addedToPlayArea: true,
    outputHigh: false,
  },
  {
    id: "70897b0b-9b39-45f2-83c1-324603817b70",
    type: "NOR",
    src: "http://localhost:5173/src/assets/gates/nor.png",
    x: 1203,
    y: 535,
    addedToPlayArea: true,
    outputHigh: false,
  },
];

const DLatArr = [
  {
    start: "25086aea-8bec-44f6-84bb-839b34e4aae7-output0",
    end: "452d81b6-de29-4bac-93e6-8e2674d13c51-input0",
    active: false,
    key: "8e1f1cb7-666d-46ed-8678-535d65cbbcdb",
  },
  {
    start: "452d81b6-de29-4bac-93e6-8e2674d13c51-output0",
    end: "961b9d81-f03d-467a-8287-f37dbfc2d72d-input0",
    active: false,
    key: "aa275b83-fc79-480d-aa76-ba488f75ce22",
  },
  {
    start: "961b9d81-f03d-467a-8287-f37dbfc2d72d-output0",
    end: "25086aea-8bec-44f6-84bb-839b34e4aae7-input0",
    active: false,
    key: "185471da-cf1a-41b2-a380-8cbe885a56ce",
  },
  {
    start: "961b9d81-f03d-467a-8287-f37dbfc2d72d-output0",
    end: "c0abd5c4-9fc3-4346-ae18-35fe36d0dcfa-input1",
    active: false,
    key: "7a9f0dd7-343b-43ce-b96c-d34bfff0e472",
  },
  {
    start: "03841811-06b2-4c4f-8df1-c3ee1e2ed567-output0",
    end: "c0abd5c4-9fc3-4346-ae18-35fe36d0dcfa-input0",
    active: false,
    key: "85f03dbd-e73a-4dc7-a4d2-564baf30f45a",
  },
  {
    start: "8b555d66-5ca5-49fe-8364-50c10fa0fe65-output0",
    end: "03841811-06b2-4c4f-8df1-c3ee1e2ed567-input0",
    active: false,
    key: "b632bd84-2b5b-4f97-a788-f1dce4036f7e",
  },
  {
    start: "961b9d81-f03d-467a-8287-f37dbfc2d72d-output0",
    end: "9ee39945-cd86-444b-a5ca-997faf7f1887-input0",
    active: false,
    key: "61df3f01-fde3-4425-82c7-91cb6cbe85e1",
  },
  {
    start: "8b555d66-5ca5-49fe-8364-50c10fa0fe65-output0",
    end: "9ee39945-cd86-444b-a5ca-997faf7f1887-input1",
    active: false,
    key: "41037b40-ee34-456a-ab11-e1e059b72ccf",
  },
  {
    start: "67a08a32-081d-4459-8688-26aaa1ca8b89-output0",
    end: "70897b0b-9b39-45f2-83c1-324603817b70-input0",
    active: false,
    key: "bdb538dd-78cd-4897-92ea-7312002f647a",
  },
  {
    start: "70897b0b-9b39-45f2-83c1-324603817b70-output0",
    end: "67a08a32-081d-4459-8688-26aaa1ca8b89-input1",
    active: false,
    key: "502da8be-c526-474e-bb23-c35adaf9708e",
  },
  {
    start: "c0abd5c4-9fc3-4346-ae18-35fe36d0dcfa-output0",
    end: "67a08a32-081d-4459-8688-26aaa1ca8b89-input0",
    active: false,
    key: "beae32dd-e4f1-4999-9971-f4d8e41c60b3",
  },
  {
    start: "9ee39945-cd86-444b-a5ca-997faf7f1887-output0",
    end: "70897b0b-9b39-45f2-83c1-324603817b70-input1",
    active: false,
    key: "0f2aa0f3-2ae7-460c-8bc5-e43643b5ab49",
  },
  {
    start: "67a08a32-081d-4459-8688-26aaa1ca8b89-output0",
    end: "c82696c7-4383-4c19-b1a3-3b9efa186927-input0",
    active: false,
    key: "01052ae8-cdfa-4897-b076-d73449baf602",
  },
  {
    start: "70897b0b-9b39-45f2-83c1-324603817b70-output0",
    end: "a2faa1f1-4d9c-4189-b148-9e0cb5043514-input0",
    active: false,
    key: "e4425dd1-9ee0-4658-9575-19556e683a6f",
  },
];

const AdderCirc = [
  {
    id: "306eb09e-9215-447b-82c5-2bc6d4378beb",
    type: "AND",
    src: "http://localhost:5173/src/assets/gates/and.png",
    x: 1021,
    y: 463,
    addedToPlayArea: true,
    outputHigh: false,
    label: "",
  },
  {
    id: "591c8611-7c40-4e1f-b604-9f2682c69aec",
    type: "OR",
    src: "http://localhost:5173/src/assets/gates/orr.png",
    x: 1178,
    y: 529,
    addedToPlayArea: true,
    outputHigh: false,
    label: "",
  },
  {
    id: "1b94cf66-8460-4c79-bebb-b73c02e42789",
    type: "AND",
    src: "http://localhost:5173/src/assets/gates/and.png",
    x: 858,
    y: 573,
    addedToPlayArea: true,
    outputHigh: false,
    label: "",
  },
  {
    id: "147df010-39b5-405e-8d3c-8bc5adf8152b",
    type: "XOR",
    src: "http://localhost:5173/src/assets/gates/xor.png",
    x: 1131,
    y: 343,
    addedToPlayArea: true,
    outputHigh: false,
    label: "",
  },
  {
    id: "88fb4249-954c-40b8-a77f-9dbfc85df310",
    type: "XOR",
    src: "http://localhost:5173/src/assets/gates/xor.png",
    x: 904,
    y: 308,
    addedToPlayArea: true,
    outputHigh: false,
    label: "",
  },
  {
    id: "6e534714-b8c3-4036-b7c9-3ff5915e81e5",
    type: "INPUT",
    src: "/src/assets/gates/sof.png",
    x: 576,
    y: 276,
    addedToPlayArea: true,
    outputHigh: false,
    label: "A",
  },
  {
    id: "68046326-4a39-4bf3-bc99-c4d2b79b9ed8",
    type: "INPUT",
    src: "/src/assets/gates/sof.png",
    x: 564,
    y: 439,
    addedToPlayArea: true,
    outputHigh: false,
    label: "B",
  },
  {
    id: "4eb51f19-bb76-4272-95ea-a89bdeed711f",
    type: "INPUT",
    src: "/src/assets/gates/sof.png",
    x: 572,
    y: 531,
    addedToPlayArea: true,
    outputHigh: false,
    label: "Carry IN",
  },
  {
    id: "225f8e21-f08d-46d6-af79-9f273c2698fd",
    type: "LED",
    src: "http://localhost:5173/src/assets/gates/lof.png",
    x: 1370,
    y: 337,
    addedToPlayArea: true,
    outputHigh: false,
    label: "Sum",
  },
  {
    id: "dd72de73-3f0b-42b5-9e67-7acda39eedb1",
    type: "LED",
    src: "http://localhost:5173/src/assets/gates/lof.png",
    x: 1393,
    y: 532,
    addedToPlayArea: true,
    outputHigh: false,
    label: "Carry OUT",
  },
];

const AdderArr = [
  {
    start: "6e534714-b8c3-4036-b7c9-3ff5915e81e5-output0",
    end: "88fb4249-954c-40b8-a77f-9dbfc85df310-input0",
    active: false,
    key: "659ff8e2-540e-471b-bb72-0b50367c0144",
  },
  {
    start: "6e534714-b8c3-4036-b7c9-3ff5915e81e5-output0",
    end: "1b94cf66-8460-4c79-bebb-b73c02e42789-input0",
    active: false,
    key: "70c4dda6-d38f-4082-8b8a-86b1fbbd1b2d",
  },
  {
    start: "68046326-4a39-4bf3-bc99-c4d2b79b9ed8-output0",
    end: "88fb4249-954c-40b8-a77f-9dbfc85df310-input1",
    active: false,
    key: "3ad6c6eb-01ce-4344-9e54-84f4082dc881",
  },
  {
    start: "4eb51f19-bb76-4272-95ea-a89bdeed711f-output0",
    end: "147df010-39b5-405e-8d3c-8bc5adf8152b-input1",
    active: false,
    key: "d7ca78e0-cc9a-44db-9e86-29b044072d15",
  },
  {
    start: "68046326-4a39-4bf3-bc99-c4d2b79b9ed8-output0",
    end: "1b94cf66-8460-4c79-bebb-b73c02e42789-input1",
    active: false,
    key: "6fd32ba7-d2c2-40a9-939a-91346f1a744f",
  },
  {
    start: "88fb4249-954c-40b8-a77f-9dbfc85df310-output0",
    end: "147df010-39b5-405e-8d3c-8bc5adf8152b-input0",
    active: false,
    key: "ab6f0c9e-1746-45af-83b9-320aba55cee5",
  },
  {
    start: "88fb4249-954c-40b8-a77f-9dbfc85df310-output0",
    end: "306eb09e-9215-447b-82c5-2bc6d4378beb-input0",
    active: false,
    key: "13effc61-2002-4a05-8400-7269f15be620",
  },
  {
    start: "306eb09e-9215-447b-82c5-2bc6d4378beb-output0",
    end: "591c8611-7c40-4e1f-b604-9f2682c69aec-input0",
    active: false,
    key: "8114a82c-c506-4401-afbf-da5994f40a1e",
  },
  {
    start: "4eb51f19-bb76-4272-95ea-a89bdeed711f-output0",
    end: "306eb09e-9215-447b-82c5-2bc6d4378beb-input1",
    active: false,
    key: "ea44aa9f-80d8-4c23-a8c8-5d9c7abf5640",
  },
  {
    start: "1b94cf66-8460-4c79-bebb-b73c02e42789-output0",
    end: "591c8611-7c40-4e1f-b604-9f2682c69aec-input1",
    active: false,
    key: "b3970efd-027f-41da-bd88-efdddc7b836c",
  },
  {
    start: "147df010-39b5-405e-8d3c-8bc5adf8152b-output0",
    end: "225f8e21-f08d-46d6-af79-9f273c2698fd-input0",
    active: false,
    key: "268c059e-59cc-4582-b08a-cef5f2325465",
  },
  {
    start: "591c8611-7c40-4e1f-b604-9f2682c69aec-output0",
    end: "dd72de73-3f0b-42b5-9e67-7acda39eedb1-input0",
    active: false,
    key: "6f93b722-ed56-4722-9c9d-6fd0db55abc2",
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
    switch (name) {
      case "Osscillator":
        importContent(OssCirc, OssArr);
        break;
      case "SRLatch":
        importContent(SRcirc, SRarr);
        break;
      case "DLatch":
        importContent(DlatCirc, DLatArr);
        break;
      case "1BAdder":
        importContent(AdderCirc, AdderArr);
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <CardDiv className="card">
        <img src={OssImg} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Ring Osscillator</h5>
          <p className="card-text">
            Using an odd number of NOT gates connected in a looped series
            produces an osscillating square wave output.
          </p>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              className="btn btn-outline-primary btn-outline-primary"
            >
              <LearnLink
                href="https://en.wikipedia.org/wiki/Ring_oscillator"
                target="_blank"
              >
                Learn more
              </LearnLink>
            </button>

            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => OpenCirc("Osscillator")}
            >
              Open in sandbox
            </button>
          </div>
        </div>
      </CardDiv>
      <CardDiv className="card">
        <img src={SRLatImg} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">S-R Latch</h5>
          <p className="card-text">
            A primitive memory element that operates with signal levels (rather
            than signal transitions) and stores 1 bit of data.
          </p>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              className="btn btn-outline-primary btn-outline-primary"
            >
              <LearnLink
                href="https://www.geeksforgeeks.org/latches-in-digital-logic/"
                target="_blank"
              >
                Learn more
              </LearnLink>
            </button>

            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => OpenCirc("SRLatch")}
            >
              Open in sandbox
            </button>
          </div>
        </div>
      </CardDiv>
      <CardDiv className="card">
        <img src={DLatImg} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">D Latch</h5>
          <p className="card-text">
            A D latch is a primitive memory cell that stores data when the clock
            is high. In this example the clock signal is generated using a ring
            ossilator.
          </p>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              className="btn btn-outline-primary btn-outline-primary"
            >
              <LearnLink
                href="https://www.geeksforgeeks.org/latches-in-digital-logic/"
                target="_blank"
              >
                Learn more
              </LearnLink>
            </button>

            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => OpenCirc("DLatch")}
            >
              Open in sandbox
            </button>
          </div>
        </div>
      </CardDiv>
      <CardDiv className="card">
        <img src={AdderImg} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">1-Bit Full Adder</h5>
          <p className="card-text">
            A full adder adds two 1-bit inputs, plus a carry bit. It outputs the
            sum of the input bits plus a carry bit. The carry OUT bit can be
            chained to another full adder to make higher bit adders.
          </p>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              className="btn btn-outline-primary btn-outline-primary"
            >
              <LearnLink
                href="https://www.geeksforgeeks.org/full-adder-in-digital-logic/"
                target="_blank"
              >
                Learn more
              </LearnLink>
            </button>

            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => OpenCirc("1BAdder")}
            >
              Open in sandbox
            </button>
          </div>
        </div>
      </CardDiv>
    </Wrapper>
  );
};

export default Examples;
