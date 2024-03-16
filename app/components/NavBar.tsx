import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from '@nextui-org/react';
import DropdownAvatar from './DropdownAvatar';
import SigninModalBtn from './Signin/SigninModalBtn';
import { getSupabaseServerClient } from '../services/supabase';

export default async function NavBar() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  return (
    <Navbar isBordered maxWidth="xl" className="navbar">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href="/">
            <p className="text-black hidden sm:block font-bold text-xl">
              XNIPPET
            </p>
            {/* <AutoXtionLogo /> */}
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-9" justify="center">
          <NavbarItem isActive>
            <Link className="text-lg" href="/guide" color="foreground">
              가이드 보기
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link className="text-lg" href="/dashboard" color="foreground">
              작업 확인하기
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link
              className="text-lg"
              href="http://pf.kakao.com/_txlaaG/chat"
              color="secondary"
              target="_blank"
            >
              문의하기
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" className="items-center" justify="end">
          {session ? (
            <DropdownAvatar session={session} />
          ) : (
            <SigninModalBtn buttonText="로그인" buttonColor="primary" />
          )}
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
}
