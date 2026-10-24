import { Note } from "@/types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search: string;
  page: number;
  perPage?: number;
  tag?: string;
}

export async function fetchNotes({
  search,
  page,
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const params: FetchNotesParams = { search, page, perPage };

  if (tag && tag !== "all") {
    params.tag = tag;
  }
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`${"/notes"}/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function checkSession() {
  const cookieStore = await cookies();

  const response = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
