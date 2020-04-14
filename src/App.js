import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./components/WelcomeLogin";
import Dashboard from "./components/Dashboard";
import Redirecting from "./components/Redirecting";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import Search from "./components/Search";
import Categories from "./components/Categories";
import CategoryPlaylists from "./components/Category";
import Playlist from "./components/Playlist";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/redirecting" component={Redirecting} />
        <Sidebar>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/search" component={Search} />
          <Route path="/profile" component={Profile} />
          <Route path="/categories" component={Categories} />
          <Route path="/category/:slug" component={CategoryPlaylists} />
          <Route path="/playlist/:slug" component={Playlist} />
        </Sidebar>
      </Switch>
    </Router>
  );
}

export default App;
