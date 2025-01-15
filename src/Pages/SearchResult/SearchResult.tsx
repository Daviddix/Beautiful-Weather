import "./SearchResult.css";
import WeatherInfo from "./Components/WeatherInfo/WeatherInfo";
import OtherWeatherInfo from "./Components/OtherWeatherInfo/OtherWeatherInfo";
import SearchButton from "./Components/SearchButton/SearchButton";
import ForecastContainer from "./Components/ForecastContainer/ForecastContainer";
import SearchModal from "./Components/SearchModal/SearchModal";
import { useEffect, useState } from "react";
import PlusButton from "./Components/PlusButton/PlusButton";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "./Components/BackButton/BackButton";
import HomeSkeletonLoader from "../Home/Components/Loaders/HomeSkeletonLoader/HomeSkeletonLoader";

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

type color = "blue" | "red" | "" | "gray"

type AddedCountriesArray = string[]

interface SearchResultsProps {
  allAddedCountries : string[],
  setAllAddedCountries :  React.Dispatch<React.SetStateAction<AddedCountriesArray>>,
  isNight : boolean
}

function SearchResult({allAddedCountries, setAllAddedCountries, isNight} : SearchResultsProps) {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const {state} = useParams()
  const navigate = useNavigate()
  const [mainWeatherInfo, setMainWeatherInfo] = useState<MainWeatherInfoProps | null>(null)
  const [subWeatherInfo, setSubWeatherInfo] = useState<SubWeatherInfoProps | null>(null)
  const [componentState, setComponentState] = useState(ComponentStates.loading)
  const [colorClassName, setColorClassName] = useState<color>("")

  useEffect(()=>{
    fetchWeatherForState()
  }, [state])

  async function fetchWeatherForState(){
    setComponentState(ComponentStates.loading)
    try {
      const rawFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state}&units=metric&appid=5df3b8dda637f8873722662b50a8a9c1`)
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
      newMainWeatherInfo.degree <= 10 ? setColorClassName("blue") :  setColorClassName("red")
      newMainWeatherInfo.longDescription.toLowerCase().includes("rain") ? setColorClassName("gray") :  ""
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

  function goBack(){
    navigate(-1)
  }
 
  
  if(componentState == ComponentStates.loading){
    return <HomeSkeletonLoader page={"search"} isNight={isNight} />
  }else if(componentState == ComponentStates.error){
    return <h1>Error</h1>
  }else{
    return (
      <main className={colorClassName} id={isNight? "night" : ""}>
      <div className="main-weather-section">
        <div className="inner"> 
            <div className="search-plus">
              <div className="back">
           <BackButton
           goBack={goBack}
           />
              </div>
              
          <SearchButton setShowSearchModal={setShowSearchModal}/>

          <PlusButton
          state={state}
          allAddedCountries={allAddedCountries} 
          setAllAddedCountries={setAllAddedCountries}
          />
            </div>

          <WeatherInfo
           country={mainWeatherInfo!.country}
           degree={mainWeatherInfo!.degree}
           longDescription={mainWeatherInfo!.longDescription}
           state={mainWeatherInfo!.state}
           shortDescription={mainWeatherInfo!.shortDescription}
            />

          <OtherWeatherInfo
           wind={subWeatherInfo!.wind}
           pressure={subWeatherInfo!.pressure}
           humidity={subWeatherInfo!.humidity}
          />

        </div>
      </div>

      <div className="forecast-container">
        <div className="inner">
          <ForecastContainer />
        </div>
      </div>

      {showSearchModal && <SearchModal setShowSearchModal={setShowSearchModal} />}
    </main>
    );
  }
}

export default SearchResult;
