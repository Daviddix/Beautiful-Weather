import searchIcon from "../../../../assets/icons/search-icon.svg";
import "./SearchButton.css"

function SearchButton({setShowSearchModal}:SearchButtonProps) {
  function showSearchModal(){
    setShowSearchModal(true)
  }
  return (
    <button
    onClick={showSearchModal}
    className="search">
            <img src={searchIcon} alt="search icon" className="search-icon" />
    </button>
  )
}

export default SearchButton