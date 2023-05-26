import styled from "@emotion/styled";
import React, { useMemo, useState } from "react";
import JsonSection from "../components/JsonSection";
import TextSection from "../components/TextSection";

const testObj = {
  ke54y1: true,
  ke234y2: "value2",
  keysdafasdf3: "value3",
  keasdfy4: "value4",
  key5: ["value5", "value6", "value7"],
  key6: {
    key1: {
      ke54y1: true,
      ke234y2: "value2",
      keysdafasdf3: "value3",
      keasdfy4: "value4",
      key5: ["value5", "value6", "value7"],
      key6: {
        key1: "value1",
        key2: "value2",
      },
      key2: {
        key5: ["value5", "value6", "value7"],
        key6: {
          key1: "value1",
          key2: "value2",
        },
      },
    },
  },
};

const View = () => {
  const [text, setText] = useState("");
  const [path, setPath] = useState<string | null>(null);
  const [copyContent, setCopyContent] = useState<string[]>([]);

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