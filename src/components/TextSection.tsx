import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { Button, Input, TextField } from "@mui/material";
import { findKeyPath } from "../utils";
import { get } from "lodash";
import axios from "axios";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [url, setUrl] = useState("");

  const handleClear = () => {
    setText("");
    setPath(null);
    setUrl("");
    textareaRef.current?.focus();
  };

  const handleTextSelection = () => {
    const selection = textareaRef.current?.value.substring(
      textareaRef.current?.selectionStart,
      textareaRef.current?.selectionEnd
    );

    if (selection == null || selection.length === 0) {
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

  const handleFetch = async () => {
    const response = await axios.get(url);
    const responseJson = response.data;

    setText(JSON.stringify(responseJson, null, 2));
  };

  return (
    <Wrapper>
      <ActionContainer>
        <Button variant="contained" onClick={handleTextSelection}>
          Get Selected
        </Button>

        <Button variant="contained" onClick={handleClear}>
          Clear
        </Button>
      </ActionContainer>

      <Textarea
        autoFocus
        ref={textareaRef}
        placeholder="Type in here…"
        onChange={(event) => setText(event.target.value)}
        value={text}
      />
      <FetchContainer>
        <StyledTextField
          id="outlined-basic"
          label="Url"
          variant="outlined"
          value={url}
          onChange={(event) => setUrl((event.target.value as string).trim())}
          size="small"
          placeholder="Enter url to fetch from..."
        />
        <ButtonContainer>
          <Button
            variant="contained"
            onClick={handleFetch}
            disabled={url.length === 0}
            color="secondary"
          >
            Fetch
          </Button>
          <Button variant="contained" color="secondary">
            Set cookie
          </Button>
        </ButtonContainer>
      </FetchContainer>
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

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
`;

const FetchContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTextField = styled(TextField)`
  width: 60%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
export default TextSection;
