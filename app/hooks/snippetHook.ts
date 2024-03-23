import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchUserSnippets,
  updatedSnippet,
  fetchSnippetById,
  getLog,
  deployAndInsertSnippet,
  deletedSnippet,
} from "../services/snippet";

export function useFetchUserSnippets(userId: string) {
  return useQuery({
    queryKey: ["userSnippets", userId],
    queryFn: () => fetchUserSnippets(userId),
    enabled: !!userId,
  });
}

export function useFetchSnippetById(id: string) {
  return useQuery({
    queryKey: ["snippet", id],
    queryFn: () => fetchSnippetById(id),
    enabled: !!id,
  });
}

export function useDeployAndInsertSnippet() {
  return useMutation({
    mutationFn: deployAndInsertSnippet,
  });
}

export function useUpdatedSnippet() {
  return useMutation({
    mutationFn: updatedSnippet,
  });
}

export function useDeletedSnippet() {
  return useMutation({
    mutationFn: deletedSnippet,
  });
}

export function useGetLog() {
  return useMutation({
    mutationFn: getLog,
  });
}
