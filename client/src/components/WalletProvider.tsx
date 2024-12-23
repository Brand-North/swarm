import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

interface Props {
  children: ReactNode;
}

const SOLANA_NETWORK = "devnet";
const SOLANA_RPC_ENDPOINT = clusterApiUrl(SOLANA_NETWORK);

export const SolanaWalletProvider: FC<Props> = ({ children }) => {
  // Initialize wallet adapters
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter()
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={SOLANA_RPC_ENDPOINT}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};