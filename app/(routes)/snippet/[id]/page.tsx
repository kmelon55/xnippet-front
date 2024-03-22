import SnippetDetail from "@/app/components/Editor/SnippetDetail";
import SigninModalBtn from "@/app/components/Signin/SigninModalBtn";
import { getSupabaseServerClient } from "@/app/services/supabase";

export default async function SnippetPage() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex gap-12 mt-3">
        {session ? (
          <SnippetDetail />
        ) : (
          <SigninModalBtn buttonText="로그인" buttonColor="primary" />
        )}
      </div>
    </div>
  );
}
