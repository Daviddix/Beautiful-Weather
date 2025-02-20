import "./SearchButton.css"

function SearchButton({ setShowSearchModal }: SearchButtonProps) {
  function showSearchModal() {
    setShowSearchModal(true)
  }
  return (
    <button
      onClick={showSearchModal}
      className="search">
      <svg className="search-icon" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_189_377)">
          <path d="M10.2077 10.2083L12.8327 12.8333M11.666 6.41666C11.666 5.02427 11.1129 3.68891 10.1283 2.70435C9.14376 1.71978 7.8084 1.16666 6.41602 1.16666C5.02363 1.16666 3.68827 1.71978 2.70371 2.70435C1.71914 3.68891 1.16602 5.02427 1.16602 6.41666C1.16602 7.80904 1.71914 9.1444 2.70371 10.129C3.68827 11.1135 5.02363 11.6667 6.41602 11.6667C7.8084 11.6667 9.14376 11.1135 10.1283 10.129C11.1129 9.1444 11.666 7.80904 11.666 6.41666Z" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_189_377">
            <rect width="14" height="14" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  )
}

export default SearchButton