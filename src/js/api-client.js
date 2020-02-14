import * as ApiConfig from './config';

const getCurrentWeather = async (location, units = 'metric') => {
  if (!location) throw new Error('please provide a valid location');
  const response = await fetch(`${window.location.protocol}//${ApiConfig.apiUrl}?q=${location}&units=${units}&appid=${ApiConfig.apiKey}`);
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
      throw new Error(`${cod}: ${msg}`);
    }
  }
};

export default getCurrentWeather;

// export const convertTemperature = (tempInKelvin, tempFormat) => {
//   switch (tempFormat) {
//     case 'c':
//     {
//       return tempInKelvin - 273.15;
//     }
//     case 'f':
//     {
//       return (tempInKelvin - 273.15) * (9 / 5) + 32;
//     }
//     default:
//     {
//       return tempInKelvin;
//     }
//   }
// };
