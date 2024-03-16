import { getSupabaseServerClient } from '@/app/services/supabase';
import ChangePasswordForm from '../../../components/Account/ChangePasswordForm';
import AccountRestrictContainer from '@/app/components/Restrict/AccountRestrictContainer';

export default async function ChangePasswordPage() {
  const supabase = await getSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const email = session?.user?.email;

  if (!email) {
    return null;
  }

  if (session.user.app_metadata.provider === 'kakao') {
    return <AccountRestrictContainer />;
  }

  return <ChangePasswordForm email={email} />;
}
