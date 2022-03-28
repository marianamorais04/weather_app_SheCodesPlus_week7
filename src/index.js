let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
console.log(day);

let hours = String(now.getHours()).padStart(2, "0");
console.log(hours);

let minutes = String(now.getMinutes()).padStart(2, "0");
console.log(minutes);

let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

function showWeather(response) {
  let showCity = document.querySelector("#city");
  showCity.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let showTemperature = document.querySelector("#current");
  showTemperature.innerHTML = `${temperature}`;
}

function search(event) {
  event.preventDefault();
  let apiKey = "3ecaba3242cde6b1539ea995288cd337";
  let city = document.querySelector("#exampleCity").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

let userCity = document.querySelector("#searchCity");
userCity.addEventListener("submit", search);

function currentPosition(position) {
  let apiKey = "3ecaba3242cde6b1539ea995288cd337";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function clickCurrentPosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(currentPosition);
}

let userCurrentButton = document.querySelector("#currentCityButton");
userCurrentButton.addEventListener("click", clickCurrentPosition);
