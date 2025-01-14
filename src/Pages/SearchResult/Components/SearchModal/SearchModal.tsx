import SearchResultsContainer from "../SearchResultsContainer/SearchResultsContainer"
import searchIcon from "../../../../assets/icons/search-icon.svg"
import "./SearchModal.css"
import { useRef, useState } from "react"
import WeatherResultsLoader from "../../../Home/Components/Loaders/WeatherResultsLoader/WeatherResultsLoader"
import SearchResultError from "../../../Home/Components/ErrorComponents/SearchResultError/SearchResultError"

interface ISearchResult {
  country: string,
  state: string,
  shortDescription: string,
  longDescription: string,
  degree: number,
}

function SearchModal({setShowSearchModal} : SearchModalProps) {
  const [searchInput, setSearchInput] = useState("")
  const [searchResult, setSearchResult] = useState<ISearchResult | null>(null)
  const [searchState, setSearchState] = useState("completed")
  function closeModal(e : ElementEvent){
    setShowSearchModal(false)
  }

  let timerId = useRef<any>(null);

  async function innerFetch(searchParam: string) {
    try {
      const rawFetch = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchParam}&units=metric&appid=5df3b8dda637f8873722662b50a8a9c1`
      );
  
      if (!rawFetch.ok) {
        throw new Error("server error");
      }
      const response = await rawFetch.json();
  
      const newMainWeatherInfo = {
        country: response.sys.country,
        state: response.name,
        shortDescription: response.weather[0].main,
        longDescription: response.weather[0].description,
        degree: response.main.temp,
      };
  
      setSearchResult(newMainWeatherInfo);
      setSearchState("completed");
    } catch (err) {
      console.error(err);
      setSearchState("error");
    }
  }
  
  
   async function searchForWeatherDebounced(input: string) {
    if(input.trim() == ""){
      if(timerId.current){
        clearTimeout(timerId.current)
      }
      setSearchState("completed")
      setSearchResult(null)
      return
    }
    setSearchState("searching")
    setSearchResult(null)
    try {
      if(timerId.current == null){
        timerId.current = setTimeout(async () => {
          await innerFetch(input)
        }, 2000);
      }else{
        clearTimeout(timerId.current)
          timerId.current = setTimeout(async () => {
             await innerFetch(input)
          }, 2000);
        }
    } catch (err) {
      console.error(err);
      setSearchState("error")
    }
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
          <form onSubmit={(e) => e.preventDefault()}>
              <button type="button">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_189_377)">
<path d="M10.2077 10.2083L12.8327 12.8333M11.666 6.41666C11.666 5.02427 11.1129 3.68891 10.1283 2.70435C9.14376 1.71978 7.8084 1.16666 6.41602 1.16666C5.02363 1.16666 3.68827 1.71978 2.70371 2.70435C1.71914 3.68891 1.16602 5.02427 1.16602 6.41666C1.16602 7.80904 1.71914 9.1444 2.70371 10.129C3.68827 11.1135 5.02363 11.6667 6.41602 11.6667C7.8084 11.6667 9.14376 11.1135 10.1283 10.129C11.1129 9.1444 11.666 7.80904 11.666 6.41666Z" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_189_377">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>
              </button>

              <input 
              onChange={(e)=>{
                setSearchInput(e.target.value)
                searchForWeatherDebounced(e.target.value)
              }}
              value={searchInput}
              placeholder="search for a country or city..." type="text" />
          </form>

          {
            searchState == "searching" &&  <WeatherResultsLoader/>
          }

          {
            searchState == "error" &&  <SearchResultError searchTerm={searchInput} />
          }

          {searchResult && <SearchResultsContainer 
          setShowSearchModal={setShowSearchModal}
          country={searchResult!.country} 
          state={searchResult!.state} 
          degree={searchResult!.degree} 
          shortDescription={searchResult!.shortDescription} 
          longDescription={searchResult!.longDescription} />}
        </div>
      </div>
  )
}

export default SearchModal