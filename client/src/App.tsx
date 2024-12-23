import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import BuildSwarm from "./pages/BuildSwarm";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { clusterApiUrl } from '@solana/web3.js';

function App() {
  // Initialize wallet adapter
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <div className="min-h-screen bg-background">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/build" component={BuildSwarm} />
          </Switch>
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;