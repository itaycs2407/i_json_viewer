import React, { useMemo } from "react";
import styled from "@emotion/styled";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import ReactJson, { ThemeKeys } from "react-json-view";
import { getMaxDepth } from "../utils";
import { THEME } from "../constants";

interface JsonSectionProps {
  object: any;
}
const JsonSection: React.FC<JsonSectionProps> = ({ object }) => {
  const [key, setKey] = React.useState("");
  const [theme, setTheme] = React.useState("apathy");
  const [collapsedLevel, setCollapsedLevel] = React.useState(1);
  const [data, setData] = React.useState(object);
  const [whereAmI, setWhereAmI] = React.useState("root");

  const objectMaxDepth = useMemo(() => {
    return getMaxDepth(object);
  }, [object]);

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const level = Number(event.target.value);
    if (level > objectMaxDepth || level < 1) {
      return;
    }
    setCollapsedLevel(Number(event.target.value));
  };

  const handleKeyChange = (event: SelectChangeEvent<string>) => {
    const key = event.target.value;

    if (key === "root") {
      setData(object);
      setWhereAmI("root");
      return;
    }

    setWhereAmI((prev) => `${prev} > ${key}`);
    setKey(key);
    setData(data[key]);
  };

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
            onChange={(event) => setTheme(event.target.value)}
          >
            {THEME.map((name) => (
              <MenuItem value={name}>{name}</MenuItem>
            ))}
          </Select>
        </StyledFormControl>

        <StyledFormControl>
          <InputLabel id="goto-select">Go to key</InputLabel>

          <Select
            labelId="goto-select"
            id="goto-select"
            value={key}
            label="Go to key"
            onChange={(event) => handleKeyChange(event)}
          >
            <MenuItem value="root">Back to root</MenuItem>
            {Object.keys(data).map((key) => (
              <MenuItem value={key}>{key}</MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <TextField
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={collapsedLevel}
          onChange={handleLevelChange}
        />
      </ActionsJsonContainer>
      <div>{whereAmI} </div>
      <JsonContainer>
        <ReactJson
          src={data}
          collapsed={collapsedLevel}
          theme={theme as ThemeKeys}
          indentWidth={10}
          name={null}
        />
      </JsonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ActionsJsonContainer = styled.div`
  width: 50%;
  display: flex;
  gap: 20px;
`;

const StyledFormControl = styled(FormControl)`
  width: 30%;
`;

const JsonContainer = styled.div`
  margin-top: 30px;
  width: 50%;
  overflow-y: scroll;
  border: 1px solid black;
  height: 70%;
`;

export default JsonSection;
