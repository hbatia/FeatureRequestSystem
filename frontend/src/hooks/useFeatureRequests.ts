import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useFeatureRequests() {
  return useQuery({
    queryKey: ['feature-requests'],
    queryFn: api.featureRequests.getAll,
  });
}

export function useFeatureRequest(id: string) {
  return useQuery({
    queryKey: ['feature-requests', id],
    queryFn: () => api.featureRequests.getOne(id),
    enabled: !!id,
  });
}

export function useCompletedLastMonth() {
  return useQuery({
    queryKey: ['feature-requests', 'completed-last-month'],
    queryFn: api.featureRequests.getCompletedLastMonth,
  });
}

export function useCreateVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.votes.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feature-requests'] });
    },
  });
}

export function useDeleteVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.votes.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feature-requests'] });
    },
  });
}
