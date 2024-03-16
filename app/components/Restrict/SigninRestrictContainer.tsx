import { Button, Link } from '@nextui-org/react';
import SigninModalBtn from '../Signin/SigninModalBtn';

export default function SigninRestrictContainer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen-nav">
      <p className="text-3xl font-medium mb-6">
        서비스를 이용하려면 로그인이 필요합니다.
      </p>
      <div className="flex space-x-4">
        <SigninModalBtn
          buttonText="로그인"
          buttonColor="primary"
          buttonSize="lg"
        ></SigninModalBtn>
        <Button
          href="/signup"
          as={Link}
          color="primary"
          variant="flat"
          size="lg"
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
