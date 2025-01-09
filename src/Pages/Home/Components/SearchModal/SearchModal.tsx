import SearchResultsContainer from "../SearchResultsContainer/SearchResultsContainer"
import searchIcon from "../../../../assets/icons/search-icon.svg"
import "./SearchModal.css"

function SearchModal() {
  return (
    <div className="search-modal overlay">
        <div className="modal">
          <form>
              <button type="button">
                <img src={searchIcon} alt="search" />
              </button>

              <input placeholder="search for a country or city..." type="text" />
          </form>

          <SearchResultsContainer />
        </div>
      </div>
  )
}

export default SearchModal