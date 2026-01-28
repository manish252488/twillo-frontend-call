import { apiClient } from '../api-client';
import { Call, CreateCallRequest, UpdateCallStatusRequest } from '@/app/types/call';

export const callsApi = {
  getAll: async (): Promise<Call[]> => {
    return apiClient.get<Call[]>('/calls');
  },
  create: async (data: CreateCallRequest): Promise<Call> => {
    return apiClient.post<Call>('/calls', data);
  },
  updateStatus: async (id: number, data: UpdateCallStatusRequest): Promise<Call> => {
    return apiClient.patch<Call>(`/calls/${id}/status`, data);
  },
};

