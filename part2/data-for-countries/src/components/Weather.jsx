const Weather = ({ weatherDetails }) => {
  return (
    <div>
      <p>Temperature: {weatherDetails.temp} Celsius</p>
      <img src={weatherDetails.icon} alt="weather" />
      <p>Wind: {weatherDetails.windSpeed} m/s</p>
    </div>
  );
};

export default Weather;
