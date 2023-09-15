import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

// use bootstrap breadcrumb link in discord*****
// DON NOT write fetch calls, use the functions from the API file in utils

function App() {
  return (
    <div className="app-routes">
      <Switch>
        <Route path="/">
          <Layout />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
