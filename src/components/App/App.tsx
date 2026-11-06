
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';

import { useState } from 'react';
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { fetchNotes } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';


function App() {
const [page, setCurrentPage]=useState(1)
  

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes( page),
  //  enabled: search!== '',
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  })
  console.log(data);
 

  return (
  <div className={css.app}>
    <header className={css.toolbar}>
      {/* Компонент SearchBox */}
        {isSuccess &&
          <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={setCurrentPage}/>}
      {/* Кнопка створення нотатки */}
    </header>
      {data && <NoteList notes={data.notes} />}
  </div >
    )
}

export default App;