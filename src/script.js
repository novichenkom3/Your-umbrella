//Date and time
function changeDate(timestamp) {
  let now = new Date(timestamp);
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

//Convert to C and F
function convertToF(event) {
  event.preventDefault();
  let temperature = document.querySelector(".degree");
  temperature.innerHTML = 64;
}

function convertToC(event) {
  event.preventDefault();
  let temperature = document.querySelector(".degree");
  temperature.innerHTML = 18;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToF);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToC);

//Current weather in different cities
function displayWeather(response) {
  let city = document.querySelector(".city");
  city.innerHTML = response.data.city;

  let degree = document.querySelector(".degree");
  degree.innerHTML = Math.round(response.data.temperature.current);

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector(".main-descr").innerHTML =
    response.data.condition.description;

  document.querySelector(".day-time").innerHTML = changeDate(
    response.data.time * 1000
  );
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

updateCity("Kharkiv");
