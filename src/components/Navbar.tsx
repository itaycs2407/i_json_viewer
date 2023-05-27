import React, { useState } from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const [path, setPath] = useState(history.location.pathname);

  const handlePageChange = (path: string) => {
    history.push(path);
    setPath(path);
  };

  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => handlePageChange("/view")}
        size="small"
        disabled={path === "/view"}
      >
        View
      </Button>
      <Button
        variant="contained"
        onClick={() => handlePageChange("/compare")}
        size="small"
        color="success"
        disabled={path === "/compare"}
      >
        Compare
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  background-color: #f5f5f5;
  padding: 5px 0 5px;
`;

export default Navbar;
