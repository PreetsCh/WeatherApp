let apiKey = "8fbf7bbacd67ca6b5t4o3f620d474a76";

function formatDay(timestamp) { const date = new Date(timestamp * 1000); const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 
const currentDayIndex = new Date().getDay(); 
 const forecastDayIndex = (currentDayIndex + date.getDay()) % 7; return days[forecastDayIndex]; }


function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);

    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;

    let detailsElement = document.querySelector(".current-details");
    let currentDate = new Date();
    detailsElement.innerHTML = `
        <span id="current-date">${formatDate(currentDate)}</span>, 
        <span id="weather-description">${response.data.condition.description}</span> <br />
        Humidity: <strong id="humidity">${response.data.temperature.humidity}%</strong>, 
        Wind: <strong id="wind-speed">${response.data.wind.speed} km/h</strong>
    `;

    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url.replace('http:', 'https:')}" 
        alt="${response.data.condition.description}" 
        width="100">`;
}


function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let dailyForecasts = response.data.daily;
    let forecastHTML = "";

    dailyForecasts.forEach((day, index) => {
        if (index < 6) {
            forecastHTML += `
                <div class="forecast-day">
                    <div class="forecast-date">${formatDay(day.time)}</div>
                    <img src="${day.condition.icon_url.replace('http:', 'https:')}" 
                        alt="${day.condition.description}" 
                        width="42">
                    <div class="forecast-temperatures">
                        <span class="forecast-temperature-max">${Math.round(day.temperature.maximum)}°</span>
                        <span class="forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
                    </div>
                </div>`;
        }
    });

    forecastElement.innerHTML = forecastHTML;
}

function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
    fetchWeatherData(city);
}

function fetchWeatherData(city) {
    let currentWeatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    let forecastWeatherUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios
        .get(currentWeatherUrl)
        .then(displayTemperature)
        .catch(handleError);

    axios
        .get(forecastWeatherUrl)
        .then(displayForecast)
        .catch(handleError);
}

function handleError(error) {
    console.error("Error fetching weather data:", error);
    alert("Unable to fetch weather data. Please try again.");
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${days[day]} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function loadDefaultWeather() {
    // Load weather for default city
    fetchWeatherData("Prishtina");
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value.trim();

    if (city) {
        fetchWeatherData(city);
    } else {
        alert("Please enter a valid city name.");
    }
});

loadDefaultWeather();