import SnippetEditor from "@/app/components/SnippetEditor";
import { getSupabaseServerClient } from "@/app/services/supabase";

export default async function SnippetPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await getSupabaseServerClient();
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData.session;

  const { data, error: snippetError } = await supabase
    .from("snippet")
    .select("*")
    .eq("id", params.id)
    .single();

  if (snippetError) {
    console.error(snippetError);
    return <div>스니펫을 가져오는데 에러가 발생했습니다.</div>;
  }

  if (data.user_id !== session?.user.id) {
    return <div>해당 스니펫을 볼 권한이 없습니다.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SnippetEditor
        userId={data.user_id}
        initialName={data.name}
        initialCode={data.code}
        snippetId={data.id}
      />
    </div>
  );
}
