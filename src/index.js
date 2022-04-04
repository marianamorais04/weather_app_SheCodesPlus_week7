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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3ecaba3242cde6b1539ea995288cd337";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  let showCity = document.querySelector("#city");
  showCity.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let showTemperature = document.querySelector("#current");
  showTemperature.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = Math.round(response.data.main.temp);
  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let apiKey = "3ecaba3242cde6b1539ea995288cd337";
  let city = document.querySelector("#exampleCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let userCity = document.querySelector("#searchCity");
userCity.addEventListener("submit", search);

function currentPosition(position) {
  let apiKey = "3ecaba3242cde6b1539ea995288cd337";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let days = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  days.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<span class="days">
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="sun icon" width="50" height="50" />
      ${formatDay(forecastDay.dt)}
      <br />
      ${Math.round(forecastDay.temp.min)}º <strong>/ ${Math.round(
          forecastDay.temp.max
        )}º</strong>
    </span>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
