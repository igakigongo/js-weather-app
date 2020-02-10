import * as ApiConfig from './config';

export const getCurrentWeather = async (location) => {
  if (!location) throw Error('please provide a valid location');
  const response = await fetch(`${ApiConfig.apiUrl}?q=${location}&appid=${ApiConfig.apiKey}`);
  const { status } = response;
  switch (status) {
    case 200:
    {
      const json = await response.json();
      const { main, description, icon } = json.weather[0];
      const { main: { humidity, pressure, temp } } = json;
      return {
        humidity, pressure, temp, main, description, icon,
      };
    }

    default:
    {
      const { cod, message } = await response.json();
      const msg = message.replace(/city/, `The city ${location.toLowerCase()} was`);
      throw Error(`${cod}: ${msg}`);
    }
  }
};

export const convertTemperature = (tempInKelvin, tempFormat) => {
  switch (tempFormat) {
    case 'c':
    {
      return tempInKelvin - 273.15;
    }
    case 'f':
    {
      return (tempInKelvin - 273.15) * (9 / 5) + 32;
    }
    default:
    {
      return tempInKelvin;
    }
  }
};
