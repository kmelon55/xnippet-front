import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchUserSnippets,
  insertSnippet,
  updateSnippet,
  deleteSnippet,
  fetchSnippetById,
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

export function useInsertSnippet() {
  return useMutation({
    mutationFn: insertSnippet,
  });
}

export function useUpdateSnippet() {
  return useMutation({
    mutationFn: updateSnippet,
  });
}

export function useDeleteSnippet() {
  return useMutation({
    mutationFn: deleteSnippet,
  });
}
