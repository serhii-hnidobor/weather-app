function isNumeric(value) {
  return !isNaN(value) && !isNaN(parseFloat(value));
}

function queryString(params) {
  const result = [];

  for (const param in params) {
    const paramValue = params[param];

    if (isNumeric(paramValue)) {
      result.push(`${param}=${paramValue}`);
    } else {
      result.push(`${param}="${paramValue}"`);
    }
  }

  return result.join("&");
}

export default queryString;
