import { useEffect, useState } from "react";
import SingleForecast from "../SingleForecast/SingleForecast"
import "./ForecastContainer.css"
import { useParams } from "react-router-dom";

interface IWeatherForecastData {
  day : string,
  temp : number,
}


interface IWeatherForecastDataObj {
  day : string,
  temp : number,
   main : {
    temp : number
  },
  dt_txt : Date
}

function ForecastContainer() {
  const [forecastData, setForecastData] = useState<IWeatherForecastData[]>([])
  const {state} = useParams()
  console.log(state)

  async function fetchForecastData() {
    try {
      const rawFetch = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${state}&units=metric&appid=5df3b8dda637f8873722662b50a8a9c1`
      );

      if (!rawFetch.ok) {
        throw new Error("Server error");
      }

      const { list } = await rawFetch.json();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let uniqueDays : string[] = []
      let uniqueDaysArray : IWeatherForecastData[] = []

      list.forEach((dateObj: IWeatherForecastDataObj) => {
        const parsedDate = new Date(dateObj.dt_txt).getUTCDay();

        const dayOfTheWeek = days[parsedDate];
        
        dateObj.day = dayOfTheWeek;

         const currentItemDay = dateObj.day
        if (uniqueDays.includes(currentItemDay)) {
          return
        } else {
          const usefulData =  {
            day : dateObj.day,
            temp : dateObj.main.temp
          }
          uniqueDaysArray.push(usefulData)
          uniqueDays.push(currentItemDay)
        }

      });

      uniqueDaysArray.shift()

      setForecastData(uniqueDaysArray)
    } catch (err) {
      console.error(err);
    }
  } 

  useEffect(() => {
    fetchForecastData()
  }, [])

  const mappedForecast = forecastData.map(({day, temp})=>{
    return <SingleForecast key={day} day={day} temp={temp} />
  })

  return (
    <div className="all-days-container">
      {mappedForecast}
    </div>
  )
}

export default ForecastContainer