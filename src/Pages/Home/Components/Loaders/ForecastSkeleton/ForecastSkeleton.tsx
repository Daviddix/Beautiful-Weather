import "./ForecastSkeleton.css"

function ForecastSkeleton() {
  return (
    <>
    <div className="fake-h1-forecast"></div>

    <div className="all-days-container">
        <div className="day">
        <div className="fake-p"></div>
        <div className="fake-h1"></div>
        </div>

        <div className="day">
        <div className="fake-p"></div>
        <div className="fake-h1"></div>
        </div>

        <div className="day">
        <div className="fake-p"></div>
        <div className="fake-h1"></div>
        </div>

        <div className="day">
        <div className="fake-p"></div>
        <div className="fake-h1"></div>
        </div>

        <div className="day">
        <div className="fake-p"></div>
        <div className="fake-h1"></div>
        </div>
    </div>
    </>
  )
}

export default ForecastSkeleton