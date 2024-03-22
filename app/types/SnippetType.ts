interface SnippetDetails {
  id?: string;
  name: string;
  code: string;
  userId?: string;
}

interface AIDiffEditorProps {
  original: string;
  modified: string;
  userId: string;
}

interface UserSnippetsProps {
  userId: string;
}
