import { Button, Link } from '@nextui-org/react';

export default function CreateRestrictContainer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen-nav">
      <p className="text-3xl font-medium mb-6">
        작업은 최대 5개까지 등록할 수 있습니다.
      </p>
      <div className="flex space-x-4">
        <Button href="/dashboard" as={Link} color="primary" size="lg">
          Dashboard로 이동하기
        </Button>
      </div>
    </div>
  );
}
