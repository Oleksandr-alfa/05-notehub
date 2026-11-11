
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';

import {  useState } from 'react';
import { useQuery, keepPreviousData} from "@tanstack/react-query";
import { useDebounce } from 'use-debounce';

import { fetchNotes } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import SearchBox from '../SearchBox/SearchBox';


function App() {
  const [page, setPage] = useState(1)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  
  const [debouncedSearch] = useDebounce(search, 1000);

  

  
  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(debouncedSearch, page),
   
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };
  

  const openModal = ()=>{
    setIsOpenModal(true);
  }

  const closeModal = () => {
    setIsOpenModal(false);
  }
  
 

  return (
  <div className={css.app}>
    <header className={css.toolbar}>
        {<SearchBox onSearch={handleSearchChange} search={search} />}
        {isSuccess && data.totalPages > 1 &&
          <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={setPage}/>}
        <button onClick={openModal } className={css.button}>Create note +</button>
        {isOpenModal && <Modal onClose={closeModal}><NoteForm onClose={closeModal}/></Modal>}
    </header>
      {data && <NoteList notes={data.notes} />}
  </div >
    )
}

export default App;