import Country from "./Country";
import Weather from "./Weather";

const Display = ({ country, weatherDetails }) => {
  return (
    <div>
      <Country country={country} />
      <h2>Weather in {country.capital}</h2>
      <Weather weatherDetails={weatherDetails} />
    </div>
  );
};
export default Display;
