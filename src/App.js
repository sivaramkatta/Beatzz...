import React from "react";
import Welcome from "./components/WelcomeLogin";
import Dashboard from "./components/Dashboard";
import Redirecting from "./components/Redirecting";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Welcome />
      </Route>
      <Route path="/redirecting">
        <Redirecting />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Router>
  );
}

export default App;
