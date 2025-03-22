const apiKey = "API_KEY";

document
  .getElementById("btn-search")
  .addEventListener("click", () => getWeather());

function getWeather() {
  const city = document.getElementById("city").value;

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayCurrentWeather(data);
      updateWeatherIcon(data);
      // console.log(data);
    })
    .catch((error) => {
      console.error("Error : ", error);
    });

  fetch(forecastURL)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error : ", error);
    });

  document.querySelector(".weather").style.display = "block";
}

function displayCurrentWeather(data) {
  document.querySelector(".city").innerHTML =
    data.name + ", " + data.sys.country;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".temp-min-max").innerHTML =
    "↑ " +
    Math.round(data.main.temp_max) +
    "°C " +
    "↓ " +
    Math.round(data.main.temp_min) +
    "°C - ";
  document.querySelector(".weather-condition").innerHTML = data.weather[0].main;
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
}

function updateWeatherIcon(data) {
  const weatherIcon = document.querySelector(".weather-icon");

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  weatherIcon.src = iconUrl;
}

function displayHourlyForecast(data) {
  const hourlyForecast = document.getElementById("forecast");
  const next24hours = data.slice(0, 8);

  next24hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}">
                <span>${temperature}°C</span>
            </div>
        `;
    hourlyForecast.innerHTML += hourlyItemHtml;
  });
}
