import "./SearchResult.css";
import WeatherInfo from "./Components/WeatherInfo/WeatherInfo";
import OtherWeatherInfo from "./Components/OtherWeatherInfo/OtherWeatherInfo";
import SearchButton from "./Components/SearchButton/SearchButton";
import ForecastContainer from "./Components/ForecastContainer/ForecastContainer";
import SearchModal from "./Components/SearchModal/SearchModal";
import { useState } from "react";
import PlusButton from "./Components/PlusButton/PlusButton";
import { useParams } from "react-router-dom";
import BackButton from "./Components/BackButton/BackButton";

function SearchResult() {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const {name} = useParams()
  return (
    <main>
      <div className="main-weather-section">
        <div className="inner"> 
            <div className="search-plus">
              <div className="back">
           <BackButton />
              </div>
              
          <SearchButton setShowSearchModal={setShowSearchModal}/>
          <PlusButton />
            </div>

          <WeatherInfo />

          <OtherWeatherInfo />

        </div>
      </div>

      <div className="forecast-container">
        <div className="inner">
          <h1>5-day Forecast</h1>

          <ForecastContainer />

        </div>
      </div>

      {showSearchModal && <SearchModal setShowSearchModal={setShowSearchModal} />}
    </main>
  );
}

export default SearchResult;
