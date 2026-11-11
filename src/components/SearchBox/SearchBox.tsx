import css from "./SearchBox.module.css";


interface SearchBoxProps {
    onSearch: (value: string) => void,
    search: string,
}

function SearchBox({ search, onSearch}: SearchBoxProps) {
   
   
    
    return (
        <input
            onChange={(event) => onSearch(event.target.value)}
            value={search}
  className={css.input}
  type="text"
  placeholder="Search notes"
 />

    )
}

export default SearchBox;