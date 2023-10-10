
import './App.css';
import HomePage from './components/Home';
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
      <Route path="/users" component={Users} />
      
      
      </Switch>
      
    </div>
  );
}

export default App;
