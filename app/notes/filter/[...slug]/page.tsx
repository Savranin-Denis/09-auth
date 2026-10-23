import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = slug[0];

  return {
    title: `Notes - ${note}`,
    description: `Browse notes tagged with ${note}. Notehab allows you to filter and view notes based on specific tags`,
    openGraph: {
      title: `Notes - ${note}`,
      description: `Browse notes tagged with ${note}. Notehab allows you to filter and view notes based on specific tags`,
      url: `https://notehub.com/notes/filter/${note}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes ${note} | NoteHub`,
        },
      ],
    },
    twitter: {
      title: `Notes - ${note}`,
      description: `Browse notes tagged with ${note}. Notehab allows you to filter and view notes based on specific tags`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function Notes({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const category = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, category],
    queryFn: () => fetchNotes({ search: "", page: 1, tag: category }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
}
