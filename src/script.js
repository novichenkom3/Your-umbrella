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
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function updateFullDate(timestamp) {
  let now = new Date(timestamp * 1000);
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  let month = now.getMonth();
  let monthTwelwe = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  return `${date}.${monthTwelwe[month]}`;
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");

  let forecastDaily = response.data.daily;
  let forecastHTML = `<div class="row">`;

  forecastDaily.forEach(function (fullForecast, index) {
    if (index < 5) {
      forecastHTML += `
        <div class="card col-2">
          <div class="card-body">
            <p class="card-text">${formatDate(fullForecast.time)}, 
            </br>
            ${updateFullDate(fullForecast.time)}</p>
            <img class="daily-icons" src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              fullForecast.condition.icon
            }.png" alt="weather-icon">
            <h5 class="card-title">
            <span id="temp-max">${Math.round(
              fullForecast.temperature.maximum
            )}°</span
            ><span id="temp-min">${Math.round(
              fullForecast.temperature.minimum
            )}°</span>
            </h5>
          </div>
        </div>
      `;
    }
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
