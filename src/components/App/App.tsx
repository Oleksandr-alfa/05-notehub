
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';

import {  useState } from 'react';
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { fetchNotes } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import SearchBox from '../SearchBox/SearchBox';


function App() {
  const [page, setCurrentPage] = useState(1)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [search, setSearch]=useState("")

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(search, page),
  //  enabled: search!= '',
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
        {<SearchBox onSearch={setSearch} search={search} />}
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