import { Button, Link } from '@nextui-org/react';
import { FaArrowRight } from 'react-icons/fa';
import SigninModalBtn from './components/Signin/SigninModalBtn';

export default function Home() {
  return (
    <div className="bg-[#14273b] min-h-screen flex flex-col items-center justify-center">
      <div className="flex gap-12 mt-3">
        <SigninModalBtn
          buttonClassName="h-14 text-xl"
          buttonColor="primary"
          buttonSize="lg"
          buttonText="회원가입 하고 서비스 이용하기"
        />
        <Button
          href="#"
          as={Link}
          className="h-14 text-xl"
          size="lg"
          color="secondary"
          endContent={<FaArrowRight />}
        >
          문의하기
        </Button>
      </div>
    </div>
  );
}
