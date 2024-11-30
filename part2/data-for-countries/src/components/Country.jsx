const Country = ({ country }) => {
  const { name, capital, area, languages, flag } = country;

  return (
    <>
      <h1>{name}</h1>
      <div>Capital: {capital}</div>
      <div>Area: {area}</div>
      <h2>Languages</h2>
      {languages && languages.length > 0 ? (
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      ) : (
        <p>None</p>
      )}
      <img src={flag} alt={`flag of ${name}`} />
    </>
  );
};

export default Country;
