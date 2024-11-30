import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import services from "./services/countryServices";
import Preview from "./components/Preview";
import Display from "./components/Display";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountryName, setSearchCountryName] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [filterCountries, setFilterCountries] = useState([]);
  const [weatherDetails, setWeatherDetails] = useState({});

  const handleFilterNames = (event) => {
    setSearchCountryName(event.target.value.toLowerCase());
  };

  const handleShow = (name) => {
    const country = filterCountries.find((country) => country.name === name);
    setSelectedCountry(country);
    setIsShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await services.getDetails();
        setCountries(data);
      } catch (error) {
        console.log("Unable to load country data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered =
      searchCountryName.length > 0
        ? countries.filter((country) =>
            country.name.toLowerCase().includes(searchCountryName)
          )
        : [];

    if (filtered.length === 1) {
      setSelectedCountry(filtered[0]);
    }

    if (isShow === false && filtered.length !== 1) {
      setSelectedCountry({});
    }

    setIsShow(false);
    setFilterCountries(filtered);
  }, [searchCountryName]);

  useEffect(() => {
    const fetchingData = async () => {
      if (Object.keys(selectedCountry).length === 0) return;
      const capital = selectedCountry.capital;

      try {
        const coordinates = await services.getGeoCodingData(capital);
        const weather = await services.getWeather(coordinates);
        setWeatherDetails(weather);
      } catch (error) {
        console.log("Error getting data", error);
      }
    };
    fetchingData();
  }, [isShow, filterCountries]);

  return (
    <>
      <Filter onFilter={handleFilterNames} name={searchCountryName} />
      <Preview
        filteredCountries={filterCountries}
        onShow={handleShow}
        show={isShow}
        selectedCountry={selectedCountry}
        weatherDetails={weatherDetails}
      />
      {filterCountries && filterCountries.length === 1 ? (
        <Display country={selectedCountry} weatherDetails={weatherDetails} />
      ) : null}
    </>
  );
};

export default App;
