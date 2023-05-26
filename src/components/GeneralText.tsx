import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import { ActionContainer, Textarea, TextWrapper } from "../style";
import { pageColors, PageType } from "../constants";
import styled from "@emotion/styled";

interface GeneralTextProps {
  type: PageType;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}
const GeneralText: React.FC<GeneralTextProps> = ({ type, text, setText }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const color = pageColors[type] ?? undefined;
  const handleClear = () => {
    setText("");
    textareaRef.current?.focus();
  };
  const handleUploadFile = (files: any) => {
    const file = files[0];
    const a = new FileReader();
    a.onloadend = function (event) {
      const b = a.result;
      setText(b as string);
      console.log(b);
    };
    a.readAsText(file);
  };
  return (
    <TextWrapper>
      <ActionContainer>
        <Button
          variant="contained"
          component="label"
          color={color}
          size="small"
        >
          Upload File
          <input
            type="file"
            hidden
            accept=".json"
            onChange={(event) => handleUploadFile(event.target.files)}
          />
        </Button>

        <Button
          variant="contained"
          onClick={handleClear}
          color={color}
          size="small"
          disabled={text.length === 0}
        >
          Clear
        </Button>
      </ActionContainer>

      <StyledTextarea
        autoFocus
        ref={textareaRef}
        placeholder="Type in here…"
        onChange={(event) => setText(event.target.value)}
        value={text}
      />
    </TextWrapper>
  );
};

const StyledTextarea = styled(Textarea)`
  height: 40%;
`;
export default GeneralText;
