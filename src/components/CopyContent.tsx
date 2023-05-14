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
      <StyledPre>{content}</StyledPre>
      <StyledButton variant="contained" onClick={handleCopy} size="small">
        Copy
      </StyledButton>
    </Container>
  );
};

const Container = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0 5px 15px 0;
`;

const StyledPre = styled.pre`
  align-self: flex-start;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  align-self: center;
`;
export default CopyContent;
