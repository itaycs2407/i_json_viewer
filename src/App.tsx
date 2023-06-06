import React, { useEffect, useState } from "react";
import View from "./pages/View";
import Navbar from "./components/Navbar";
import styled from "@emotion/styled";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";
import Compare from "./pages/Compare";

function App() {
  const history = useHistory();
  const [viewJson, setViewJson] = useState("");
  const [firstCompare, setFirstCompare] = useState("");
  const [secondCompare, setSecondCompare] = useState("");
  const [path, setPath] = useState("/view");

  useEffect(() => {
    const pathname = history?.location?.pathname;

    if (pathname == null) return;

    setPath(pathname);
  }, [history?.location?.pathname]);

  return (
    <>
      <Router>
        <Navbar setPath={setPath} path={path} />
        <Switch>
          <Route
            path="/view/:objectId?"
            render={() => <View text={viewJson} setText={setViewJson} />}
          />
          <Route
            path="/compare"
            render={() => (
              <Compare
                firstContent={firstCompare}
                setFirstContent={setFirstCompare}
                secondContent={secondCompare}
                setSecondContent={setSecondCompare}
                setViewJson={setViewJson}
                setPath={setPath}
              />
            )}
          />
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
