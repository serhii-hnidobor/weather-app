import autocompleteInit from "./components/autocomplete.mjs";
import forecast from "./components/forecast.mjs";
import apiCall from "./utils/api-call.mjs";
import getPageQueryParam from "./utils/get-page-query-param.mjs";
import removeAllChildren from "./utils/remove-all-children.mjs";
import moon from "./components/icons/moon.mjs";
import dateFormate from "./utils/date-formate.mjs";
import astro from "./components/astro.mjs";

function setCurrentTime() {
  const timeElement = document.querySelector(".main-content-header__time");

  if (!timeElement) {
    return;
  }

  timeElement.textContent = new Date().toDateString();
}

function placeholder() {
  const container = document.createElement("div");

  container.className = "main-content__placeholder";
  container.appendChild(moon(300, 150));

  const placeholderTextEl = document.createElement("p");

  placeholderTextEl.innerText =
    "Explore current weather data and 6-day forecast of more than 200,000 cities!";

  container.appendChild(placeholderTextEl);

  return container;
}

function forecastContainer() {
  const forecastDiv = document.createElement("div");
  forecastDiv.classList.add("forecast");

  const headerElement = document.createElement("h2");
  headerElement.classList.add("forecast__header");
  headerElement.textContent = "weekly forecast";

  forecastDiv.appendChild(headerElement);
  return forecastDiv;
}

function astroContainer() {
  const astroDiv = document.createElement("div");
  astroDiv.classList.add("astro");

  const headerElement = document.createElement("h2");
  headerElement.classList.add("astro-header");
  headerElement.textContent = "astro";

  astroDiv.appendChild(headerElement);
  return astroDiv;
}

async function initMainContent() {
  const pageQuery = getPageQueryParam();

  const country = pageQuery?.country;

  const mainContentWrapper = document.querySelector(
    ".main-content_weather-wrapper",
  );

  if (!mainContentWrapper) {
    return;
  }

  const addPlaceholder = () => {
    const placeholderEl = placeholder();

    mainContentWrapper.appendChild(placeholderEl);
  };

  removeAllChildren(mainContentWrapper);

  if (!country) {
    addPlaceholder();
    return;
  }

  const forecastContainerEl = forecastContainer();
  const astroContainerEl = astroContainer();

  const data = await apiCall("/forecast.json", "GET", { q: country, days: 7 });

  const astroData = await apiCall("/astronomy.json", "GET", {
    q: country,
    date: dateFormate(new Date()),
  });

  if (!astroData || !data) {
    addPlaceholder();
    return;
  }

  mainContentWrapper.appendChild(forecastContainerEl);
  mainContentWrapper.appendChild(astroContainerEl);

  forecast(data.forecast.forecastday);
  astro(astroData.astronomy.astro);
}

function init() {
  setCurrentTime();
  autocompleteInit();
  initMainContent();
}

document.addEventListener("DOMContentLoaded", init);
