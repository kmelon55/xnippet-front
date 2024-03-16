'use client';

import React from 'react';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import EyeSlashFilledIcon from '@/app/components/Icon/EyeSlashFilledIcon';
import EyeFilledIcon from '@/app/components/Icon/EyeFilledIcon';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  useChangePassword,
  useSignOutUser,
  useSigninUser,
} from '@/app/hooks/userHook';
import { sign } from 'crypto';

interface ChangePasswordFormProps {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm?: string;
}

export default function ChangePasswordForm(props: { email: string }) {
  const { email } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormProps>({
    mode: 'onChange',
  });

  const router = useRouter();

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutate: changePassword, isPending } = useChangePassword();
  const { mutate: signIn, isPending: isSignInPending } = useSigninUser();
  const { mutate: signOut } = useSignOutUser();

  async function onSubmit(data: ChangePasswordFormProps) {
    const { currentPassword, newPassword } = data;

    signIn(
      { email, password: currentPassword },
      {
        onSuccess: () => {
          changePassword(newPassword, {
            onSuccess: () => {
              alert('성공적으로 변경되었습니다. 다시 로그인해주세요.');
              signOut(undefined, {
                onSuccess: () => {
                  router.push('/');
                  router.refresh();
                },
              });
            },
            onError: (error) => {
              console.error(error);
            },
          });
        },
      }
    );
  }

  return (
    <div className="flex gap-2 items-center mx-auto max-w-xl justify-center h-screen overflow-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <Input
          label="Current Password"
          placeholder="현재 비밀번호를 입력하세요."
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          color={errors.currentPassword && 'danger'}
          errorMessage={errors.currentPassword?.message}
          {...register('currentPassword', {
            required: true,
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다.',
            },
          })}
        />
        <Input
          label="New Password"
          placeholder="새로운 비밀번호를 입력하세요."
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          color={errors.newPassword && 'danger'}
          errorMessage={errors.newPassword?.message}
          {...register('newPassword', {
            required: true,
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다.',
            },
          })}
        />
        <Input
          label="New Password Confirm"
          placeholder="새로운 비밀번호를 입력하세요."
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          color={errors.newPasswordConfirm && 'danger'}
          errorMessage={errors.newPasswordConfirm?.message}
          {...register('newPasswordConfirm', {
            required: true,
            validate: (value: string | undefined) =>
              value === watch('newPassword') || '비밀번호가 일치하지 않습니다.',
          })}
        />
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            color="primary"
            isLoading={isPending || isSignInPending}
          >
            변경
          </Button>
        </div>
      </form>
    </div>
  );
}
