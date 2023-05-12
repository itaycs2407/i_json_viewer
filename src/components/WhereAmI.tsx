import React from "react";
import { TrendingFlat } from "@mui/icons-material";
import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { get } from "lodash";

interface WhereAmIProps {
  object: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  path: string[];
  setPath: React.Dispatch<React.SetStateAction<string[]>>;
}

const WhereAmI: React.FC<WhereAmIProps> = ({
  object,
  setData,
  path,
  setPath,
}) => {
  const handleChipClick = (index: number) => () => {
    if (index === 0) {
      setData(object);
      setPath(["root"]);
      return;
    }
    const newRoot = path.slice(1, index + 1).join(".");
    const newObject = get(object, newRoot);
    if (newObject != null) {
      setData(newObject);
      setPath(["root", ...newRoot.split(".")]);
    }
  };

  return (
    <Container>
      {path.map((item, index) => {
        return (
          <>
            {index !== 0 && <TrendingFlat />}
            <StyledChip
              key={index}
              color="secondary"
              label={item}
              size="small"
              onClick={handleChipClick(index)}
            />
          </>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
`;

const StyledChip = styled(Chip)`
  cursor: pointer;
`;

export default WhereAmI;
