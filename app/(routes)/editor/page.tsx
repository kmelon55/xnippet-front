import SigninModalBtn from "@/app/components/Signin/SigninModalBtn";
import SnippetEditor from "@/app/components/SnippetEditor";
import { getSupabaseServerClient } from "@/app/services/supabase";

export default async function EditorPage() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const session = data.session;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex gap-12 mt-3">
        {session ? (
          <SnippetEditor userId={session.user.id} />
        ) : (
          <SigninModalBtn buttonText="로그인" buttonColor="primary" />
        )}
      </div>
    </div>
  );
}
