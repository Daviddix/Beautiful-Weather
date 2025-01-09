import SearchResultsContainer from "../SearchResultsContainer/SearchResultsContainer"
import searchIcon from "../../../../assets/icons/search-icon.svg"
import "./SearchModal.css"

function SearchModal({setShowSearchModal} : SearchModalProps) {
  function closeModal(e : ElementEvent){
    setShowSearchModal(false)
  }

  return (
    <div 
    onClick={(e)=>{
      closeModal(e)
    }}
    className="search-modal overlay">

        <div 
        onClick={(e)=>{
          e.stopPropagation()
        }}
        className="modal">
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