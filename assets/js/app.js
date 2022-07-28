const apiKey = "4c7ab1e6de8e858867888fc23a8524ec";

let cityInputEl = document.querySelector(".cityinput");
let cityUlEl = document.querySelector(".cities");
let dayForecastEl = document.querySelector(".dayforecast");

let searchBtn = document.querySelector(".search");

if (!dayForecastEl.innerHTML) {
  dayForecastEl.setAttribute("style", "display: none");
}

function printCities(city) {
  let cityLi = document.createElement("li");
  cityUlEl.append(cityLi);
  cityLi.textContent = city;
  cityLi.classList.add("list-group-item");
  cityLi.classList.add("list-group-item-dark");
}

//Generate forcast for the day
function getDayForecast(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          let lat = data.coord.lat;
          let lon = data.coord.lon;
          let apiUrl3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
          fetch(apiUrl3)
            .then(function (response) {
              if (response.ok) {
                console.log(response);
                response.json().then(function (data3) {
                  console.log(data3);

                  // Weather for the day
                  let cityName = document.createElement("h2");
                  let currentWeatherIcon =
                    "https://openweathermap.org/img/w/" +
                    data.weather[0].icon +
                    ".png";
                  // Set the date
                  let currentDate = new Date(data3.current.dt * 1000);
                  let day = currentDate.getDate();
                  let month = currentDate.getMonth() + 1;
                  let year = currentDate.getFullYear();
                  //Create elements to display current weather
                  let temp = document.createElement("p");
                  let wind = document.createElement("p");
                  let humidity = document.createElement("p");
                  let uvIndex = document.createElement("p");
                  dayForecastEl.append(cityName);
                  dayForecastEl.append(temp);
                  dayForecastEl.append(wind);
                  dayForecastEl.append(humidity);
                  dayForecastEl.append(uvIndex);
                  //Fill elements with current data
                  cityName.innerHTML = `${city} ${month}/${day}/${year} <img src="${currentWeatherIcon}" alt="${data.weather[0].description}" />`;
                  temp.textContent = `Temp: ${data3.current.temp}°F`;
                  wind.textContent = `Wind Speed: ${data3.current.wind_speed} MPH`;
                  humidity.textContent = `Humidity: ${data3.current.humidity}%`;
                  uvIndex.textContent = `UV Index: ${data3.current.uvi}`;
                });
              } else {
                console.log("error");
              }
            })
            .catch(function (error) {
              console.log("Caught Error");
            });
        });
      } else {
        console.log("error");
      }
    })
    .catch(function (error) {
      console.log("Caught Error");
    });
}

//Generate 5 day forecast

function handleInput(event) {
  event.preventDefault();

  let cityInput = cityInputEl.value;
  if (!cityInput) {
    return;
  }
  dayForecastEl.setAttribute("style", "display");
  printCities(cityInput);
  getDayForecast(cityInput);
  cityInputEl.value = "";
}

searchBtn.addEventListener("click", handleInput);
