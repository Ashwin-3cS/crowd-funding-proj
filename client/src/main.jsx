import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import merge from 'lodash/merge';

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  midnightTheme,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { StateContextProvider } from './context';

// Custom Sepolia Testnet configuration
const Sepolia = {
  id: 11155111,
  name: 'Sepolia Testnet',
  network: 'sepolia',
  nativeCurrency: {
    name: 'SepoliaETH',
    symbol: 'SepoliaETH',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://sepolia.infura.io/v3/4066181504164da3a9bd66e624cf82ac',
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [Sepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === Sepolia.id) {
          return { http: Sepolia.rpcUrls.default };
        }
        return null;
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'CrowdFundingDapp',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const myTheme = merge(midnightTheme(), {
  colors: {
    accentColor: '#18181b',
    accentColorForeground: '#fff',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <WagmiConfig client={wagmiClient}>
    <Router>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        <StateContextProvider>
            <App />
        </StateContextProvider>
      </RainbowKitProvider>
    </Router>
  </WagmiConfig>
);
