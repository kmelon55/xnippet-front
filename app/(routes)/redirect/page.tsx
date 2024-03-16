import RedirectCard from '@/app/components/RedirectCard';

export default async function Page() {
  return (
    <>
      <style>
        {`
          .navbar{
            display: none;
          }
        `}
      </style>
      <div className="min-h-screen bg-white mx-auto items-center grid grid-cols-2 gap-3">
        <RedirectCard
          title="홈으로 돌아가기"
          description="로그인 된 상태로 홈 화면으로 돌아갑니다."
          url="/"
          className="justify-self-end"
        />
        <RedirectCard
          title="작업 확인하기"
          description="작업목록을 확인하고 수정할 수 있습니다."
          url="/dashboard"
        />
      </div>
    </>
  );
}
