import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

interface TextSectionProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextSection: React.FC<TextSectionProps> = ({ text, setText }) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const handleClear = () => {
    setText("");
    textareaRef.current?.focus();
  };
  return (
    <Wrapper>
      <Button variant="contained" onClick={handleClear}>
        Clear
      </Button>
      <Textarea
        autoFocus
        ref={textareaRef}
        placeholder="Type in here…"
        onChange={(event) => setText(event.target.value)}
        value={text}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
`;
export default TextSection;
