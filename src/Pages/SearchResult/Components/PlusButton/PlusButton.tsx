import { useEffect, useState } from "react"
import "./PlusButton.css"

type AddedCountriesArray = string[]

interface PlusButtonProps {
  allAddedCountries : string[],
  setAllAddedCountries :  React.Dispatch<React.SetStateAction<AddedCountriesArray>>,
  state : string | undefined
}

function PlusButton({allAddedCountries, setAllAddedCountries, state} : PlusButtonProps) {
  const [shouldDisplay, setShouldDisplay] = useState(false)
  async function saveCountry(){
    try{
      if(state){
        const previousCountries = allAddedCountries
        if(previousCountries.length < 4){
          previousCountries.push(state)
          setAllAddedCountries(previousCountries)
          await chrome.storage.local.set({addedCountries : previousCountries})
          setShouldDisplay(false)
        }else{
          alert("Sorry, You can't save more than 4 locations")
        }
      }

    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    checks()
  }, [])

  function checks(){
    const previousCountries = allAddedCountries
    if(!state) return
    if(previousCountries.includes(state)){
      setShouldDisplay(false)
    }else if(previousCountries.length == 4){
      setShouldDisplay(false)
    }else{
      setShouldDisplay(true)
    }
  }


    return (
      <button
      onClick={saveCountry}
      className={shouldDisplay ? "plus" : "plus hidden"}>
        <svg className="plus-icon" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.00065 2.33334V11.6667M11.6673 7.00001H2.33398" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
      </button>
    )
  
}

export default PlusButton