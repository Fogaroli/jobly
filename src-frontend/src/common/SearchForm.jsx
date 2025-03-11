import { useState } from "react";

/** Component to create a search box and return search text as props */
const SearchForm = ({search}) =>{
    const INITIALINPUT = {searchInput: ""}
    const [searchEntry, setSearchEntry] = useState(INITIALINPUT)

    const handleSubmit = (evt)=>{
        evt.preventDefault();
        search(searchEntry.searchInput);
    }

    const handleChange = (evt)=>{
        const {name, value} = evt.target
        setSearchEntry(old => ({...old, [name]:value}))
    }

    return (
      <>
        <form className="container input-group mt-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="searchInput"
            className="form-control"
            placeholder="Enter search term"
            aria-label="Search term"
            aria-describedby="button-search"
            value={searchEntry.searchInput}
            onChange={handleChange}
          />
          <button
            className="btn btn-secondary"
            type="submit"
            id="button-search"

          >
            Button
          </button>
        </form>
      </>
    );
}

export default SearchForm