import { QueryKey, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";

export function useFetch<TResponse>(
  queryKey: QueryKey,
  queryFn: () => Promise<AxiosResponse<TResponse>>,
  options?: Omit<UseQueryOptions<TResponse, AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TResponse, AxiosError>({
    queryKey,
    queryFn: async (): Promise<TResponse> => {
      const response = await queryFn();
      return response.data;
    },
    ...options,
  });
}

export function useMutate<TResponse, TVariables = void>(
    mutationFn: (variables?: TVariables) => Promise<AxiosResponse<TResponse>>,
    options?: UseMutationOptions<TResponse, AxiosError, TVariables>
) {
    return useMutation<TResponse, AxiosError, TVariables>({
        mutationFn: async (variables: TVariables): Promise<TResponse> => {
            const response = await mutationFn(variables);
            return response.data;
        },
        ...options
    })
}