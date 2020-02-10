import * as ApiConfig from './config';

async function getCurrentWeather(location = 'london') {
  const response = await fetch(`${ApiConfig.apiUrl}?q=${location}&appid=${ApiConfig.apiKey}`);
  const json = await response.json();
  const weather = json.weather[0];
  const { main } = json;
  return { main, weather };
}

export default getCurrentWeather;
