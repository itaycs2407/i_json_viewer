import React, { useState } from "react";
import styled from "@emotion/styled";
import GeneralText from "../components/GeneralText";
import { PageType } from "../constants";

const Compare = () => {
  const [firstContent, setFirstContent] = useState("");
  const [secondContent, setSecondContent] = useState("");

  return (
    <>
      <Container>
        <GeneralText
          type={PageType.Compare}
          setText={setFirstContent}
          text={firstContent}
        />
        <GeneralText
          type={PageType.Compare}
          setText={setSecondContent}
          text={secondContent}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 80vh;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  gap: 20px;
  flex-direction: row;
  align-items: center;
`;

export default Compare;
