import "./Home.css";
import WeatherInfo from "./Components/WeatherInfo/WeatherInfo";
import OtherWeatherInfo from "./Components/OtherWeatherInfo/OtherWeatherInfo";
import SearchButton from "./Components/SearchButton/SearchButton";
import ForecastContainer from "./Components/ForecastContainer/ForecastContainer";

function Home() {
  return (
    <main>
      <div className="main-weather-section">
        <div className="inner">
          <SearchButton />

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
    </main>
  );
}

export default Home;
