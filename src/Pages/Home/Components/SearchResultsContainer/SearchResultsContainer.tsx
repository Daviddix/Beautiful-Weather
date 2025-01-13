import { useNavigate } from "react-router-dom";
import "./SearchResultsContainer.css";

interface SearchResultContainerProps {
  country: string,
  state: string,
  shortDescription: string,
  longDescription: string,
  degree: number,
}

function SearchResultsContainer({country, state, shortDescription, longDescription, degree} : SearchResultContainerProps) {
  const navigate = useNavigate()

  function navigateToPage(name : string){
    navigate(`/search/${name}`)
  }

  return (
    <div className="results-container">
      <button
      onClick={()=>{
        navigateToPage(state)
      }}
      >
      <div className="result">
        <h1>{degree.toFixed()}º</h1>
        <div className="other-info">
          <p>{state}, {country}</p>
          <p>{shortDescription}, {longDescription}</p>
        </div>
      </div>
      </button>
    </div>
  )

}

export default SearchResultsContainer;
