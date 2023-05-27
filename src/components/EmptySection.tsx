import React from "react";
import styled from "@emotion/styled";

interface EmptySectionProps {
  text: string;
}

const EmptySection: React.FC<EmptySectionProps> = ({ text }) => {
  return <Container>{text}</Container>;
};

const Container = styled.div`
  height: 50vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export default EmptySection;
