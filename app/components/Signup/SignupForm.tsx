'use client';

import React from 'react';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import EyeSlashFilledIcon from '@/app/components/Icon/EyeSlashFilledIcon';
import EyeFilledIcon from '@/app/components/Icon/EyeFilledIcon';

import { useForm, Controller } from 'react-hook-form';
import { EMAIL_PATTERN } from '@/app/utils/email';
import { useRouter } from 'next/navigation';
import { useSignUpUser } from '@/app/hooks/userHook';
import { Accordion, AccordionItem } from '@nextui-org/react';

interface SignupFormProps {
  email: string;
  username: string;
  password: string;
  passwordConfirm?: string;
  name: string;
  terms?: boolean;
}

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<SignupFormProps>({
    mode: 'onChange',
  });

  const router = useRouter();

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutate, isPending } = useSignUpUser();

  async function onSubmit(data: SignupFormProps) {
    mutate(data, {
      onSuccess: () => {
        router.push('/');
        router.refresh();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }

  return (
    <div className="flex flex-col gap-2 items-center mx-auto max-w-xl p-1 justify-center h-screen overflow-auto">
      <div className="w-full my-3">
        <h1 className="text-3xl font-semibold">회원가입</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <Input
          label="Email"
          placeholder="이메일을 입력하세요."
          color={errors.email && 'danger'}
          errorMessage={errors.email?.message}
          {...register('email', {
            required: true,
            pattern: {
              value: EMAIL_PATTERN,
              message: '유효한 이메일 형식이 아닙니다.',
            },
          })}
        />
        <Input
          label="username"
          placeholder="닉네임을 입력하세요."
          color={errors.username && 'danger'}
          {...register('username', { required: true })}
        />
        <Input
          label="password"
          placeholder="비밀번호를 입력하세요."
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
          color={errors.password && 'danger'}
          errorMessage={errors.password?.message}
          {...register('password', {
            required: true,
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다.',
            },
          })}
        />
        <Input
          label="passwordConfirm"
          placeholder="비밀번호를 입력하세요."
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
          color={errors.passwordConfirm && 'danger'}
          errorMessage={errors.passwordConfirm?.message}
          {...register('passwordConfirm', {
            required: true,
            validate: (value: string | undefined) =>
              value === watch('password') || '비밀번호가 일치하지 않습니다.',
          })}
        />
        <Input
          label="name"
          placeholder="이름을 입력하세요."
          color={errors.name && 'danger'}
          {...register('name', { required: true })}
        />

        <Accordion isCompact>
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            startContent={
              <Controller
                name="terms"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox
                    color="primary"
                    onBlur={onBlur}
                    onChange={onChange}
                    isSelected={value}
                  >
                    개인정보 수집 및 이용에 동의합니다.
                  </Checkbox>
                )}
              />
            }
          >
            <div className="flex flex-col gap-4 text-gray-700 text-sm px-7">
              <p>
                XNIPPET은 서비스 회원가입, 고지사항 전달 등을 위해 아래와 같이
                개인정보를 수집, 이용합니다.
              </p>
              <p>
                수집 목적: 회원 식별 및 회원제 서비스 제공, 서비스 변경사항 및
                고지사항 전달
              </p>
              <p>수집 항목: 이름, 이메일</p>
              <p>보유 및 이용 기간: 입력일로부터 1년까지</p>
              <p>
                ※ 귀하는 XNIPPET의 서비스 이용에 필요한 최소한의 개인정보 수집,
                이용에 동의하지 않을 권리가 있으며, 동의 거부 시 거부한 내용에
                대해 서비스가 제한될 수 있습니다.
              </p>
            </div>
          </AccordionItem>
        </Accordion>
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            color="primary"
            isLoading={isPending}
            isDisabled={!watch('terms')}
          >
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
}
