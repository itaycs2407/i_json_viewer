import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import JsonSection from "../components/JsonSection";
import TextSection from "../components/TextSection";
import { useParams } from "react-router-dom";

interface ViewProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const View: React.FC<ViewProps> = ({ text, setText }) => {
  const [path, setPath] = useState<string | null>(null);
  const [copyContent, setCopyContent] = useState<string[]>([]);

  const { objectId } = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    if (objectId == null) return;
    const objectData = localStorage.getItem(objectId);
    if (objectData == null) return;
    setText(objectData);
  }, [objectId]);

  const addCopyContent = (content: string) => {
    setCopyContent((prev) => [...prev, content]);
  };

  const isJson = useMemo(() => {
    try {
      JSON.parse(text);
      return true;
    } catch (err) {
      return false;
    }
  }, [text]);

  return (
    <>
      <Container>
        <JsonSection
          object={isJson ? { ...JSON.parse(text) } : ""}
          gotoPath={path}
          addCopyContent={addCopyContent}
        />
        <TextSection
          setText={setText}
          text={text}
          setPath={setPath}
          copiedContent={copyContent}
          setCopyContent={setCopyContent}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 90vh;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  gap: 20px;
  flex-direction: row;
  align-items: center;
`;

export default View;
