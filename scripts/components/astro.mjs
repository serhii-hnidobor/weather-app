function astroItem(heder, value) {
  const itemEl = document.createElement("div");

  itemEl.className = "astro-item";

  const valueEl = document.createElement("span");
  const headerEl = document.createElement("h4");

  valueEl.innerText = value;
  headerEl.innerText = heder;

  itemEl.appendChild(valueEl);
  itemEl.appendChild(headerEl);

  return itemEl;
}

function astro(data) {
  const container = document.querySelector(".astro");

  console.log(container, data);

  if (!container) {
    return;
  }

  const wrapper = document.createElement("div");

  wrapper.className = "astro-wrapper";

  for (let astroPropertyName in data) {
    const preparedHeader = astroPropertyName.replace("_", " ");

    const astroPropertyValue = data[astroPropertyName];

    const astroItemEl = astroItem(preparedHeader, astroPropertyValue);

    wrapper.appendChild(astroItemEl);
  }

  console.log(wrapper);

  container.appendChild(wrapper);
}

export default astro;
