import { NewNote, Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

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

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  email?: string;
  username: string;
};

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

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
