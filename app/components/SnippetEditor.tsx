"use client";
import AIDiffEditor from "@/app/components/Editor/AIDiffEditor";
import CodeEditor from "@/app/components/Editor/CodeEditor";
import CodeLogViewer from "@/app/components/Editor/CodeLogViewer";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useDeletedSnippet } from "../hooks/snippetHook";

export default function SnippetEditor({
  userId,
  initialName = "",
  initialCode = "",
  snippetId,
}: {
  userId: string;
  initialName?: string;
  initialCode?: string;
  snippetId?: string;
}) {
  const [showAIDiffEditor, setShowAIDiffEditor] = useState(false);
  const [code, setCode] = useState<string>(initialCode);
  const [modified, setModified] = useState<string>("");
  const [name, setName] = useState(initialName);
  const { mutate: deletedSnippet, isPending: isDeletedPending } =
    useDeletedSnippet();

  const toggleAIDiffEditor = () => {
    setShowAIDiffEditor(!showAIDiffEditor);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleAcceptChanges = (aiCode: string) => {
    setCode(aiCode);
    setModified("");
    setShowAIDiffEditor(false);
  };

  const handleDiscardChanges = () => {
    setShowAIDiffEditor(false);
    setModified("");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("스니펫을 삭제할까요?")) {
      deletedSnippet(
        { id, name },
        {
          onSuccess: () => {
            alert("Snippet deleted successfully");
            window.location.href = "/snippets";
          },
          onError: (error) => {
            console.error("Error deleting snippet:", error);
            alert("Error deleting snippet");
          },
        }
      );
    }
  };

  return (
    <section>
      {snippetId && (
        <Button
          onClick={() => handleDelete(snippetId)}
          isLoading={isDeletedPending}
        >
          Delete
        </Button>
      )}
      <Input
        placeholder="Snippet Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex">
        {showAIDiffEditor ? (
          <AIDiffEditor
            original={code}
            modified={modified}
            onAccept={handleAcceptChanges}
            onDiscard={handleDiscardChanges}
          />
        ) : (
          <CodeEditor
            userId={userId}
            name={name}
            code={code}
            id={snippetId}
            onCodeChange={handleCodeChange}
          />
        )}
      </div>
      <div>
        <CodeLogViewer toggleAIDiffEditor={toggleAIDiffEditor} />
      </div>
    </section>
  );
}
