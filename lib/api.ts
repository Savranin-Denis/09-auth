import axios from "axios";
import { NewNote, Note } from "@/types/note";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";

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
  const response = await axios.get<FetchNotesResponse>(BASE_URL, {
    params,
    headers: { Authorization: `Bearer ${myKey}` },
  });

  return response.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await axios.post<Note>(BASE_URL, newNote, {
    headers: { Authorization: `Bearer ${myKey}` },
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<DeleteNoteResponse>(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${myKey}` },
  });
  return response.data.note;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${myKey}` },
  });
  return response.data;
}
