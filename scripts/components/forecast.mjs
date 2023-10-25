import getDayFromUnixTimestamp from "../utils/get-day-from-unix-timestamp.mjs";
import temperature from "./icons/temperature.mjs";
import cloud from "./icons/cloud.mjs";
import wind from "./icons/wind.mjs";
import humidity from "./icons/humidity.mjs";

function forecastItem({ date_epoch, day }) {
  const item = document.createElement("div");

  item.className = "forecast-item ";

  const forecastDayElement = document.createElement("span");
  forecastDayElement.innerText = getDayFromUnixTimestamp(date_epoch);

  const forecastCondition = document.createElement("div");

  forecastCondition.style.display = "flex";
  forecastCondition.style.alignItems = "center";

  const forecastConditionDescription = document.createElement("span");
  forecastConditionDescription.innerText = day.condition.text;

  const forecastConditionIcon = document.createElement("img");
  forecastConditionIcon.alt = `${day.condition.text} icon`;
  forecastConditionIcon.style.width = "24px";
  forecastConditionIcon.src = `https:${day.condition.icon}`;

  forecastCondition.appendChild(forecastConditionIcon);
  forecastCondition.appendChild(forecastConditionDescription);

  const temperatureEl = document.createElement("div");
  const temperatureIconEl = temperature(16, 16);
  const temperatureValueEl = document.createElement("span");

  temperatureEl.className = "forecast-item__info-container";
  temperatureValueEl.innerText = `${day.avgtemp_c} °C`;
  temperatureEl.appendChild(temperatureIconEl);
  temperatureEl.appendChild(temperatureValueEl);

  const rainChanceEl = document.createElement("div");
  const cloudIconEl = cloud(16, 16);
  const rainChanceValueEl = document.createElement("span");

  rainChanceEl.className = "forecast-item__info-container";
  rainChanceValueEl.innerText = `${day.daily_chance_of_rain} %`;
  rainChanceEl.appendChild(cloudIconEl);
  rainChanceEl.appendChild(rainChanceValueEl);

  const maxWindSpeedEl = document.createElement("div");
  const maxWindSpeedValueEl = document.createElement("span");
  const windIconEl = wind(16, 16);

  maxWindSpeedValueEl.innerText = `${day.maxwind_kph} km/h`;
  maxWindSpeedEl.className = "forecast-item__info-container";
  maxWindSpeedEl.appendChild(windIconEl);
  maxWindSpeedEl.appendChild(maxWindSpeedValueEl);

  const humidityEl = document.createElement("div");
  const humidityValueEl = document.createElement("span");
  const humidityIconEl = humidity(16, 16);

  humidityValueEl.innerText = `${day.avghumidity} %`;
  humidityEl.className = "forecast-item__info-container";
  humidityEl.appendChild(humidityIconEl);
  humidityEl.appendChild(humidityValueEl);

  item.appendChild(forecastDayElement);
  item.appendChild(temperatureEl);
  item.appendChild(maxWindSpeedEl);
  item.appendChild(forecastCondition);
  item.appendChild(rainChanceEl);
  item.appendChild(humidityEl);

  return item;
}

function forecast(data) {
  const container = document.querySelector(".forecast");

  if (!container) {
    return;
  }

  data.forEach((dayWeather) => {
    const item = forecastItem(dayWeather);
    container.appendChild(item);
  });
}

export default forecast;
