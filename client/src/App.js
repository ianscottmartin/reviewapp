
import './App.css';
import Home from './components/Home';
import Artists from './components/Artists';
import Museums from './components/Museums';
import Reviews from './components/Reviews';
import Users from './components/User';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/artists" components={Artists} />
      <Route path="/museums" components={Museums} />
      <Route path="/reviews" components={Reviews} />
      <Route path="/users" components={Users} />
      
      
      </Switch>
     
    </div>
    </Router>
  );
}

export default App;
