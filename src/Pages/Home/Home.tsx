import "./Home.css";
import searchIcon from "../../assets/icons/search-icon.svg";
import windIcon from "../../assets/icons/wind-icon.svg";
import pressureIcon from "../../assets/icons/pressure-icon.svg";
import humidityIcon from "../../assets/icons/humidity-icon.svg";
import WeatherInfo from "./Components/WeatherInfo/WeatherInfo";

function Home() {
  return (
    <main>
      <div className="main-weather-section">
        <div className="inner">
          <img src={searchIcon} alt="search icon" className="search-icon" />

          <WeatherInfo />

          <div className="other-weather-info">
            <div>
              <div className="icon-container">
                <img src={windIcon} alt="wind icon" />
              </div>
              <h3>Wind</h3>
              <p>350 p/h</p>
            </div>

            <div>
              <div className="icon-container">
                <img src={pressureIcon} alt="pressure icon" />
              </div>
              <h3>Pressure</h3>
              <p>23 pphr</p>
            </div>

            <div>
              <div className="icon-container">
                <img src={humidityIcon} alt="humidity icon" />
              </div>
              <h3>Humidity</h3>
              <p>23 p/h</p>
            </div>
          </div>
        </div>
      </div>

      <div className="forecast-container">
        <div className="inner">
          <h1>5-day Forecast</h1>

          <div className="all-days-container">
            <div className="day">
              <p>Monday</p>
              <h2>23º</h2>
            </div>

            <div className="day">
              <p>Monday</p>
              <h2>23º</h2>
            </div>

            <div className="day">
              <p>Tuesday</p>
              <h2>23º</h2>
            </div>

            <div className="day">
              <p>Wednesday</p>
              <h2>23º</h2>
            </div>

            <div className="day">
              <p>Wednesday</p>
              <h2>23º</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
