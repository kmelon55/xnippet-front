import { useMutation, useQuery } from '@tanstack/react-query';
import {
  changePassword,
  deleteUser,
  getSession,
  signInUser,
  signOutUser,
  signUpUser,
  updateUser,
  signInWithKakao,
} from '../services/user';

export function useGetSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: getSession,
  });
}

export function useSignUpUser() {
  return useMutation({
    mutationFn: signUpUser,
  });
}

export function useSigninUser() {
  return useMutation({
    mutationFn: signInUser,
  });
}

export function useSignOutUser() {
  return useMutation({
    mutationFn: signOutUser,
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: updateUser,
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUser,
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}

export function useSignInWithKakao() {
  return useMutation({
    mutationFn: signInWithKakao,
  });
}
