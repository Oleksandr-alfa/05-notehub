

import axios from "axios";
import type { NotesHttpResponse, CreateNotes,  Note } from "../types/note"
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

const BASE_URL = "https://notehub-public.goit.study/api";

const API = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        Authorization: `Bearer ${myKey}`,
    }
});



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

export const createNote = async (newNote: CreateNotes): Promise<NotesHttpResponse> => {
    const res = await API.post<NotesHttpResponse>("/notes/", newNote);
    return res.data;
}

export const deleteNote = async (id: string): Promise<void> => {
    await API.delete<Note>(`/notes/${id}`);
    
}



