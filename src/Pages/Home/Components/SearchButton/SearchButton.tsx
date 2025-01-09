import searchIcon from "../../../../assets/icons/search-icon.svg";
import "./SearchButton.css"

function SearchButton() {
  return (
    <button className="search">
            <img src={searchIcon} alt="search icon" className="search-icon" />
    </button>
  )
}

export default SearchButton