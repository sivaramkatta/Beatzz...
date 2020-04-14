import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./components/WelcomeLogin";
import Dashboard from "./components/Dashboard";
import Redirecting from "./components/Redirecting";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>
        <Route path="/redirecting">
          <Redirecting />
        </Route>
        <Sidebar>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Sidebar>
      </Switch>
    </Router>
  );
}

export default App;
