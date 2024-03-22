import UserSnippets from "@/app/components/Editor/UserSnippets";
import SigninModalBtn from "@/app/components/Signin/SigninModalBtn";
import { getSupabaseServerClient } from "@/app/services/supabase";

export default async function SnippetsPage() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const session = data.session;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex gap-12 mt-3">
        {session ? (
          <UserSnippets userId={session.user.id} />
        ) : (
          <SigninModalBtn buttonText="로그인" buttonColor="primary" />
        )}
      </div>
    </div>
  );
}
