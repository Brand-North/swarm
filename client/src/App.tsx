import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import LaunchSwarm from "./pages/LaunchSwarm";
import SimulationPlayground from "./pages/SimulationPlayground";
import SolanaWalletProvider from "./components/WalletProvider";

function App() {
  return (
    <SolanaWalletProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/launch" component={LaunchSwarm} />
        <Route path="/playground" component={SimulationPlayground} />
      </Switch>
    </SolanaWalletProvider>
  );
}

export default App;