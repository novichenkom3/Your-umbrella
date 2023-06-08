//Date and time
function changeDate() {
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

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
let date = document.querySelector(".day-time");
let updatedDate = new Date();
date.innerHTML = changeDate(updatedDate);

//Working with forecast
function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML += `
    <div class="card col-2">
      <div class="card-body">
        <p class="card-text">${day}, 21/04</p>
        <img class="daily-icons" src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/shower-rain-night.png" alt="weather-icon">
        <h5 class="card-title">
        <span id="temp-max">12°</span
        ><span id="temp-min">10°</span>
        </h5>
      </div>
    </div>
  `;
  });

  forecastHTML += `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let apiKey = "1c72eb5fe2386ao6dffebt40b3bef0af";
  let url = `https://api.shecodes.io/weather/v1/forecast?lat=${coords.latitude}&lon=${coords.longitude}&key=${apiKey}&units=metric`;

  axios.get(url).then(displayForecast);
}

//Current weather in different cities
function displayWeather(response) {
  let city = document.querySelector(".city");
  city.innerHTML = response.data.city;

  celsiusTemp = response.data.temperature.current;
  let degree = document.querySelector(".degree");
  degree.innerHTML = Math.round(celsiusTemp);

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector(".main-descr").innerHTML =
    response.data.condition.description;

  document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );

  getForecast(response.data.coordinates);
}

function updateCity(city) {
  let apiKey = "1c72eb5fe2386ao6dffebt40b3bef0af";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-a-city").value;
  updateCity(city);
}

//Current weather in my location
function searchPosition(position) {
  let apiKey = "1c72eb5fe2386ao6dffebt40b3bef0af";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let formSubmit = document.querySelector("#form");
formSubmit.addEventListener("submit", submitCity);

let current = document.querySelector("#current-location");
current.addEventListener("click", getLocation);

//Convert to C and F
function convertToF(event) {
  event.preventDefault();
  let temperature = document.querySelector(".degree");

  fahrenheit.classList.remove("inactive");
  celsius.classList.add("inactive");

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function convertToC(event) {
  event.preventDefault();
  document.querySelector(".degree").innerHTML = Math.round(celsiusTemp);

  fahrenheit.classList.add("inactive");
  celsius.classList.remove("inactive");
}

let celsiusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToF);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToC);

updateCity("Kharkiv");
