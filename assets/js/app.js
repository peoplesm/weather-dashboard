const apiKey = "4c7ab1e6de8e858867888fc23a8524ec";

let cityInputEl = document.querySelector(".cityinput");
let cityUlEl = document.querySelector(".cities");
let dayForecastEl = document.querySelector(".dayforecast");

let searchBtn = document.querySelector(".search");

function printCities(city) {
  let cityLi = document.createElement("li");
  cityUlEl.appendChild(cityLi);
  cityLi.textContent = city;
  cityLi.classList.add("list-group-item");
  cityLi.classList.add("list-group-item-dark");
}

//Generate forcast for the day
function getDayForecast(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        console.log("error");
      }
    })
    .catch(function (error) {
      console.log("undabler");
    });
}

//Generate 5 day forecast

function handleInput(event) {
  event.preventDefault();

  let cityInput = cityInputEl.value;
  if (!cityInput) {
    return;
  }
  printCities(cityInput);
  getDayForecast(cityInput);
  cityInputEl.value = "";
}

searchBtn.addEventListener("click", handleInput);
