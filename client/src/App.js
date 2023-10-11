// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css'
import Home from "./Home";
import Artists from "./Artists";
import Museums from "./Museums";
import Reviews from "./Reviews";
import Users from "./Users";

function App() {
  return (
    <Router>

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/artists" component={Artists} />
        <Route path="/museums" component={Museums} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/users" component={Users} />
      </Switch>

    </Router>
  );
}

export default App;
