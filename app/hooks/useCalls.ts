import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { callsApi } from '@/app/lib/api/calls';
import { CreateCallRequest, UpdateCallStatusRequest } from '@/app/types/call';
// hook to handle create, update and get calls
export const useCalls = () => {
  return useQuery({
    queryKey: ['calls'],
    queryFn: () => callsApi.getAll(),
    refetchInterval: 3000,
  });
};

export const useCreateCall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCallRequest) => callsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calls'] });
    },
  });
};

export const useUpdateCallStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCallStatusRequest }) =>
      callsApi.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calls'] });
    },
  });
};

