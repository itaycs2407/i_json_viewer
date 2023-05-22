import React from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

const Navbar = () => {
  return (
    <Container>
      <Button variant="contained" onClick={() => {}} size="small">
        View
      </Button>
      <Button
        variant="contained"
        onClick={() => {}}
        size="small"
        color="success"
      >
        Compare
      </Button>
      <Button
        variant="contained"
        onClick={() => {}}
        size="small"
        color="secondary"
      >
        Validate Schema
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
