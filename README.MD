# Weather App with Vanilla JavaScript

This is a simple Weather App built using Vanilla JavaScript and one external dependency for country and city autocomplete. The app allows users to search for weather information for a specific country, view astrological data, and check the weekly weather forecast.

## Features

- **Country and City Autocomplete**

- **Current Weather Information**: Provides current weather data for the selected location, including temperature, weather conditions, and more.

- **Astronomical Data**: Displays astrological data, including sunrise and sunset times for the selected location.

- **Weekly Weather Forecast**: Shows a 7-day forecast for the selected location, including high and low temperatures, weather conditions, and humidity.

- **Small bundle size and hight load speed** 

## Getting Started

To get this weather app up and running, follow these steps:


1. **Open the Project Folder**:

   ```bash
   cd weather-app
   ```

2. **Create an API Key**:

   - You will need to obtain API keys for weather data. For example, you can get a free API key from [Weather Api](https://www.weatherapi.com/). Once you have an API key, replace "YOUR_API_KEY" with your actual key in the scripts/constants.mjs file.

3. **Serve the App**:

   ```bash
    pnpm i
    pnpm run build
    pnpm run start
   ```

5. **Search for Weather**:

   - Start typing the name of a country or city in the search box.
   - Choose a location from the autocomplete suggestions.
   - View the current weather, astrological data, and the weekly forecast for the selected location.

## Dependencies

- [toastify-js](https://www.npmjs.com/package/toastify-js) (for error message display)

## API Used

- [WeatherMap API](https://www.weatherapi.com/)


## Acknowledgments

- Weather data is provided by WeatherMap API.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Feel free to enhance and customize this Weather App according to your needs. If you have any questions or need further assistance, don't hesitate to ask!