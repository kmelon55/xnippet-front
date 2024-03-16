'use client';

import React from 'react';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

import { useForm } from 'react-hook-form';
import { EMAIL_PATTERN } from '@/app/utils/email';
import { useRouter } from 'next/navigation';
import { useDeleteUser, useUpdateUser } from '@/app/hooks/userHook';
import { Session } from '@supabase/supabase-js';
import { Link } from '@nextui-org/react';

interface AccountFormProps {
  email: string;
  username: string;
  name: string;
}

export default function AccountForm(props: Session) {
  const { user } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormProps>();

  const { mutate: mutateUpdate, isPending: isUpdatePending } = useUpdateUser();
  const { mutate: mutateDelete, isPending: isDeletePending } = useDeleteUser();

  async function onSubmit(data: AccountFormProps) {
    const mutateData = { ...data };
    mutateUpdate(mutateData, {
      onSuccess: () => {
        alert('성공적으로 저장되었습니다');
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }

  async function handleDelete() {
    mutateDelete(user.id, {
      onSuccess: (data) => {
        //TODO: Show modal for ask user to confirm
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }

  return (
    <div className="flex gap-2 items-center mx-auto max-w-xl justify-center h-screen overflow-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        {/* <div
          className="flex justify-end gap-4 underline cursor-pointer text-gray-500 text-sm"
          onClick={handleDelete}
        >
          탈퇴하기
        </div> */}

        <Input
          label="Email"
          placeholder="이메일을 입력하세요."
          color={errors.email && 'danger'}
          errorMessage={errors.email?.message}
          defaultValue={user?.email}
          isReadOnly
          {...register('email', {
            required: true,
            pattern: {
              value: EMAIL_PATTERN,
              message: '유효한 이메일 형식이 아닙니다.',
            },
          })}
        />
        <Input
          label="Username"
          placeholder="닉네임을 입력하세요."
          color={errors.username && 'danger'}
          defaultValue={user?.user_metadata?.user_name}
          {...register('username', { required: true })}
        />
        <Input
          label="Name"
          placeholder="이름을 입력하세요."
          color={errors.name && 'danger'}
          defaultValue={user?.user_metadata?.name}
          {...register('name', { required: true })}
        />
        <Link href="/account/change_password" size="sm" className="pt-1">
          비밀번호 변경하기
        </Link>
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            isLoading={isUpdatePending || isDeletePending}
            color="primary"
          >
            저장
          </Button>
        </div>
      </form>
    </div>
  );
}
