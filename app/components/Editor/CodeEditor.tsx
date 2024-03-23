"use client";
import { Button, Card, CardHeader } from "@nextui-org/react";
import Editor, { OnChange } from "@monaco-editor/react";
import {
  useDeployAndInsertSnippet,
  useUpdatedSnippet,
} from "@/app/hooks/snippetHook";

interface CodeEditorProps {
  userId: string;
  name: string;
  code: string;
  id?: string;
  onCodeChange: (newCode: string) => void;
}

export default function CodeEditor(props: CodeEditorProps) {
  const { userId, name, code, id, onCodeChange } = props;

  const handleEditorChange: OnChange = (value?: string) => {
    onCodeChange(value || "");
  };
  const { mutate: deployAndInsertSnippet } = useDeployAndInsertSnippet();
  const { mutate: updatedSnippet } = useUpdatedSnippet();

  const saveSnippet = () => {
    if (!name) {
      alert("Please enter a name for the snippet.");
      return;
    }

    if (id) {
      updatedSnippet(
        { id, name, code },
        {
          onSuccess: (data) => {
            console.log("Snippet updated successfully:", data);
            // window.location.href = "/snippets";
          },
          onError: (error) => {
            console.error("Error updating snippet:", error);
            alert("Error updating snippet");
          },
        }
      );
    } else {
      deployAndInsertSnippet(
        { name, code, userId },
        {
          onSuccess: (data) => {
            console.log("Snippet deployed and inserted successfully:", data);
            // window.location.href = "/snippets";
          },
          onError: (error) => {
            console.error("Error deploying or inserting snippet:", error);
            alert("Error deploying or inserting snippet");
          },
        }
      );
    }
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <Button onClick={saveSnippet}>Save Snippet</Button>
      </CardHeader>
      <Editor
        height="250px"
        width="700px"
        language="python"
        value={code}
        onChange={handleEditorChange}
        options={{
          fontSize: 13,
          formatOnType: true,
          minimap: { enabled: false },
        }}
      />
    </Card>
  );
}
