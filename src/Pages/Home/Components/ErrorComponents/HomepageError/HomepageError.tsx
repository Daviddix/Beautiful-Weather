import "./HomepageError.css"

interface HomepageErrorProps {
  isNight : boolean
}

function HomepageError({isNight} : HomepageErrorProps) {
  return (
    <main className="homepage-error"  id={isNight? "night" : ""}>
        <h1>An Error Occurred</h1>
        <p>Seems like an error occurred when trying to load the homepage, please close the extension and try again. If the error persists, contact the developer : <a className="active" href="mailto:en56434@gmail.com">Email Developer</a> </p>
    </main>
  )
}

export default HomepageError