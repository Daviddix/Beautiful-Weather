import plusIcon from "../../../../assets/icons/plus-icon.svg"
import "./PlusButton.css"

type AddedCountriesArray = string[]

interface PlusButtonProps {
  allAddedCountries : string[],
  setAllAddedCountries :  React.Dispatch<React.SetStateAction<AddedCountriesArray>>,
  state : string | undefined
}

function PlusButton({allAddedCountries, setAllAddedCountries, state} : PlusButtonProps) {
  async function saveCountry(){
    try{
      if(state){
        const previousCountries = allAddedCountries
        if(previousCountries.length < 5){
          previousCountries.push(state)
          setAllAddedCountries(previousCountries)
          await chrome.storage.local.set({addedCountries : previousCountries})
        }
      }

    }catch(err){
      console.log(err)
    }
  }
  return (
    <button
    onClick={saveCountry}
    className="plus">
            <img src={plusIcon} alt="plus icon" className="plus-icon" />
    </button>
  )
}

export default PlusButton