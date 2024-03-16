'use client';

import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useSignOutUser } from '../hooks/userHook';
import { Session } from '@supabase/supabase-js';

interface DropdownAvatarProps {
  session: Session;
}

export default function DropdownAvatar(props: DropdownAvatarProps) {
  const { email } = props.session.user;
  const { user_name, avatar_url } = props.session.user.user_metadata;

  const { mutate: signOut } = useSignOutUser();

  const router = useRouter();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          size="md"
          src={avatar_url}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        onAction={(key) => {
          if (key === 'logout') {
            signOut(undefined, {
              onSuccess: () => {
                router.refresh();
              },
            });
          }
        }}
      >
        <DropdownItem key="name" className="h-14 gap-2">
          <p className="font-semibold">{user_name}</p>
          <p className="font-semibold">{email} </p>
        </DropdownItem>
        <DropdownItem key="dashboard" href="/dashboard">
          내 작업 확인하기
        </DropdownItem>
        <DropdownItem key="account" href="/account">
          내 정보 수정하기
        </DropdownItem>
        <DropdownItem
          showDivider
          key="contact"
          href="http://pf.kakao.com/_txlaaG/chat"
          target="_blank"
        >
          문의하기
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
