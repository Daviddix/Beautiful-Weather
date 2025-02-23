import "./BackButton.css"

interface buttonProps {
  goBack : Function
}

function BackButton({goBack} : buttonProps) {
  return (
    <button
    onClick={()=>{
      goBack()
    }}
    className="back">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 6s-6 4.419-6 6s6 6 6 6" color="currentColor"/></svg>
    </button>
  )
}

export default BackButton