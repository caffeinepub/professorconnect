import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { JobListing, Position } from '../backend';

export function useGetAllJobs() {
  const { actor, isFetching } = useActor();

  return useQuery<JobListing[]>({
    queryKey: ['jobs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllJobs();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useInitBackend() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not ready');
      return actor.init();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

export function useAddJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      institute: string;
      position: Position;
      department: string;
      location: string;
      deadline: string;
      applyUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.addJob(
        params.institute,
        params.position,
        params.department,
        params.location,
        params.deadline,
        params.applyUrl
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}
