import React from "react";
import styled from "@emotion/styled";

const EmptySection = () => {
  return (
    <Container>How much time does it take to do copy-paste ?!?!?!</Container>
  );
};

const Container = styled.div`
  height: 93vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export default EmptySection;
