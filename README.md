# Swarm AI - Decentralized Multi-Agent Coordination Platform

A cutting-edge platform that harnesses Solana blockchain technology to create intelligent, synergistic agent networks. Swarm AI enables the deployment and coordination of autonomous AI agents that work together to achieve complex objectives.

![Swarm AI Platform](./assets/swarm-ai-banner.png)

## Features

### 1. Neural Swarm Deployment
- Step-by-step deployment wizard
- Phantom wallet integration
- Customizable AI CEO configuration
- Multiple agent type selection
- Real-time deployment status monitoring

### 2. Interactive Visualizations
- Agent Heat Map: Performance and activity metrics
- Network Topology: Agent relationship visualization
- Swarm Formation Simulator: Real-time agent coordination patterns
- Dynamic updating based on swarm state

### 3. AI Agent Types
- CEO Agent: Strategic oversight and coordination
- Token Deployer: Smart contract deployment
- Collection Deployer: NFT collection management
- NFT Minter: Automated NFT creation
- Trader: Market analysis and execution
- Lender: DeFi protocol interaction

### 4. Solana Blockchain Integration
- Phantom Wallet connectivity
- On-chain agent coordination
- Transaction monitoring
- Smart contract deployment

## Technology Stack

- **Frontend:**
  - React 18 with TypeScript
  - Vite for build tooling
  - TailwindCSS + shadcn/ui for styling
  - Framer Motion for animations
  - React Query for state management
  - Recharts for data visualization
  - React Force Graph for network visualization

- **Backend:**
  - Express.js server
  - WebSocket support for real-time updates
  - Drizzle ORM with PostgreSQL
  - Zod for validation

- **Blockchain:**
  - Solana Web3.js
  - Wallet Adapter
  - SPL Token integration

## Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── agents/    # Agent-specific components
│   │   │   ├── presets/   # Preset configurations
│   │   │   ├── sections/  # Page sections
│   │   │   ├── ui/        # UI components (shadcn)
│   │   │   ├── visualizations/  # Data visualization components
│   │   │   └── wizard/    # Deployment wizard
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Route pages
│   │   └── types/        # TypeScript definitions
├── db/                    # Database configuration
│   ├── migrations/       # Database migrations
│   └── schema.ts         # Database schema
├── server/               # Backend server
│   ├── routes.ts         # API routes
│   └── vite.ts          # Vite configuration
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Phantom Wallet browser extension
- Solana devnet account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/swarm-ai.git
cd swarm-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Required environment variables:
- `VITE_SOLANA_RPC_URL`: Solana RPC endpoint
- `VITE_SOLANA_NETWORK`: Solana network (devnet/mainnet)
- `DATABASE_URL`: PostgreSQL connection string
- `VITE_OPENAI_API_KEY`: OpenAI API key for agent intelligence

4. Start the development server:
```bash
npm run dev
```

## Development Guidelines

### Adding New Features

1. **Agent Development:**
   - Add new agent types in `client/src/types/agents.ts`
   - Create agent-specific components in `client/src/components/agents/`
   - Update deployment wizard in `client/src/components/wizard/`

2. **Visualization Components:**
   - Place new visualizations in `client/src/components/visualizations/`
   - Use Recharts or React Force Graph for data representation
   - Implement real-time updates using WebSocket

3. **Smart Contracts:**
   - Deploy contracts using Solana Web3.js
   - Add contract interactions in agent-specific components
   - Test thoroughly on devnet before mainnet deployment

### Code Style

- Follow TypeScript best practices
- Use shadcn/ui components for consistent styling
- Implement responsive design using Tailwind CSS
- Add proper error handling and loading states
- Include TypeScript types for all components

## Deployment

The application is designed to be deployed on Replit:

1. Fork the repository on Replit
2. Set up the required environment variables
3. Run `npm run build` to create production build
4. Deploy using Replit's hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributors

- [Your Name] - Initial work

## Acknowledgments

- Solana Foundation for blockchain infrastructure
- OpenAI for agent intelligence capabilities
- Replit for development and hosting platform
