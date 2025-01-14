import "./OtherWeatherInfo.css";

interface WeatherInfoProps {
  wind: number;
  pressure: number;
  humidity: number;
}

function OtherWeatherInfo({ wind, pressure, humidity }: WeatherInfoProps) {
  return (
    <div className="other-weather-info">
      <div>
        <div className="icon-container">
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 2.9705C2.75 4.6865 5.288 3.951 5.866 2.9705C5.951 2.8265 6 2.659 6 2.4805C6 1.939 5.5525 1.5 5 1.5C4.4475 1.5 4 1.939 4 2.4805M8.5 4.464C8.5 3.6555 9.06 3 9.75 3C10.44 3 11 3.6555 11 4.464C11.003 4.80065 10.9007 5.12983 10.7075 5.4055C9.673 7.0955 4.638 6.458 2 5.928M6.5425 9.9435C6.6455 10.268 6.9235 10.5 7.25 10.5C7.664 10.5 8 10.1265 8 9.6655C8 9.509 7.961 9.362 7.8935 9.237C7.25 7.996 4 7.162 1 9.387M9.5 7.75H10.5"
              stroke="url(#paint0_linear_196_206)"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_196_206"
                x1="11.0001"
                y1="6"
                x2="1"
                y2="6"
                gradientUnits="userSpaceOnUse"
              >
                <stop />
                <stop offset="1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h3>Wind</h3>
        <p>{wind} m/s</p>
      </div>

      <div>
        <div className="icon-container">
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_196_210)">
              <path
                d="M8.8685 3.1315L10.75 1.25M8.8685 3.1315C8.6485 2.9115 8.7915 2.0105 8.8485 1.5M8.8685 3.1315C9.0885 3.3515 9.9895 3.2085 10.5 3.1515M3.1315 8.8685L1.25 10.75M3.1315 8.8685C2.9115 8.6485 2.0105 8.7915 1.5 8.8485M3.1315 8.8685C3.3515 9.0885 3.2085 9.9895 3.1515 10.5M8.8685 8.8685L10.75 10.75M8.8685 8.8685C9.0885 8.6485 9.9895 8.7915 10.5 8.8485M8.8685 8.8685C8.6485 9.0885 8.7915 9.9895 8.8485 10.5M3.1315 3.1315L1.25 1.25M3.1315 3.1315C3.3515 2.9115 3.2085 2.0105 3.1515 1.5M3.1315 3.1315C2.9115 3.3515 2.0105 3.2085 1.5 3.1515M6 3.5C5.33696 3.5 4.70107 3.76339 4.23223 4.23223C3.76339 4.70107 3.5 5.33696 3.5 6C3.5 6.66304 3.76339 7.29893 4.23223 7.76777C4.70107 8.23661 5.33696 8.5 6 8.5C6.66304 8.5 7.29893 8.23661 7.76777 7.76777C8.23661 7.29893 8.5 6.66304 8.5 6C8.5 5.33696 8.23661 4.70107 7.76777 4.23223C7.29893 3.76339 6.66304 3.5 6 3.5Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_196_210">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h3>Pressure</h3>
        <p>{pressure} hPa</p>
      </div>

      <div>
        <div className="icon-container">
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.99956 8.91953C1.99956 8.36609 1.38061 6.98366 2.00003 6.5C2.55131 6.06954 4.31022 6.52407 4.86732 6.24307C5.17116 6.08715 5.57755 6.5 6 6.5C6.42245 6.5 6.69619 7.34407 7.00003 7.5C8.18262 8.09699 10 6.95402 10 8C10 9.02548 8.48473 11 5.99956 11C3.51438 11 1.99956 9.94501 1.99956 8.91953Z"
              fill="#338EFF"
            />
            <path
              d="M1.75 6.839C1.75 4.747 3.54 2.6795 4.797 1.486C5.11983 1.17415 5.55114 0.999847 6 0.999847C6.44886 0.999847 6.88017 1.17415 7.203 1.486C8.4595 2.68 10.25 4.747 10.25 6.839C10.25 8.89 8.6405 11 6 11C3.3595 11 1.75 8.89 1.75 6.839Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 6.142C2.7325 5.915 4.196 5.842 5.992 6.851C7.785 7.858 9.258 7.499 10 7.0675"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h3>Humidity</h3>
        <p>{humidity}%</p>
      </div>
    </div>
  );
}

export default OtherWeatherInfo;
