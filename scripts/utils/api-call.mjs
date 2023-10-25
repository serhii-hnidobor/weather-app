import { API_KEY } from "../constants.mjs";
import queryString from "./query-string.mjs";

function showError(error) {
  Toastify({
    text: "something went wrong for more detail check log",
    duration: 3000,
    close: true,
    gravity: "bottom",
    className: "error",
    position: "right",
    stopOnFocus: true,
  }).showToast();

  console.error(error);
}

async function apiCall(apiPath, method, queryObj, data) {
  const query = queryString(queryObj);

  const requestUrl = `https://api.weatherapi.com/v1${apiPath}?key=${API_KEY}&${query}`;
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    showError(response.error);
    return;
  }

  return response.json();
}

export default apiCall;
