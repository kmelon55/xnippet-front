import { getSupabaseServerClient } from '@/app/services/supabase';
import AccountForm from '../../components/Account/AccountForm';
import AccountRestrictContainer from '@/app/components/Restrict/AccountRestrictContainer';

export default async function ProfilePage() {
  const supabase = await getSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    //TODO: Redirect to login page
    return null;
  }

  if (session.user.app_metadata.provider === 'kakao') {
    return <AccountRestrictContainer />;
  }

  return <AccountForm {...session} />;
}
