import SearchResultsContainer from "../SearchResultsContainer/SearchResultsContainer"
import searchIcon from "../../../../assets/icons/search-icon.svg"
import "./SearchModal.css"
import { useRef, useState } from "react"
import WeatherResultsLoader from "../Loaders/WeatherResultsLoader/WeatherResultsLoader"

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
        `https://api.openweathermap.org/data/2.5/weather?q=${searchParam}&units=metric&limit=3&appid=5df3b8dda637f8873722662b50a8a9c1`
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
                <img src={searchIcon} alt="search" />
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
            searchState == "error" &&  <h1>Error</h1>
          }

          {searchResult && <SearchResultsContainer 
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