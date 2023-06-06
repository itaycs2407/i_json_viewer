import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import ReactJson, { ThemeKeys } from "react-json-view";
import { getMaxDepth } from "../utils";
import { APP_KEY_THEME, THEME } from "../constants";
import WhereAmI from "./WhereAmI";
import { get } from "lodash";
import EmptySection from "./EmptySection";
import { v4 as uuidv4 } from "uuid";

interface JsonSectionProps {
  object: any;
  gotoPath: string | null;
  addCopyContent: (content: string) => void;
}
const JsonSection: React.FC<JsonSectionProps> = ({
  object,
  gotoPath,
  addCopyContent,
}) => {
  const [key, setKey] = useState("");
  const [jsonKey, setJsonKey] = useState("");
  const [theme, setTheme] = useState("");
  const [collapsedLevel, setCollapsedLevel] = React.useState(1);
  const [data, setData] = useState(object);
  const [path, setPath] = useState(["root"]);

  useEffect(() => {
    const storedTheme = localStorage.getItem(APP_KEY_THEME);

    if (storedTheme != null) {
      setTheme(storedTheme);
    }
  });

  useEffect(() => {
    window.addEventListener("copy", handleCopy);

    return () => {
      window.removeEventListener("copy", handleCopy);
    };
  }, []);

  useEffect(() => {
    if (gotoPath == null) {
      setData(object);
      setPath(["root"]);
    } else {
      const newRoot = gotoPath.split(".");
      const newObject = get(object, newRoot.join("."));
      if (newObject != null) {
        setData(newObject);
        setPath(["root", ...newRoot]);
      }
    }
  }, [object, gotoPath]);

  const isValidJson = useMemo(() => {
    return data !== "";
  }, [data]);

  const objectMaxDepth = useMemo(() => {
    return getMaxDepth(data);
  }, [data]);

  const keys = useMemo(() => {
    return Object.keys(data)
      .filter((key) => typeof data[key] === "object")
      .filter((key) => data[key] != null);
  }, [data]);

  const jsonKeys = useMemo(() => {
    setJsonKey("");
    return Object.keys(data)

      .filter((key) => typeof data[key] !== "object")
      .filter((key) => data[key] != null);
  }, [data]);

  const isBackToRootDisabled = useMemo(() => {
    return path.length === 1;
  }, [path]);

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const level = Number(event.target.value);
    if (level > objectMaxDepth || level < 1) {
      return;
    }
    setCollapsedLevel(Number(event.target.value));
  };

  const handleCopy = async () => {
    const content = await navigator.clipboard.readText();
    addCopyContent(content);
  };

  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    const newTheme = event.target.value;
    localStorage.setItem(APP_KEY_THEME, newTheme ?? "apathy");

    setTheme(newTheme);
  };

  const handleKeyChange = (event: SelectChangeEvent<string>) => {
    const key = event.target.value;

    if (key === "root") {
      setCollapsedLevel(1);
      setData(object);
      setPath(["root"]);
      return;
    }

    if (typeof data[key] !== "object") {
      return;
    }

    setCollapsedLevel(1);
    setKey(key);
    setData(data[key]);
    setPath((prev) => [...prev, key]);
  };

  const handleJsonKeyChange = (event: SelectChangeEvent<string>) => {
    const key = event.target.value;

    if (typeof data[key] === "object") {
      return;
    }

    setJsonKey(key);
  };

  const handleJsonKeySelect = () => {
    if (jsonKey === "") {
      return;
    }
    const objectId = uuidv4();

    localStorage.setItem(objectId, data[jsonKey]);
    window.open(`/view/${objectId}`, "_blank");
  };

  const pathPaginationBack = () => {
    if (path.length === 2) {
      setData(object);
      setPath(["root"]);
      return;
    }

    const newPath = path.slice(1, path.length - 1);

    setData(get(object, newPath.join(".")));
    setPath(["root", ...newPath]);
  };

  console.log(jsonKey);
  return (
    <Wrapper>
      <ActionsJsonContainer>
        <StyledFormControl>
          <InputLabel id="theme-select">Theme</InputLabel>
          <Select
            labelId="theme-select"
            id="theme-select"
            value={theme}
            label="Theme"
            onChange={handleThemeChange}
            size="small"
          >
            {THEME.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>

        <Button
          variant="contained"
          size="small"
          onClick={pathPaginationBack}
          disabled={path.length <= 1}
        >
          {"<"}
        </Button>
        <StyledFormControl>
          <InputLabel id="goto-select">Go to key</InputLabel>
          <Select
            labelId="goto-select"
            id="goto-select"
            value={key}
            label="Go to key"
            onChange={(event) => handleKeyChange(event)}
            size="small"
          >
            <MenuItem value="root" disabled={isBackToRootDisabled}>
              Back to root
            </MenuItem>
            {keys.map((key, index) => (
              <MenuItem key={index} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <StyledNumberInputWrapper>
          <TextField
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            value={collapsedLevel}
            onChange={handleLevelChange}
            size="small"
          />
        </StyledNumberInputWrapper>
      </ActionsJsonContainer>
      <WhereAmI
        object={object}
        setData={setData}
        path={path}
        setPath={setPath}
        isValidJson={isValidJson}
      />
      {isValidJson ? (
        <JsonContainer>
          <ReactJson
            src={data}
            collapsed={collapsedLevel}
            theme={theme as ThemeKeys}
            indentWidth={10}
            name={null}
          />
        </JsonContainer>
      ) : (
        <EmptySection text="How much time does it take to do copy-paste ?!?!?!" />
      )}
      <ValueKeysContainer>
        <StyledFormControl>
          <InputLabel id="value-keys-select">Value keys</InputLabel>
          <Select
            labelId="value-keys-select"
            id="value-keys-select"
            value={jsonKey}
            label="Value keys"
            onChange={(event) => handleJsonKeyChange(event)}
            size="small"
          >
            {jsonKeys.map((key, index) => (
              <MenuItem key={index} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <Button
          variant="contained"
          size="small"
          disabled={jsonKey === ""}
          onClick={handleJsonKeySelect}
        >
          Open
        </Button>
      </ValueKeysContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const ActionsJsonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const StyledFormControl = styled(FormControl)`
  width: 35%;
`;

const StyledNumberInputWrapper = styled(FormControl)`
  width: 10%;
`;

const JsonContainer = styled.div`
  margin-top: 30px;
  overflow-y: scroll;
  border: 1px solid black;
  min-height: 74%;
  max-height: 74%;
  height: 74%;
`;

const ValueKeysContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
  position: absolute;
  bottom: 0;
`;

export default JsonSection;
