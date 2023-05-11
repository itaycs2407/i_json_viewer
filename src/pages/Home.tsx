import styled from "@emotion/styled";
import React from "react";
import JsonSection from "../components/JsonSection";

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
      key2: "value2",
    },
  },
};
const Home = () => {
  return (
    <Container>
      <h1> my Json viewer</h1>
      <JsonSection object={testObj} />
    </Container>
  );
};

const Container = styled.div`
  height: 93vh;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Home;
