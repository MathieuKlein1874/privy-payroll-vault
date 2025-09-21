# Privy Payroll Vault

A cutting-edge payroll management system leveraging Fully Homomorphic Encryption (FHE) and blockchain technology. This platform ensures complete privacy while maintaining transparency through advanced cryptographic techniques.

## Key Features

- **Advanced Encryption**: Fully homomorphic encryption for processing sensitive payroll data
- **Blockchain Integration**: Immutable records on Ethereum Sepolia testnet
- **Multi-Wallet Support**: Seamless integration with popular Web3 wallets
- **Real-time Processing**: Live monitoring of encrypted payroll operations
- **Audit Capabilities**: Comprehensive audit trails with cryptographic proofs
- **Employee Management**: Secure onboarding with encrypted salary information

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Radix UI, Tailwind CSS, Shadcn/ui
- **Blockchain**: Ethereum Sepolia, Wagmi, RainbowKit
- **Encryption**: Zama FHEVM, Fully Homomorphic Encryption
- **State Management**: React Query, TanStack Query
- **Wallet Integration**: RainbowKit, WalletConnect

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Web3 wallet (Rainbow, MetaMask, etc.)
- Sepolia testnet ETH

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MathieuKlein1874/privy-payroll-vault.git
cd privy-payroll-vault
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp env.example .env
```

4. Set up environment variables:
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_endpoint
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_VERIFIER_ADDRESS=your_verifier_address
```

5. Start development server:
```bash
npm run dev
```

## Smart Contract Deployment

### Deploy to Sepolia

1. Install Hardhat dependencies:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @fhevm/solidity
```

2. Configure environment variables:
```env
PRIVATE_KEY=your_private_key
RPC_URL=your_rpc_url
VERIFIER_ADDRESS=your_verifier_address
```

3. Deploy the contract:
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

4. Update your environment variables with the deployed contract address

## Usage Guide

### Wallet Connection

1. Click "Connect Wallet" in the header
2. Select your preferred wallet
3. Approve the connection
4. Ensure you're on Sepolia testnet

### Payroll Management

1. Navigate to "Payroll Dashboard"
2. Create new payroll with encrypted data
3. Add employees with encrypted salary information
4. Process payments through smart contract
5. Monitor audit trails

### Security Features

- **Encrypted Computation**: All calculations performed on encrypted data
- **Zero-Knowledge Proofs**: Verify data without revealing sensitive information
- **Homomorphic Operations**: Secure mathematical operations on encrypted values
- **Privacy-Preserving Audits**: Audit without exposing private data
- **Multi-party Computation**: Secure collaboration protocols

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum chain ID | Yes |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint URL | Yes |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Deployed contract address | Yes |
| `NEXT_PUBLIC_VERIFIER_ADDRESS` | Verifier contract address | Yes |

### Network Configuration

The application is configured for Ethereum Sepolia testnet with FHEVM support. Ensure your wallet is connected to the correct network for proper functionality.

## Development

### Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── assets/             # Static assets

contracts/
├── PrivyPayrollVault.sol  # Main FHE contract
└── scripts/            # Deployment scripts
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npx hardhat compile` - Compile contracts
- `npx hardhat test` - Run contract tests
- `npx hardhat run scripts/deploy.ts` - Deploy contracts

## Security Considerations

- **Environment Variables**: Never commit sensitive keys to repository
- **Smart Contract Security**: Audit contracts before mainnet deployment
- **Frontend Security**: Validate all user inputs and implement proper error handling
- **Network Security**: Use HTTPS for all communications

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the FHEVM documentation

## Roadmap

- [ ] Multi-chain FHE support
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] HR system integration
- [ ] Automated compliance reporting
- [ ] Zero-knowledge payroll proofs