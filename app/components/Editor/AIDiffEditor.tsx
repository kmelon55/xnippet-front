"use client";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { DiffEditor } from "@monaco-editor/react";
import { useState } from "react";
import { useInsertSnippet } from "@/app/hooks/snippetHook";

export default function AIDiffEditor({
  original: initialOriginal,
  modified: initialModified,
  userId,
}: AIDiffEditorProps) {
  const [showOriginal, setShowOriginal] = useState(false);
  const [original, setOriginal] = useState(initialOriginal);
  const [modified, setModified] = useState(initialModified);
  const [name, setName] = useState("");

  const { mutate: insertSnippet } = useInsertSnippet();

  const applyChanges = () => {
    setModified(original);
  };

  const saveSnippet = () => {
    if (!name) {
      alert("Please enter a name for the snippet.");
      return;
    }
    insertSnippet({ name, code: modified, userId });
  };

  return (
    <Card className="flex-1">
      <CardHeader className="flex gap-3">
        <Input
          placeholder="Snippet Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={() => setShowOriginal(!showOriginal)}>
          {showOriginal ? "Hide Original" : "Show Original"}
        </Button>
        {showOriginal && <Button onClick={applyChanges}>Apply Changes</Button>}
        <Button onClick={saveSnippet}>Save Snippet</Button>
      </CardHeader>
      <Divider />
      <CardBody>
        <DiffEditor
          height="200px"
          language="python"
          original={showOriginal ? original : ""}
          modified={modified}
          onMount={(editor, monaco) => {
            editor.getModifiedEditor().onDidChangeModelContent(() => {
              setModified(editor.getModifiedEditor().getValue());
            });
          }}
          options={{
            enableSplitViewResizing: true,
            renderSideBySide: showOriginal,
          }}
        />
      </CardBody>
      <Divider />
      <CardFooter></CardFooter>
    </Card>
  );
}
