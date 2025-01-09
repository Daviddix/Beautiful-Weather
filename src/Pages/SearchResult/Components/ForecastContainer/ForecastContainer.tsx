import SingleForecast from "../SingleForecast/SingleForecast"
import "./ForecastContainer.css"

function ForecastContainer() {
  return (
    <div className="all-days-container">
        <SingleForecast />        
        <SingleForecast />        
        <SingleForecast />        
        <SingleForecast />        
        <SingleForecast />        
    </div>
  )
}

export default ForecastContainer