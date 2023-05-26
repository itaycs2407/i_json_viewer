import React, { useState } from "react";
import styled from "@emotion/styled";
import GeneralText from "../components/GeneralText";
import ReactDiffViewer from "react-diff-viewer";
import { PageType } from "../constants";

const Compare = () => {
  const [firstContent, setFirstContent] = useState("");
  const [secondContent, setSecondContent] = useState("");

  return (
    <Container>
      <TextContainer>
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
      </TextContainer>
      {firstContent.length === 0 || secondContent.length === 0 ? (
        <div> Nothing to display.... yet</div>
      ) : (
        <DiffContainer>
          <ReactDiffViewer
            oldValue={firstContent}
            newValue={secondContent}
            splitView={true}
            showDiffOnly={false}
            disableWordDiff={false}
          />
        </DiffContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 92vh;
  background-color: #f5f5f5;
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  height: 50%;
  width: 100%;
  gap: 20px;
  padding: 0 20px 0 20px;
  flex-direction: row;
  justify-content: center;
`;

const DiffContainer = styled.div`
  height: 50%;
  width: 100%;
  border: #61dafb 1px solid;
  overflow-y: scroll;
`;
export default Compare;
