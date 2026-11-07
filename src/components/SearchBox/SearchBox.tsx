import css from "./SearchBox.module.css";
import toast from "react-hot-toast";

interface SearchBoxProps {
    onSearch: (value: string) => void,
    search: string,
}

function SearchBox({ search, onSearch}: SearchBoxProps) {
   
    if (search === "")
            toast.error("Please enter your search query.")
    
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