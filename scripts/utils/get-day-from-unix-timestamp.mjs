const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getDayFromUnixTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);

  const dayIndex = date.getDay();

  return daysOfWeek[dayIndex];
}

export default getDayFromUnixTimestamp;
