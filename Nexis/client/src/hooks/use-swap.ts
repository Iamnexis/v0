import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useToast } from '@/hooks/use-toast';

// Simple DEX contract ABI for swapping (this would be your actual DEX contract)
const SWAP_ABI = [
  {
    name: 'swapETHForTokens',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' }
    ],
    outputs: [{ name: 'amounts', type: 'uint256[]' }]
  },
  {
    name: 'swapTokensForETH',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' }
    ],
    outputs: [{ name: 'amounts', type: 'uint256[]' }]
  }
] as const;

// Mock DEX contract address (replace with actual contract)
const DEX_CONTRACT_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'; // Uniswap V2 Router

interface SwapParams {
  tokenAddress: string;
  amount: string;
  type: 'buy' | 'sell';
  symbol: string;
}

export function useSwap() {
  const [isSwapping, setIsSwapping] = useState(false);
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const executeSwap = async ({ tokenAddress, amount, type, symbol }: SwapParams) => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to execute trades",
        variant: "destructive"
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to trade",
        variant: "destructive"
      });
      return;
    }

    setIsSwapping(true);

    try {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
      const amountParsed = parseEther(amount);
      
      // WETH address (replace with actual WETH address for your network)
      const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`;
      
      if (type === 'buy') {
        // Buying tokens with ETH
        const path = [WETH_ADDRESS, tokenAddress as `0x${string}`] as const;
        
        await writeContract({
          address: DEX_CONTRACT_ADDRESS as `0x${string}`,
          abi: SWAP_ABI,
          functionName: 'swapETHForTokens',
          args: [
            BigInt(0), // amountOutMin (set to 0 for demo, should calculate slippage)
            path,
            address,
            BigInt(deadline)
          ],
          value: amountParsed
        });
        
        toast({
          title: "Swap Initiated",
          description: `Buying ${amount} ETH worth of ${symbol} tokens`,
        });
        
      } else {
        // Selling tokens for ETH
        const path = [tokenAddress as `0x${string}`, WETH_ADDRESS] as const;
        
        await writeContract({
          address: DEX_CONTRACT_ADDRESS as `0x${string}`,
          abi: SWAP_ABI,
          functionName: 'swapTokensForETH',
          args: [
            amountParsed,
            BigInt(0), // amountOutMin (set to 0 for demo)
            path,
            address,
            BigInt(deadline)
          ]
        });
        
        toast({
          title: "Swap Initiated",
          description: `Selling ${amount} ${symbol} tokens for ETH`,
        });
      }
      
    } catch (err: any) {
      console.error('Swap error:', err);
      toast({
        title: "Swap Failed",
        description: err.message || "Transaction failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSwapping(false);
    }
  };

  // Watch for transaction success
  if (isSuccess) {
    toast({
      title: "Swap Successful!",
      description: "Your trade has been executed successfully",
    });
  }

  if (error) {
    toast({
      title: "Transaction Error",
      description: error.message,
      variant: "destructive"
    });
  }

  return {
    executeSwap,
    isSwapping: isSwapping || isPending || isConfirming,
    txHash: hash,
    isSuccess,
    error
  };
}