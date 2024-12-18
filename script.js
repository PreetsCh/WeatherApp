let apiKey = "8fbf7bbacd67ca6b5t4o3f620d474a76";

function displayTemperature(response) {
console.log(response.data.condition);

    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);

    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;

    let detailsElement = document.querySelector(".current-temperature");
    detailsElement.innerHTML = `
        ${formatDate(new Date())}, ${response.data.condition.description} <br />
        Humidity: <strong>${response.data.temperature.humidity}%</strong>, 
        Wind: <strong>${response.data.wind.speed}km/h</strong>
    `;
let iconElement = document.querySelector("#icon");
iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" width= "100">`;


    updateForecastDays();
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
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${encodeURIComponent(defaultCity)}&key=${apiKey}&units=metric`;
    
    console.log("API URL:", apiUrl);

    axios.get(apiUrl)
        .then(response => { console.log("Full API Response:", response); displayTemperature(response); }) 

.catch(error => { console.error("Full error details:", error); console.error("Error response:", error.response); console.error("Error message:", error.message); }); 
}



function updateForecastDays() {
    let today = new Date();
    let currentDay = today.getDay(); 
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  
     const forecastDays = [
        ...days.slice(currentDay), // Days from today onward
        ...days.slice(0, currentDay), // Wrap around to the start of the week
    ];


 
    const forecastDayElements = document.querySelectorAll(".forecast-day .forecast-date");
    forecastDayElements.forEach((dayElement, index) => {
      dayElement.textContent = forecastDays[index % 7];
    });
}

loadDefaultWeather();