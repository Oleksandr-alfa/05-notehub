

import axios from "axios";
import type { CreateNotes,  Note } from "../types/note"
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

const BASE_URL = "https://notehub-public.goit.study/api";

const API = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        Authorization: `Bearer ${myKey}`,
    }
});

export interface NotesHttpResponse {
  notes: Note[];
    totalPages: number;
    page: number;
    perPage: number;
};



export const fetchNotes = async (  search: string,page: number): Promise<NotesHttpResponse> => {
    const { data } = await API.get<NotesHttpResponse>("/notes/",{
        params: {
            search,
            page,
            perPage: 12,
        }
    })
    return data;
}

export const createNote = async (newNote: CreateNotes): Promise<Note> => {
    const res = await API.post<Note>("/notes/", newNote);
    return res.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await API.delete<Note>(`/notes/${id}`);
    return res.data;
}



