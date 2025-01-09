import plusIcon from "../../../../assets/icons/plus-icon.svg"
import "./PlusButton.css"

function PlusButton() {
  return (
    <button
    className="plus">
            <img src={plusIcon} alt="plus icon" className="plus-icon" />
    </button>
  )
}

export default PlusButton