import React, { useRef } from "react";
import { Button } from "@mui/material";
import { ActionContainer, Textarea, TextWrapper } from "../style";
import { pageColors, PageType } from "../constants";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";

interface GeneralTextProps {
  type: PageType;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setViewJson: React.Dispatch<React.SetStateAction<string>>;
  setPath: React.Dispatch<React.SetStateAction<string>>;
}

const GeneralText: React.FC<GeneralTextProps> = ({
  type,
  text,
  setText,
  setViewJson,
  setPath,
}) => {
  const history = useHistory();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const color = pageColors[type] ?? undefined;
  const handleClear = () => {
    setText("");
    textareaRef.current?.focus();
  };

  const handleUploadFile = (files: FileList | null) => {
    if (files == null || files.length === 0) {
      return;
    }

    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = function () {
      setText(fileReader.result as string);
    };

    fileReader.readAsText(file);
  };

  const handleView = () => {
    setViewJson(text);
    setPath("/view");
    history.push("/view");
  };

  return (
    <TextWrapper>
      <ActionContainer>
        <div>
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

          <MarginLeftButton
            variant="contained"
            onClick={handleView}
            color={color}
            size="small"
            disabled={text.length === 0}
          >
            View
          </MarginLeftButton>
        </div>
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
  min-height: 70%;
  max-height: 70%;
`;

const MarginLeftButton = styled(Button)`
  margin-left: 10px;
`;

export default GeneralText;
