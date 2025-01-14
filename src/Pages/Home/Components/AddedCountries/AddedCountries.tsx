import "./AddedCountries.css"
import {useState} from "react"

interface addedCountriesProps {
  allAddedCountries : string[],
  activeCountry : string,
  setActiveCountry :  React.Dispatch<React.SetStateAction<string>>,
  setRefreshCountry :  React.Dispatch<React.SetStateAction<number>>
}

function AddedCountries({allAddedCountries, activeCountry, setActiveCountry, setRefreshCountry} : addedCountriesProps) {

  function makeMeActive(name : string){
    if(activeCountry == name){
      return
    }
    setActiveCountry(name)
    setRefreshCountry(1)
  }

  const mappedCountries = allAddedCountries.map((country)=>{
    return (
    <button
    onClick={()=>{
      makeMeActive(country)
    }}
    >
    <p className={activeCountry == country ? "active" : ""}>{country}</p>
    </button>)
  })
  return (
    <div className="added-countries">
        <div className="inner">
        {mappedCountries}
        </div>
      </div>
  )
}

export default AddedCountries