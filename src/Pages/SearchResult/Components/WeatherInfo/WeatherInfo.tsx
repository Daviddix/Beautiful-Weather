import "./WeatherInfo.css"
interface WeatherInfoProps {
  country : string,
   state : string,
    shortDescription : string,
     longDescription : string,
      degree : number,
}

function WeatherInfo({country, degree, longDescription, state, shortDescription} : WeatherInfoProps) {
  return (
    <div className="weather-details">
            <p>{country}, {state}</p>
            <h1>{degree.toFixed()}º</h1>
            <p>{shortDescription}, {longDescription}</p>
          </div>
  )
}

export default WeatherInfo