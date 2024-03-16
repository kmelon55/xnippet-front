'use client';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function AccountRestrictContainer() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen-nav">
      <p className="text-3xl font-medium mb-6">
        카카오 로그인 회원의 경우 현재 페이지에서 프로필 정보 수정이
        불가능합니다.
      </p>
      <div className="flex space-x-4">
        <Button
          onClick={() => router.back()}
          color="primary"
          variant="flat"
          size="lg"
        >
          이전 페이지로 돌아가기
        </Button>
      </div>
    </div>
  );
}
