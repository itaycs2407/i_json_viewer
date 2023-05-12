import styled from "@emotion/styled";
import React, { useState } from "react";
import JsonSection from "../components/JsonSection";
import TextSection from "../components/TextSection";

const testObj = {
  ke54y1: true,
  ke234y2: "value2",
  keysdafasdf3: "value3",
  keasdfy4: "value4",
  key5: ["value5", "value6", "value7"],
  key6: {
    key1: {
      ke54y1: true,
      ke234y2: "value2",
      keysdafasdf3: "value3",
      keasdfy4: "value4",
      key5: ["value5", "value6", "value7"],
      key6: {
        key1: "value1",
        key2: "value2",
      },
      key2: {
        key5: ["value5", "value6", "value7"],
        key6: {
          key1: "value1",
          key2: "value2",
        },
      },
    },
  },
};

const Home = () => {
  const [text, setText] = useState("");
  const [path, setPath] = useState<string | null>(null);
  let isJson = false;

  try {
    JSON.parse(text);
    isJson = true;
  } catch (err) {
    isJson = false;
  }

  return (
    <>
      <Container>
        <JsonSection object={isJson ? JSON.parse(text) : ""} gotoPath={path} />
        <TextSection setText={setText} text={text} setPath={setPath} />
      </Container>
      <Credit>Itay Cohen @ 2023</Credit>
    </>
  );
};

const Container = styled.div`
  height: 93vh;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  gap: 20px;
  flex-direction: row;
  align-items: center;
`;

const Credit = styled.h6`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
`;

export default Home;
