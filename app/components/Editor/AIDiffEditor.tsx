"use client";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { DiffEditor } from "@monaco-editor/react";
import { useState } from "react";

export default function AIDiffEditor({
  original: initialOriginal,
  modified: initialModified,
  onAccept,
  onDiscard,
}: AIDiffEditorProps) {
  const [original, setOriginal] = useState(initialOriginal);
  const [modified, setModified] = useState(initialModified);

  const handleAccept = () => {
    onAccept(modified);
  };

  const handleDiscard = () => {
    onDiscard();
  };

  return (
    <Card className="flex-1">
      <CardHeader className="flex gap-3">
        <Button onClick={handleAccept}>Accept</Button>
        <Button onClick={handleDiscard}>Discard</Button>
      </CardHeader>
      <Divider />
      <CardBody>
        <DiffEditor
          height="200px"
          language="python"
          original={original}
          modified={modified}
          onMount={(editor, monaco) => {
            editor.getModifiedEditor().onDidChangeModelContent(() => {
              setModified(editor.getModifiedEditor().getValue());
            });
          }}
          options={{
            enableSplitViewResizing: true,
            renderSideBySide: true,
          }}
        />
      </CardBody>
      <Divider />
      <CardFooter></CardFooter>
    </Card>
  );
}
