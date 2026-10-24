import { NewNote, Note } from "@/types/note";
import { nextServer } from "./api";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface DeleteNoteResponse {
  note: Note;
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
  const params: FetchNotesParams = { search, page, perPage };

  if (tag && tag !== "all") {
    params.tag = tag;
  }
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
  });

  return response.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", newNote);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data.note;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`${"/notes"}/${id}`);
  return response.data;
}
