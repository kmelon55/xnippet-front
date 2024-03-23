import { createBrowserClient } from "@supabase/ssr";

const snippetLogEndPoint = process.env.NEXT_PUBLIC_LOG_ENDPOINT;
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
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function deployAndInsertSnippet(props: SnippetDetails) {
  const { name, code, userId } = props;

  const deployRes = await fetch(`${snippetLogEndPoint}/snippet/deploy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      function_name: name,
      script: code,
    }),
  });

  if (!deployRes.ok) {
    throw new Error("Failed to deploy snippet");
  }

  const { data, error } = await supabase
    .from("snippet")
    .insert([{ name, code, user_id: userId }]);

  if (error) throw error;

  return { deployData: await deployRes.json(), insertData: data };
}

export async function updatedSnippet(props: SnippetDetails) {
  const { id, name, code } = props;

  const updateRes = await fetch(`${snippetLogEndPoint}/snippet/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      function_name: name,
      script: code,
    }),
  });

  if (!updateRes.ok) {
    throw new Error("Failed to update snippet");
  }

  const { data, error } = await supabase
    .from("snippet")
    .update({ name, code })
    .eq("id", id)
    .single();

  if (error) throw error;

  return { updateData: await updateRes.json(), supabaseUpdateData: data };
}

export async function deletedSnippet(props: SnippetDetails) {
  const { id, name } = props;

  const deleteRes = await fetch(`${snippetLogEndPoint}/snippet/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      function_name: name,
    }),
  });

  if (!deleteRes.ok) {
    throw new Error("Failed to delete snippet");
  }

  const { data, error } = await supabase
    .from("snippet")
    .delete()
    .eq("id", Number(id));

  if (error) throw error;

  return { deleteData: await deleteRes.json(), supabaseDeleteData: data };
}

export async function getLog(functionName: string) {
  const res = await fetch(`${snippetLogEndPoint}/log`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ function_name: functionName }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
