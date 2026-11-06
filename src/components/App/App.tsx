
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';

import {  useState } from 'react';
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { fetchNotes } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';


function App() {
  const [page, setCurrentPage] = useState(1)
  const [isOpenModal, setIsOpenModal] = useState(false);
  

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes( page),
  //  enabled: search!== '',
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  })

  const openModal = ()=>{
    setIsOpenModal(true);
  }
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
        <button onClick={openModal } className={css.button}>Create note +</button>
{isOpenModal && <Modal>{<NoteForm/>}</Modal>}
    </header>
      {data && <NoteList notes={data.notes} />}
  </div >
    )
}

export default App;