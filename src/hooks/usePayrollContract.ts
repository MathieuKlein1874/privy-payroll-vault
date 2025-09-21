import { useContract, useContractWrite, useContractRead } from 'wagmi';
import { PAYROLL_VAULT_ABI, CONTRACT_ADDRESS } from '@/lib/contracts';

export function usePayrollContract() {
  const { data: contract } = useContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: PAYROLL_VAULT_ABI,
  });

  return contract;
}

export function useCreatePayroll() {
  const { write, isLoading, error } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: PAYROLL_VAULT_ABI,
    functionName: 'createPayroll',
  });

  return {
    createPayroll: write,
    isLoading,
    error,
  };
}

export function useProcessPayment() {
  const { write, isLoading, error } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: PAYROLL_VAULT_ABI,
    functionName: 'processPayment',
  });

  return {
    processPayment: write,
    isLoading,
    error,
  };
}

export function usePayrollInfo(payrollId: number) {
  const { data, isLoading, error } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: PAYROLL_VAULT_ABI,
    functionName: 'getPayrollInfo',
    args: [payrollId],
  });

  return {
    payrollInfo: data,
    isLoading,
    error,
  };
}
