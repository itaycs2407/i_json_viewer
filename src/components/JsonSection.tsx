import React, { useMemo } from "react";
import styled from "@emotion/styled";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import ReactJson from "react-json-view";
import { getMaxDepth } from "../utils";

const themesName = [
  "dark",
  "light",
  "blue",
  "red",
  "green",
  "purple",
  "orange",
  "yellow",
  "pink",
  "brown",
  "grey",
  "cyan",
  "teal",
  "lime",
  "amber",
  "indigo",
  "blueGrey",
  "deepOrange",
  "deepPurple",
  "lightBlue",
];

interface JsonSectionProps {
  object: any;
}
const JsonSection: React.FC<JsonSectionProps> = ({ object }) => {
  const [key, setKey] = React.useState("");
  const [theme, setTheme] = React.useState("");
  const [collapsedLevel, setCollapsedLevel] = React.useState(1);

  const objectKeys = useMemo(() => Object.keys(object), [object]);
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
            {themesName.map((name) => (
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
            onChange={(event) => setKey(event.target.value)}
          >
            {objectKeys.map((key) => (
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
      <JsonContainer>
        <ReactJson src={object} collapsed={collapsedLevel} />
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
