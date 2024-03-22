"use client";
import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useFetchUserSnippets } from "@/app/hooks/snippetHook";
import Link from "next/link";

export default function UserSnippets({ userId }: UserSnippetsProps) {
  const { data: snippets, isLoading, error } = useFetchUserSnippets(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading snippets: {error.message}</div>;

  return (
    <section className="flex flex-wrap gap-4">
      {(snippets || []).length > 0 ? (
        (snippets || []).map((snippet) => (
          <Link href={`/snippet/${snippet.id}`} key={snippet.id} passHref>
            <Card className="w-60 hover:shadow-lg">
              <CardHeader>{snippet.name}</CardHeader>
              <CardBody>{snippet.code}</CardBody>
            </Card>
          </Link>
        ))
      ) : (
        <p>No snippets found.</p>
      )}
    </section>
  );
}
