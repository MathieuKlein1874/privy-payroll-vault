# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the Privy Payroll Vault application to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository access
- Environment variables ready

## Step-by-Step Deployment

### Step 1: Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard

### Step 2: Import GitHub Repository

1. In the "Import Git Repository" section:
   - Search for "MathieuKlein1874/privy-payroll-vault"
   - Click "Import" next to the repository
2. Vercel will automatically detect it's a Vite project

### Step 3: Configure Project Settings

1. **Project Name**: `privy-payroll-vault`
2. **Framework Preset**: Vite (should be auto-detected)
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `dist` (default for Vite)
6. **Install Command**: `npm install` (default)

### Step 4: Configure Environment Variables

Click "Environment Variables" and add the following:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_endpoint
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_VERIFIER_ADDRESS=your_verifier_address
```

**Important**: Replace placeholder values with actual values after deploying the smart contract.

### Step 5: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Vercel will provide a deployment URL like `https://privy-payroll-vault-xxx.vercel.app`

### Step 6: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### Step 7: Smart Contract Deployment

Before the application can be fully functional, deploy the smart contract:

1. **Install Hardhat dependencies**:
   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @fhevm/solidity
   ```

2. **Set up environment variables** (locally):
   ```env
   PRIVATE_KEY=your_private_key
   RPC_URL=your_rpc_url
   VERIFIER_ADDRESS=your_verifier_address
   ```

3. **Deploy the contract**:
   ```bash
   npx hardhat run scripts/deploy.ts --network sepolia
   ```

4. **Update Vercel environment variables** with the deployed contract address

### Step 8: Verify Deployment

1. Visit your Vercel deployment URL
2. Connect a wallet (ensure you're on Sepolia testnet)
3. Test the basic functionality:
   - Wallet connection
   - Contract interaction
   - UI responsiveness

## Environment Variables Reference

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum chain ID | `11155111` |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint URL | `https://sepolia.infura.io/v3/...` |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | `your_project_id` |
| `NEXT_PUBLIC_INFURA_API_KEY` | Infura API key | `your_api_key` |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Deployed contract address | `0x...` |
| `NEXT_PUBLIC_VERIFIER_ADDRESS` | Verifier contract address | `0x...` |

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation passes
   - Verify all imports are correct

2. **Environment Variables Not Working**:
   - Ensure variables start with `NEXT_PUBLIC_` for client-side access
   - Redeploy after adding new environment variables
   - Check variable names match exactly

3. **Wallet Connection Issues**:
   - Verify WalletConnect project ID is correct
   - Ensure RPC URL is accessible
   - Check network configuration

4. **Contract Interaction Failures**:
   - Verify contract address is correct
   - Ensure contract is deployed on the correct network
   - Check that user has sufficient testnet ETH

### Performance Optimization

1. **Enable Vercel Analytics**:
   - Go to Project Settings → Analytics
   - Enable Web Analytics for performance monitoring

2. **Configure Caching**:
   - Add `vercel.json` for custom caching rules
   - Optimize static asset delivery

3. **Monitor Build Times**:
   - Use Vercel's build logs to identify bottlenecks
   - Consider upgrading to Pro plan for faster builds

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive keys to the repository
   - Use Vercel's environment variable encryption
   - Rotate keys regularly

2. **Smart Contract Security**:
   - Audit the FHE contract before mainnet deployment
   - Use multi-signature wallets for contract upgrades
   - Implement proper access controls

3. **Frontend Security**:
   - Validate all user inputs
   - Implement proper error handling
   - Use HTTPS for all communications

## Monitoring and Maintenance

1. **Set up monitoring**:
   - Configure Vercel Analytics
   - Set up error tracking
   - Monitor contract events

2. **Regular updates**:
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Update smart contracts as needed

3. **Backup strategy**:
   - Regular database backups (if applicable)
   - Smart contract state backups
   - Configuration backups

## Support

For deployment issues:
- Check Vercel documentation
- Review build logs
- Consult the project README
- Contact the development team

For smart contract issues:
- Review Hardhat documentation
- Check FHEVM documentation
- Verify network connectivity
- Test on local network first