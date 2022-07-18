function formatDate(currDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currDate.getDay()];
  let hour = currDate.getHours();
  let minutes = currDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedDate = `${day} ${hour}:${minutes}`;
  return formattedDate;
}
function getWeather(response) {
  let city = document.querySelector(".main-city");
  city.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector(".current-temp");
  mainTemp.innerHTML = temperature;

  document.querySelector(
    ".humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(".wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].main;
}
function getPosition(location) {
  let lat = location.coords.latitude;
  let long = location.coords.longitude;
  let apiKey = "63116731662a94eebc651f7bb7447ea1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}
function getLocation(response) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getCity(event) {
  event.preventDefault();
  let inputtedCity = document.querySelector(".search-form").value;
  let mainCity = document.querySelector(".main-city");
  inputtedCity = inputtedCity.toLowerCase();
  inputtedCity = inputtedCity.charAt(0).toUpperCase() + inputtedCity.slice(1);
  mainCity.innerHTML = inputtedCity;

  let apiKey = "63116731662a94eebc651f7bb7447ea1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputtedCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector(".current-temp").innerHTML = 20;
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  document.querySelector(".current-temp").innerHTML = 68;
}

let now = new Date();
document.querySelector(".current-date").innerHTML = formatDate(now);
let cityForm = document.querySelector(".search-city-form");
cityForm.addEventListener("submit", getCity);

let celsius = document.querySelector(".celsius-unit");
let fahrenheit = document.querySelector(".fahrenheit-unit");
celsius.addEventListener("click", showCelsiusTemp);
fahrenheit.addEventListener("click", showFahrenheitTemp);

let locationBtn = document.querySelector(".my-location");
locationBtn.addEventListener("click", getLocation);
