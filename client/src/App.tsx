import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import LaunchSwarm from "./pages/LaunchSwarm";
import { SolanaWalletProvider } from "./components/WalletProvider";

function App() {
  return (
    <SolanaWalletProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/launch" component={LaunchSwarm} />
      </Switch>
    </SolanaWalletProvider>
  );
}

export default App;