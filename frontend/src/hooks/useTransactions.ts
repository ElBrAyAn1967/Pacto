'use client';

import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { TRANSACTION_REGISTRY_ABI, CONTRACT_ADDRESSES } from '@/lib/contracts';
import { avalancheFuji } from 'wagmi/chains';

export interface Transaction {
  txHash: string;
  pyme: string;
  counterparty: string;
  amount: bigint;
  currency: string;
  description: string;
  validatedByPyme: boolean;
  validatedByCounterparty: boolean;
  timestamp: bigint;
  exists: boolean;
}

export function useTransactions() {
  const { address } = useAccount();
  const chainId = avalancheFuji.id;
  const contractAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.TRANSACTION_REGISTRY;

  // Get user's transactions
  const { data: transactionHashes, isLoading: isLoadingHashes } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: TRANSACTION_REGISTRY_ABI,
    functionName: 'getPymeTransactions',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && contractAddress !== "0x0000000000000000000000000000000000000000",
    }
  });

  // Get total transactions count
  const { data: totalTransactions } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: TRANSACTION_REGISTRY_ABI,
    functionName: 'totalTransactions',
    query: {
      enabled: contractAddress !== "0x0000000000000000000000000000000000000000",
    }
  });

  // Register transaction
  const { writeContract: registerTransaction, isPending: isRegistering } = useWriteContract();

  // Validate transaction
  const { writeContract: validateTransaction, isPending: isValidating } = useWriteContract();

  const registerNewTransaction = async (
    counterparty: string,
    amount: string,
    currency: string,
    description: string
  ) => {
    return registerTransaction({
      address: contractAddress as `0x${string}`,
      abi: TRANSACTION_REGISTRY_ABI,
      functionName: 'registerTransaction',
      args: [
        counterparty as `0x${string}`,
        BigInt(Math.round(parseFloat(amount) * 100)), // Store as cents to avoid decimals
        currency,
        description,
      ],
    });
  };

  const validateExistingTransaction = async (txHash: string) => {
    return validateTransaction({
      address: contractAddress as `0x${string}`,
      abi: TRANSACTION_REGISTRY_ABI,
      functionName: 'validateTransaction',
      args: [txHash as `0x${string}`],
    });
  };

  return {
    transactionHashes: transactionHashes || [],
    totalTransactions: totalTransactions ? Number(totalTransactions) : 0,
    registerTransaction: registerNewTransaction,
    validateTransaction: validateExistingTransaction,
    isLoading: isLoadingHashes,
    isRegistering,
    isValidating,
    contractAddress,
  };
}

// Hook to get a single transaction
export function useTransaction(txHash: string | null) {
  const chainId = avalancheFuji.id;
  const contractAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.TRANSACTION_REGISTRY;

  const { data: transaction, isLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: TRANSACTION_REGISTRY_ABI,
    functionName: 'getTransaction',
    args: txHash ? [txHash as `0x${string}`] : undefined,
    query: {
      enabled: !!txHash && contractAddress !== "0x0000000000000000000000000000000000000000",
    }
  });

  const { data: isFullyValidated } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: TRANSACTION_REGISTRY_ABI,
    functionName: 'isFullyValidated',
    args: txHash ? [txHash as `0x${string}`] : undefined,
    query: {
      enabled: !!txHash && contractAddress !== "0x0000000000000000000000000000000000000000",
    }
  });

  return {
    transaction: transaction ? {
      txHash: transaction[0],
      pyme: transaction[1],
      counterparty: transaction[2],
      amount: transaction[3],
      currency: transaction[4],
      description: transaction[5],
      validatedByPyme: transaction[6],
      validatedByCounterparty: transaction[7],
      timestamp: transaction[8],
      exists: transaction[9],
    } as Transaction : null,
    isFullyValidated,
    isLoading,
  };
}
