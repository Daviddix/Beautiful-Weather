import windIcon from "../../../../assets/icons/wind-icon.svg";
import pressureIcon from "../../../../assets/icons/pressure-icon.svg";
import humidityIcon from "../../../../assets/icons/humidity-icon.svg";
import "./OtherWeatherInfo.css"

interface WeatherInfoProps {
  wind : number,
   pressure : number,
    humidity : number,
}

function OtherWeatherInfo({wind, pressure, humidity} : WeatherInfoProps) {
  return (
    <div className="other-weather-info">
            <div>
              <div className="icon-container">
                <img src={windIcon} alt="wind icon" />
              </div>
              <h3>Wind</h3>
              <p>{wind} m/s</p>
            </div>

            <div>
              <div className="icon-container">
                <img src={pressureIcon} alt="pressure icon" />
              </div>
              <h3>Pressure</h3>
              <p>{pressure} hPa</p>
            </div>

            <div>
              <div className="icon-container">
                <img src={humidityIcon} alt="humidity icon" />
              </div>
              <h3>Humidity</h3>
              <p>{humidity}%</p>
            </div>
          </div>
  )
}

export default OtherWeatherInfo