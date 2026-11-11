

import axios from "axios";
import type { CreateNote,  Note } from "../types/note"
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

const BASE_URL = "https://notehub-public.goit.study/api";

const API = axios.create({
    baseURL: `${BASE_URL}/notes`,
    headers: {
        Authorization: `Bearer ${myKey}`,
    }
});

export interface NotesHttpResponse {
  notes: Note[];
    totalPages: number;
};



export const fetchNotes = async (  search: string,page: number): Promise<NotesHttpResponse> => {
    const { data } = await API.get<NotesHttpResponse>("/",{
        params: {
            search,
            page,
            perPage: 12,
        }
    })
    return data;
}

export const createNote = async (newNote: CreateNote): Promise<Note> => {
    const res = await API.post<Note>("/", newNote);
    return res.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await API.delete<Note>(`/${id}`);
    return res.data;
}



