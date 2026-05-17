'use client';

import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { REVPUTATION_NFT_ABI, CONTRACT_ADDRESSES } from '@/lib/contracts';
import { avalancheFuji } from 'wagmi/chains';

export function useReputation() {
  const { address } = useAccount();
  const chainId = avalancheFuji.id;
  const contractAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.REPUTATION_NFT;

  // Check if user has reputation
  const { data: hasReputation, isLoading: isCheckingReputation } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: REVPUTATION_NFT_ABI,
    functionName: 'hasReputation',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && contractAddress !== "0x0000000000000000000000000000000000000000",
    }
  });

  // Get reputation details
  const { data: reputation, isLoading: isLoadingReputation } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: REVPUTATION_NFT_ABI,
    functionName: 'getReputation',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!hasReputation && contractAddress !== "0x0000000000000000000000000000000000000000",
    }
  });

  // Create reputation
  const { writeContract: createReputation, isPending: isCreating } = useWriteContract();

  return {
    hasReputation,
    reputation: reputation ? {
      score: Number(reputation[0]),
      transactionCount: Number(reputation[1]),
      validationRate: Number(reputation[2]),
      createdAt: Number(reputation[3]),
      lastUpdate: Number(reputation[4]),
      metadataURI: reputation[5],
    } : null,
    createReputation: (pymeAddress: string) => 
      createReputation({
        address: contractAddress as `0x${string}`,
        abi: REVPUTATION_NFT_ABI,
        functionName: 'createReputation',
        args: [pymeAddress as `0x${string}`],
      }),
    isLoading: isCheckingReputation || isLoadingReputation,
    isCreating,
    contractAddress,
  };
}
