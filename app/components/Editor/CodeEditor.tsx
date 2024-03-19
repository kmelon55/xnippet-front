"use client";
import Editor, { OnChange } from "@monaco-editor/react";
import { useState } from "react";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { Session } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

interface CodeEditorProps {
  session: Session;
}

export default function CodeEditor(props: CodeEditorProps) {
  const [code, setCode] = useState<string>("print('Hello World');");

  const handleEditorChange: OnChange = (value?: string) => {
    setCode(value || "");
  };

  const handleRunCode = async () => {
    const user = props.session.user;

    if (user) {
      const { data, error } = await supabase
        .from("user_codes")
        .insert([{ code, user_id: user.id }]);

      if (error) {
        console.error("Error saving code:", error);
      } else {
        console.log("Code saved successfully!", data);
      }
    } else {
      console.error("No user is currently logged in.");
    }
  };

  return (
    <div>
      <Editor
        height="100px"
        width="700px"
        language="python"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          fontSize: 16,
          formatOnType: true,
          minimap: { enabled: false },
        }}
      />
      <button onClick={handleRunCode}>Save</button>
    </div>
  );
}
