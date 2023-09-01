
function showDate(date) {
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = days[day];

  let month = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  month = months[month];

  let todayDate = date.getDate();

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `<li class="current-day-name" id="current-weekday">${day}</li>
                    <li class="current-day-date">
                      <span id="current-month">${month}</span>
                      <span id="current-date">${todayDate}</span>
                    </li>
                    <li class="current-day-time">
                      <span id="current-hours">${hours}</span>:<span
                        id="current-minutes"
                      >${minutes}</span>
                    </li>`;
}

function fetchRequestedWeather(response){
   document.querySelector("#currentCity").innerHTML = response.data.name;
   document.querySelector("#temperature-now").innerHTML = Math.round(response.data.main.temp);
   document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
   document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

function showCity(city){
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(fetchRequestedWeather);
}

function showCityInput(event){
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  showCity(city);
}


function showCurrentPosition(position){
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(fetchRequestedWeather);
}

function fetchCurrentLocation(event){
event.preventDefault();

navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let locationBtn = document.querySelector("#location-btn");
locationBtn.addEventListener("click", fetchCurrentLocation);

let apiKey = `ba4cb932bbb28d4f3aebad024c256729`;
let units = `metric`;

// function goToFahrenheits(event){
//   event.preventDefault();

//   let temperatureNow = document.querySelector("#temperature-now");
//   temperatureNow.innerHTML = 66;
// }

// function goToCelsius(event){
//   event.preventDefault();

//   let temperatureNow = document.querySelector("#temperature-now");
//   temperatureNow.innerHTML = 22;
// }

let dateElement = document.querySelector("#date");
let currentDate = new Date();
dateElement.innerHTML = showDate(currentDate);


let cityElement = document.querySelector("#city-search-form");
cityElement.addEventListener("submit", showCityInput);

// let fahrenheits = document.querySelector("#fahrenheit-units");
// fahrenheits.addEventListener("click", goToFahrenheits);

// let celsius = document.querySelector("#celcius-units");
// celsius.addEventListener("click", goToCelsius);

showCity("Lagos");


