function getPageQueryParam() {
  const url = new URL(window.location.href);
  const queryParams = url.searchParams;

  const paramsObject = {};
  queryParams.forEach((value, key) => {
    paramsObject[key] = value;
  });

  return paramsObject;
}

export default getPageQueryParam;
