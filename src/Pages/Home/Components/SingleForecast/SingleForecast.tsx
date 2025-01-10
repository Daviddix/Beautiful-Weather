import "./SingleForecast.css"
interface ISingleForecastProps {
  day : string,
  temp : number
}

function SingleForecast({day, temp} : ISingleForecastProps) {
  return (
    <div className="day">
              <p>{day}</p>
              <h2>{temp.toFixed()}º</h2>
    </div>
  )
}

export default SingleForecast