import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet, polygon, base, arbitrum } from 'wagmi/chains'

// Get projectId from environment
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

// Define the chains
const chains = [mainnet, polygon, base, arbitrum] as const

// Configure wagmi
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'NEXIS - Tokenized Stock Trading',
    description: 'Trade tokenized stocks with blockchain technology',
    url: 'https://nexis.replit.app',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
})

// Create modal
const modal = createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': 'hsl(168, 100%, 41%)',
    '--w3m-color-mix': 'hsl(222, 84%, 5%)',
    '--w3m-color-mix-strength': 20,
    '--w3m-border-radius-master': '12px'
  }
})

export { wagmiConfig, modal }