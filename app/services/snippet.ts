import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function fetchUserSnippets(userId: string) {
  const { data, error } = await supabase
    .from("snippet")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data;
}

export async function fetchSnippetById(id: string) {
  const { data, error } = await supabase
    .from("snippet")
    .select("*")
    .eq("id", Number(id));

  if (error) throw error;

  return data;
}

export async function insertSnippet(props: SnippetDetails) {
  const { name, code, userId } = props;

  const { data, error } = await supabase
    .from("snippet")
    .insert([{ name, code, user_id: userId }]);

  if (error) throw error;

  return data;
}

export async function updateSnippet(props: SnippetDetails) {
  const { id, name, code } = props;

  const { data, error } = await supabase
    .from("snippet")
    .update({ name, code })
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function deleteSnippet(id: string) {
  const { data, error } = await supabase
    .from("snippet")
    .delete()
    .eq("id", Number(id));

  if (error) throw error;

  return data;
}
