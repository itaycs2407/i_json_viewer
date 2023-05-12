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
  let isJson = false;
  try {
    JSON.parse(text);
    console.log(JSON.parse(text));
    isJson = true;
  } catch (err) {
    isJson = false;
  }

  return (
    <Container>
      <JsonSection object={isJson ? JSON.parse(text) : ""} />
      <TextSection setText={setText} text={text} />
    </Container>
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

export default Home;
