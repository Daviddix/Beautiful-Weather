import ForecastSkeleton from "../ForecastSkeleton/ForecastSkeleton"
import "./HomeSkeletonLoader.css"

function HomeSkeletonLoader() {
  return (
    <main >
        <div className="main-weather-section">
          <div className="inner fake">
          <div className="weather-details">
            <div className="fake-p"></div>
            <div className="fake-h1"></div>
            <div className="fake-p"></div>
          </div>

          <div className="other-weather-info">
            <div>
              <div className="fake-circle"></div>
              <div className="fake-circle-heading"></div>
              <div className="fake-circle-desc"></div>
            </div>

            <div>
              <div className="fake-circle"></div>
              <div className="fake-circle-heading"></div>
              <div className="fake-circle-desc"></div>
            </div>

            <div>
              <div className="fake-circle"></div>
              <div className="fake-circle-heading"></div>
              <div className="fake-circle-desc"></div>
            </div>
          </div>
          </div>
        </div>
  
        <div className="forecast-container">
          <div className="inner">
          <ForecastSkeleton />

  
          </div>
        </div>
      </main>

  )
}

export default HomeSkeletonLoader