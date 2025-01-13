import "./Home.css";
import WeatherInfo from "./Components/WeatherInfo/WeatherInfo";
import OtherWeatherInfo from "./Components/OtherWeatherInfo/OtherWeatherInfo";
import SearchButton from "./Components/SearchButton/SearchButton";
import ForecastContainer from "./Components/ForecastContainer/ForecastContainer";
import SearchModal from "./Components/SearchModal/SearchModal";
import { useEffect, useState } from "react";
import AddedCountries from "./Components/AddedCountries/AddedCountries";
import HomeSkeletonLoader from "./Components/HomeSkeletonLoader/HomeSkeletonLoader";

enum ComponentStates {
  loading = "loading",
  completed = "completed",
  error = "error"
}

interface MainWeatherInfoProps {
  country: string,
  state: string,
  shortDescription: string,
  longDescription: string,
  degree: number,
}

interface SubWeatherInfoProps {
  wind: number,
  pressure: number,
  humidity: number,
}

function Home() {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [mainWeatherInfo, setMainWeatherInfo] = useState<MainWeatherInfoProps | null>(null)
  const [subWeatherInfo, setSubWeatherInfo] = useState<SubWeatherInfoProps | null>(null)
  const [componentState, setComponentState] = useState(ComponentStates.loading)

  useEffect(() => {
    fetchWeatherInformation()
  }, [])

  async function fetchWeatherInformation() {
    try {
      const rawFetch = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=37.7749&lon=-122.4194&units=metric&exclude={part}&appid=5df3b8dda637f8873722662b50a8a9c1")
      const response = await rawFetch.json()

      const newMainWeatherInfo = {
        country: response.sys.country,
        state: response.name,
        shortDescription: response.weather[0].main,
        longDescription: response.weather[0].description,
        degree: response.main.temp,
      }

      const newSubWeatherInfo = {
        wind: response.wind.speed,
        pressure: response.main.pressure,
        humidity: response.main.humidity,
      }

      setMainWeatherInfo(newMainWeatherInfo)
      setSubWeatherInfo(newSubWeatherInfo)
      setComponentState(ComponentStates.completed)

      if (!rawFetch.ok) {
        throw new Error("Server error")
      }
    }
    catch (err) {
      setComponentState(ComponentStates.error)
      console.log(err)
    }
  }

  if(componentState == ComponentStates.loading){
    return <HomeSkeletonLoader />
  }else if(componentState == ComponentStates.error){
    return <h1>Error</h1>
  }else{
    return (
      <main>
        <div className="main-weather-section">
          <div className="inner">
            <SearchButton setShowSearchModal={setShowSearchModal} />
  
            <WeatherInfo
              country={mainWeatherInfo!.country}
              degree={mainWeatherInfo!.degree}
              longDescription={mainWeatherInfo!.longDescription}
              state={mainWeatherInfo!.state}
              shortDescription={mainWeatherInfo!.shortDescription} />
  
            <OtherWeatherInfo
              wind={subWeatherInfo!.wind}
              pressure={subWeatherInfo!.pressure}
              humidity={subWeatherInfo!.humidity} />
  
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

  
}

export default Home;
