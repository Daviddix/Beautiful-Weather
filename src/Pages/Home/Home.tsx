import "./Home.css";
import WeatherInfo from "./Components/WeatherInfo/WeatherInfo";
import OtherWeatherInfo from "./Components/OtherWeatherInfo/OtherWeatherInfo";
import SearchButton from "./Components/SearchButton/SearchButton";
import ForecastContainer from "./Components/ForecastContainer/ForecastContainer";
import SearchModal from "./Components/SearchModal/SearchModal";
import { useEffect, useState } from "react";
import AddedCountries from "./Components/AddedCountries/AddedCountries";
import HomeSkeletonLoader from "./Components/Loaders/HomeSkeletonLoader/HomeSkeletonLoader";
import ForecastSkeleton from "./Components/Loaders/ForecastSkeleton/ForecastSkeleton";
import HomepageError from "./Components/ErrorComponents/HomepageError/HomepageError";

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

interface locationInfo {
  status : "success" | "failure",
  longitude? : number,
  latitude? : number,
  errorMessage ? : string
}

type AddedCountriesArray = string[]

interface HomeProps {
  allAddedCountries : string[],
  setAllAddedCountries :  React.Dispatch<React.SetStateAction<AddedCountriesArray>>
}

function Home({allAddedCountries, setAllAddedCountries} : HomeProps) {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [mainWeatherInfo, setMainWeatherInfo] = useState<MainWeatherInfoProps | null>(null)
  const [subWeatherInfo, setSubWeatherInfo] = useState<SubWeatherInfoProps | null>(null)
  const [componentState, setComponentState] = useState(ComponentStates.loading)
  const [userLocationInfo, setUserLocationInfo] = useState<locationInfo | null>(null)
  const [colorClassName, setColorClassName] = useState<color>("")
  const [activeCountry, setActiveCountry] = useState("")
  const [refreshCountry, setRefreshCountry] = useState(0)

  useEffect(() => {
    requestUserLocation(successfulPosition, failedPosition)
  }, [])

  useEffect(() =>{
    if(refreshCountry == 0){
      return
    }
    getWeatherInformationForSavedCountry(activeCountry)
    setRefreshCountry(0)
  }, [refreshCountry])

  async function getWeatherInformationForSavedCountry(countryName : string){
    setComponentState(ComponentStates.loading)
    try {
      const rawFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&units=metric&appid=5df3b8dda637f8873722662b50a8a9c1`)
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
      setUserLocationInfo({status : "success", longitude : response.coord.lon, latitude : response.coord.lat})
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

  async function fetchWeatherInformation(long:number, lat:number) {
    try {
      const rawFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&exclude={part}&appid=5df3b8dda637f8873722662b50a8a9c1`)
      const response = await rawFetch.json()

      const newMainWeatherInfo : MainWeatherInfoProps = {
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
      setActiveCountry(newMainWeatherInfo.state)
      setComponentState(ComponentStates.completed)
      await handleChromeStorageForAddedCountries(newMainWeatherInfo.state)

      if (!rawFetch.ok) {
        throw new Error("Server error")
      }
    }
    catch (err) {
      setComponentState(ComponentStates.error)
      console.log(err)
    }
  }

  async function requestUserLocation(successFn : PositionCallback, failedFn : PositionErrorCallback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFn, failedFn, {enableHighAccuracy : true});
    } else {
      return {
        status : "failure",
        errorMessage : "Geolocation is not supported by this browser."
      }
    }
  }

  async function handleChromeStorageForAddedCountries(mainCountryName : string){
    const allAddedCountries = await chrome.storage.local.get("addedCountries")
    if(!allAddedCountries.addedCountries){
      await chrome.storage.local.set({addedCountries : [mainCountryName]})
      setAllAddedCountries([mainCountryName])
      return
    }else{
      const addedCountriesFromStorage = allAddedCountries.addedCountries
      setAllAddedCountries(addedCountriesFromStorage)
    }
  }

  function successfulPosition(pos : GeolocationPosition){
    const cord = pos.coords 
    const long = cord.longitude
    const lat = cord.latitude
    setUserLocationInfo({status : "success", longitude : long, latitude : lat})
    fetchWeatherInformation(long, lat)
  }

  function failedPosition(error : GeolocationPositionError) {
    let errorMessage 
    switch (error.code) {
      case error.PERMISSION_DENIED:
          errorMessage = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable."
        break;
      case error.TIMEOUT:
          errorMessage = "The request to get user location timed out."
        break;
    }

    const l : locationInfo = {
    status : "failure",
    errorMessage : errorMessage
  }

  setUserLocationInfo(l)
  } 
  

  if(componentState == ComponentStates.loading){
    return (
      <>
    <HomeSkeletonLoader />
     </>
    )
  }else if(componentState == ComponentStates.error){
    return <HomepageError />
  }else{
    return (
      <main className={colorClassName}>
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
            <ForecastContainer
            long={userLocationInfo!.longitude}
            lat={userLocationInfo!.latitude}
            />
          </div>
        </div>
  
        {showSearchModal && <SearchModal setShowSearchModal={setShowSearchModal} />}
  
        <AddedCountries 
        activeCountry={activeCountry}
        setRefreshCountry={setRefreshCountry}
        setActiveCountry={setActiveCountry}
        setAllAddedCountries={setAllAddedCountries}
        allAddedCountries={allAddedCountries} />
      </main>
    );
  }

  
  }

export default Home;
