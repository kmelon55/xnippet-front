interface SnippetDetails {
  id?: string;
  name: string;
  code?: string;
  userId?: string;
}

interface AIDiffEditorProps {
  original: string;
  modified: string;
  onAccept: (newCode: string) => void;
  onDiscard: () => void;
}

interface UserSnippetsProps {
  userId: string;
}
