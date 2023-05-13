import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

interface CopyContentProps {
  content: string;
}

const CopyContent: React.FC<CopyContentProps> = ({ content }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <Container>
      <pre>{content}</pre>
      <Button variant="contained" onClick={handleCopy} size="small">
        Copy
      </Button>
    </Container>
  );
};

const Container = styled.li`
  margin-bottom: 10px;
`;
export default CopyContent;
