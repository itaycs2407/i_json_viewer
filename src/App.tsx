import React from "react";
import View from "./pages/View";
import Navbar from "./components/Navbar";
import styled from "@emotion/styled";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Compare from "./pages/Compare";
import Schema from "./pages/Schema";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/view" component={View} />
          <Route exact path="/compare" component={Compare} />
          <Route exact path="/schema" component={Schema} />
          <Redirect from="/" to="/view" />
        </Switch>
      </Router>
      <Credit>Itay Cohen @ 2023</Credit>
    </>
  );
}

const Credit = styled.h6`
  position: absolute;
  background-color: #f5f5f5;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
`;

export default App;
