import axios from "axios";

const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/";
const geoCodingURL = "http://api.openweathermap.org/geo/1.0/direct";
const geocodingCache = {};
const weatherDataURL = "https://api.openweathermap.org/data/2.5/weather";
const iconWeatherURL = "https://openweathermap.org/img/wn/";

const getDetails = async () => {
  try {
    const response = await axios.get(`${baseURL}all`);
    const result = response.data;
    const country_details = result.map((country, i) => ({
      id: country.cca3,
      name: country.name.common,
      capital: country.capital?.[0] || "N/A",
      area: country.area,
      languages:
        country.languages && typeof country.languages === "object"
          ? Object.values(country.languages)
          : [],
      flag: country.flags.png,
    }));
    return country_details;
  } catch (error) {
    console.error("Error fetching country details:", error);
    throw error;
  }
};

const getGeoCodingData = async (capital) => {
  if (geocodingCache[capital]) {
    return geocodingCache[capital];
  }

  try {
    const response = await axios.get(` ${geoCodingURL}`, {
      params: {
        q: capital,
        limit: 1,
        appid: api_key,
      },
    });
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      geocodingCache[capital] = { lat, lon };
      return { lat, lon };
    } else {
      throw new Error(`No geocoding data found for capital: ${capital}`);
    }
  } catch (error) {
    console.log("Error fetching geocoding data");
  }
};

const getWeather = async (geoLocation) => {
  const { lat, lon } = geoLocation;
  try {
    const response = await axios.get(weatherDataURL, {
      params: {
        lat: lat,
        lon: lon,
        units: "metric",
        appid: api_key,
      },
    });
    const data = response.data;
    return {
      temp: data.main.temp,
      icon: `${iconWeatherURL}${data.weather[0].icon}@2x.png`,
      windSpeed: data.wind.speed,
    };
  } catch (error) {
    console.log("Error fetching weather data");
  }
};

export default {
  getDetails,
  getGeoCodingData,
  getWeather,
};
