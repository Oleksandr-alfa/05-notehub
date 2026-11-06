// fetchNotes : має виконувати запит для отримання колекції нотаток із сервера. Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);
// createNote: має виконувати запит для створення нової нотатки на сервері. Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
// deleteNote: має виконувати запит для видалення нотатки за заданим ідентифікатором. Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.

import axios from "axios";
import type { Note } from "../types/note"
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

const BASE_URL = "https://notehub-public.goit.study/api";

const API = axios.create({
    baseURL: `${BASE_URL}/notes`,
    headers: {
        Authorization: `Bearer ${myKey}`,
    }
});

interface NotesHttpResponse {
  notes: Note[];
    totalPages: number;
    page: number;
    perPage: number;
};

export const fetchNotes = async ( page: number): Promise<NotesHttpResponse> => {
    const { data } = await API.get<NotesHttpResponse>("/",{
        params: {
            
            page,
            perPage: 12,
        }
    })
    return data;
}

