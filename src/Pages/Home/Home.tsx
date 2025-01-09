import "./Home.css";
import WeatherInfo from "./Components/WeatherInfo/WeatherInfo";
import OtherWeatherInfo from "./Components/OtherWeatherInfo/OtherWeatherInfo";
import SearchButton from "./Components/SearchButton/SearchButton";
import ForecastContainer from "./Components/ForecastContainer/ForecastContainer";
import SearchModal from "./Components/SearchModal/SearchModal";
import { useState } from "react";
import AddedCountries from "./Components/AddedCountries/AddedCountries";

function Home() {
  const [showSearchModal, setShowSearchModal] = useState(false)
  return (
    <main>
      <div className="main-weather-section">
        <div className="inner">
          <SearchButton setShowSearchModal={setShowSearchModal}/>

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

      <AddedCountries />
    </main>
  );
}

export default Home;
