import apiCall from "../utils/api-call.mjs";
import addQueryParam from "../utils/add-query-param.mjs";
import removeAllChildren from "../utils/remove-all-children.mjs";
import getPageQueryParam from "../utils/get-page-query-param.mjs";

function generateAutocompleteItem(name) {
  const autocompleteItem = document.createElement("div");

  autocompleteItem.innerHTML = `<span>${name}</span>`;

  autocompleteItem.dataset.value = name;

  autocompleteItem.className = "autocomplete-item";

  autocompleteItem.addEventListener("click", (event) => {
    event.stopPropagation();
    addQueryParam(`country=${event.target.dataset.value}`);
  });

  return autocompleteItem;
}

function updateAutocomplete(autocompleteContainer, autocompleteData, isShow) {
  const autocompleteWrapper = document.querySelector(
    "#search-country-autocomplete > div",
  );

  removeAllChildren(autocompleteWrapper);

  if (!isShow) {
    return;
  }

  autocompleteData.forEach(({ name }) => {
    const autocompleteEl = generateAutocompleteItem(name);
    autocompleteWrapper.appendChild(autocompleteEl);
  });

  autocompleteContainer.appendChild(autocompleteWrapper);
}

function autocompleteInit() {
  let search = "a";

  const pageQuery = getPageQueryParam();

  const country = pageQuery?.country;

  const autocompleteContainer = document.querySelector(
    "#search-country-autocomplete",
  );
  const input = document.querySelector("#search-country-autocomplete > input");
  const autocompleteWrapper = document.querySelector(
    "#search-country-autocomplete > div",
  );

  if (country) {
    search = country[0];
    input.value = country;
  }

  if (!input || !autocompleteContainer) {
    throw new Error("autocomplete init error");
  }

  input.addEventListener("focus", () => {
    apiCall("/search.json", "GET", { q: search }).then((data) =>
      updateAutocomplete(autocompleteContainer, data, true),
    );
  });

  autocompleteWrapper.addEventListener("mousedown", (event) => {
    event.stopPropagation();
    event.preventDefault();
  });

  input.addEventListener("blur", () => {
    updateAutocomplete(autocompleteContainer, [], false);
  });

  input.addEventListener("input", (event) => {
    search = event.target.value;
    apiCall("/search.json", "GET", { q: search }).then((data) =>
      updateAutocomplete(autocompleteContainer, data, true),
    );
  });
}

export default autocompleteInit;
