export interface Note {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updateAt: string,
    tag: string,
}
 export interface NotesHttpResponse {
  notes: Note[];
    totalPages: number;
    page: number;
    perPage: number;
};

export interface CreateNotes {
    title: string;
    content: string;
    tag: string;
}

// export interface UpdateNotes {

// }


