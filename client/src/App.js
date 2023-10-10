
import './App.css';
import Home from './components/Home';
import Artists from './components/Artists';
import Museums from './components/Museums';
import Reviews from './components/Reviews';
import User from './components/User';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/artists" component={Artists} />
      <Route path="/museums" component={Museums} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/users" component={User} />
      
      
      </Switch>
     
    </div>
    </Router>
  );
}

export default App;
