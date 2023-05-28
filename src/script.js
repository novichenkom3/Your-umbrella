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

function displayWeather(response) {
  let city = document.querySelector(".city");
  city.innerHTML = response.data.name;

  let degree = document.querySelector(".degree");
  degree.innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector(".main-descr").innerHTML =
    response.data.weather[0].main;
}

function updateCity(city) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-a-city").value;
  updateCity(city);
}

function searchPosition(position) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
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
