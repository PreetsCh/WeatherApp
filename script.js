let apiKey = "8fbf7bbacd67ca6b5t4o3f620d474a76";

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);

    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;

    let detailsElement = document.querySelector(".current-details");
    detailsElement.innerHTML = `
        ${formatDate(new Date())}, ${response.data.condition.description} <br />
        Humidity: <strong>${response.data.temperature.humidity}%</strong>, 
        Wind: <strong>${response.data.wind.speed}km/h</strong>
    `;
}

function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl)
        .then(displayTemperature)
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Unable to fetch weather data. Please try again.");
        });
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
    
    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];
    
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

function loadDefaultWeather() {
    let defaultCity = "Prishtina";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl)
        .then(displayTemperature)
        .catch(error => {
            console.error("Error fetching default weather data:", error);
        });
}

loadDefaultWeather();