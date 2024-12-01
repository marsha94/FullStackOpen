import Display from "./Display";

const Preview = ({
  filteredCountries,
  onShow,
  show,
  selectedCountry,
  weatherDetails,
}) => {
  const shouldDisplayList =
    Array.isArray(filteredCountries) &&
    filteredCountries.length > 1 &&
    filteredCountries.length <= 10;

  return (
    <div>
      {shouldDisplayList
        ? filteredCountries.map((country) => (
            <div key={country.id}>
              {country.name}{" "}
              <button onClick={() => onShow(country.name, country.capital)}>
                show
              </button>
            </div>
          ))
        : null}
      {show ? (
        <Display country={selectedCountry} weatherDetails={weatherDetails} />
      ) : null}
    </div>
  );
};

export default Preview;
