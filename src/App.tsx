import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import styled from "@emotion/styled";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Credit>Itay Cohen @ 2023</Credit>
    </>
  );
}

const Credit = styled.h6`
  position: absolute;
  background-color: #f5f5f5;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
`;

export default App;
