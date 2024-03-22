import AIDiffEditor from "@/app/components/Editor/AIDiffEditor";
import CodeEditor from "@/app/components/Editor/CodeEditor";
import CodeLogViewer from "@/app/components/Editor/CodeLogViewer";
import SigninModalBtn from "@/app/components/Signin/SigninModalBtn";
import { getSupabaseServerClient } from "@/app/services/supabase";

export default async function EditorPage() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const session = data.session;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex gap-12 mt-3">
        {session ? (
          <section>
            <div className="flex">
              {/* <CodeEditor session={session} /> */}
              <AIDiffEditor
                original="fffff"
                modified="여기에 코드를 입력하세요"
                userId={session.user.id}
              />
            </div>
            <div>
              <CodeLogViewer />
            </div>
          </section>
        ) : (
          <SigninModalBtn buttonText="로그인" buttonColor="primary" />
        )}
      </div>
    </div>
  );
}
