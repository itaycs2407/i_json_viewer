import React from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

const Navbar = () => (
  <Container>
    <Button
      variant="contained"
      onClick={() => (window.location.href = "/view")}
      size="small"
      disabled={window.location.pathname === "/view"}
    >
      View
    </Button>
    <Button
      variant="contained"
      onClick={() => (window.location.href = "/compare")}
      size="small"
      color="success"
      disabled={window.location.pathname === "/compare"}
    >
      Compare
    </Button>
    <Button
      variant="contained"
      onClick={() => (window.location.href = "/schema")}
      size="small"
      color="secondary"
      disabled={window.location.pathname === "/schema"}
    >
      Validate Schema
    </Button>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  background-color: #f5f5f5;
  padding: 5px 0 5px;
`;

export default Navbar;
