import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { findKeyPath } from "../utils";
import { get } from "lodash";
import axios from "axios";
import CopyContent from "./CopyContent";

interface TextSectionProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setPath: React.Dispatch<React.SetStateAction<string | null>>;
  copiedContent: string[];
  setCopyContent: React.Dispatch<React.SetStateAction<string[]>>;
}

const TextSection: React.FC<TextSectionProps> = ({
  text,
  setText,
  setPath,
  copiedContent,
  setCopyContent,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openContentModal, setOpenContentModal] = useState(false);

  const handleOpenModal = () => {
    setOpenContentModal(true);
  };

  const handleCloseModal = () => {
    setOpenContentModal(false);
  };

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
    setIsLoading(true);
    const response = await axios.get(url);
    const responseJson = response.data;

    setText(JSON.stringify(responseJson, null, 2));
    setIsLoading(false);
  };

  return (
    <Wrapper>
      <ActionContainer>
        <Button variant="contained" onClick={handleTextSelection}>
          Get Selected
        </Button>
        {copiedContent.length > 0 && (
          <CopyContentContainer>
            <Button variant="contained" onClick={handleOpenModal}>
              Content ({copiedContent.length})
            </Button>
            <Button variant="contained" onClick={() => setCopyContent([])}>
              X
            </Button>
          </CopyContentContainer>
        )}

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
            size="small"
          >
            {isLoading ? <CircularProgress color="inherit" /> : "Fetch"}
          </Button>
        </ButtonContainer>
      </FetchContainer>
      <Dialog
        open={openContentModal}
        keepMounted
        onClose={handleCloseModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Clipboard content</DialogTitle>
        <DialogContent>
          <ul>
            {copiedContent.map((content, index) => (
              <CopyContent key={index} content={content} />
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
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
  width: 85%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const CopyContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default TextSection;
