import { Button, Link } from '@nextui-org/react';

interface PlanRestrictContainerProps {
  plan: string;
}

export default function PlanRestrictContainer(
  props: PlanRestrictContainerProps
) {
  const { plan } = props;

  const nullPlanMessage = (
    <p>회원님이 현재 이용중인 요금제가 없습니다. 요금제를 선택해주세요.</p>
  );
  const standardPlanMessage = (
    <>
      <p>
        회원님이 현재 이용중인 STANDARD 요금제는 최대 5개까지 작업을 등록할 수
        있습니다.
      </p>
      <p>더 많은 작업을 등록하려면 요금제를 업그레이드 하세요.</p>
    </>
  );
  const proPlanMessage = (
    <>
      <p>
        회원님이 현재 이용중인 PRO 요금제는 최대 10개까지 작업을 등록할 수
        있습니다.
      </p>
      <p>더 많은 작업을 등록하려면 요금제를 업그레이드 하세요.</p>
    </>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen-nav">
      <div className="text-3xl font-medium mb-6 text-center">
        {plan === null ? nullPlanMessage : null}
        {plan === 'STANDARD' ? standardPlanMessage : null}
        {plan === 'PRO' ? proPlanMessage : null}
      </div>
      <div className="flex space-x-4">
        <Button
          href="http://pf.kakao.com/_txlaaG/chat"
          target="_blank"
          as={Link}
          color="primary"
          size="lg"
        >
          요금제 변경 문의
        </Button>
      </div>
    </div>
  );
}
