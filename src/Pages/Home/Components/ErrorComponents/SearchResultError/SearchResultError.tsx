import "./SearchResultError.css"

function SearchResultError({searchTerm} : {searchTerm : string}) {
  return (
    <div className="search-error-container">
        <p>Cannot Find weather for <span>"{searchTerm}"</span></p>
    </div>
  )
}

export default SearchResultError