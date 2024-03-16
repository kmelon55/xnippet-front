'use client';

import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Link,
  useDisclosure,
  Divider,
} from '@nextui-org/react';

import { useForm } from 'react-hook-form';
import { useSignInWithKakao, useSigninUser } from '@/app/hooks/userHook';
import { LockIcon } from '../Icon/LockIcon';
import { MailIcon } from '../Icon/MailIcon';
import { useRouter } from 'next/navigation';

interface SigninFormProps {
  email: string;
  password: string;
}

interface SignModalProps {
  buttonText: string;
  buttonColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
  buttonSize?: 'sm' | 'md' | 'lg';
  buttonClassName?: string;
}

export default function SigninModalBtn(props: SignModalProps) {
  const {
    buttonText,
    buttonColor = 'default',
    buttonSize = 'md',
    buttonClassName = '',
  } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm<SigninFormProps>();

  const [loginError, setLoginError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { mutate: signInWithPassword, isPending } = useSigninUser();
  const { mutate: signInWithKakao } = useSignInWithKakao();

  const router = useRouter();

  async function onSubmit(data: SigninFormProps) {
    signInWithPassword(data, {
      onSuccess: () => {
        onOpenChange();
        router.refresh();
      },
      onError: (error) => {
        if (error.message === 'Invalid login credentials') {
          setLoginError(true);
        }
        if (error.message === 'invalid_email') {
          setEmailError(true);
        }
        if (error.message === 'incorrect_password') {
          setPasswordError(true);
        }
      },
    });
  }

  async function onKakaoLogin() {
    signInWithKakao(undefined);
  }

  return (
    <>
      <Button
        onPress={onOpen}
        color={buttonColor}
        size={buttonSize}
        className={buttonClassName}
      >
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <Input
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Email"
                    placeholder="아이디를 입력하세요."
                    variant="bordered"
                    isInvalid={emailError || loginError}
                    errorMessage={
                      emailError ? '아이디가 존재하지 않습니다.' : ''
                    }
                    {...register('email', { required: true })}
                    onChange={() => setEmailError(false)}
                  />
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password"
                    placeholder="비밀번호를 입력하세요."
                    type="password"
                    variant="bordered"
                    isInvalid={passwordError || loginError}
                    errorMessage={
                      passwordError ? '비밀번호가 일치하지 않습니다.' : ''
                    }
                    {...register('password', { required: true })}
                    onChange={() => setPasswordError(false)}
                  />
                  {loginError && (
                    <div className="text-sm flex gap-2 text-danger-500 px-1">
                      이메일 혹은 비밀번호가 일치하지 않습니다.
                    </div>
                  )}
                  {/* <div className="flex py-2 px-1 justify-between">
                    <Link color="primary" href="#" size="sm">
                      비밀번호를 잊으셨나요?
                    </Link>
                  </div> */}
                  <div className="flex justify-end gap-4">
                    {/* <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button> */}
                    <Button
                      href="/signup"
                      as={Link}
                      color="primary"
                      variant="flat"
                    >
                      회원가입
                    </Button>
                    <Button isLoading={isPending} type="submit" color="primary">
                      로그인
                    </Button>
                  </div>
                </form>
                <Divider className="my-4" />
                <Link onClick={onKakaoLogin}>
                  <img
                    src="/kakao_login_large_wide.png"
                    height={50}
                    alt="kakao login"
                    className="cursor-pointer"
                  />
                </Link>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
