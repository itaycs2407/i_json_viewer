import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { findKeyPath } from "../utils";
import { get } from "lodash";

interface TextSectionProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setPath: React.Dispatch<React.SetStateAction<string | null>>;
}

const TextSection: React.FC<TextSectionProps> = ({
  text,
  setText,
  setPath,
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const handleClear = () => {
    setText("");
    setPath(null);
    textareaRef.current?.focus();
  };

  const handleTextSelection = () => {
    const selection = textareaRef.current?.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
    );

    if (selection == null) {
      return;
    }

    const object = JSON.parse(text);
    const keyPath = findKeyPath(object, selection);

    if (Array.isArray(keyPath)) {
      if (typeof get(object, keyPath.join(".")) === "object") {
        setPath(keyPath.join("."));
        return;
      }
      return;
    }

    setPath(null);
  };

  return (
    <Wrapper>
      <Button variant="contained" onClick={handleClear}>
        Clear
      </Button>
      <Button variant="contained" onClick={handleTextSelection}>
        Get Selected
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
