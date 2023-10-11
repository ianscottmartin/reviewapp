// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Artists from "./components/Artists";
import Museums from "./components/Museums";
import Reviews from "./components/Reviews";
import Users from "./components/Users";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/artists" component={Artists} />
          <Route path="/museums" component={Museums} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/users" component={Users} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
