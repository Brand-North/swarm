import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import LaunchSwarm from "./pages/LaunchSwarm";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/launch" component={LaunchSwarm} />
    </Switch>
  );
}

export default App;