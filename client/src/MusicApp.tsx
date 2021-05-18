import React from "react";
import "./MusicApp.module.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserHome from "./pages/UserHome";
import Support from "./pages/Support";
function MusicApp() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            This is the Landing Page
          </Route>
          <Route exact path="/user_home">
            <UserHome />
          </Route>
          <Route exact path="/support">
            <Support />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default MusicApp;