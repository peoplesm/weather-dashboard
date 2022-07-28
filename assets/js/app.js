const apiKey = "4c7ab1e6de8e858867888fc23a8524ec";

let cityInputEl = document.querySelector(".cityinput");
let cityUlEl = document.querySelector(".cities");
let dayForecastEl = document.querySelector(".dayforecast");
let fiveDayEl = document.querySelector(".fiveday");
let fiveDayTitle = document.querySelector(".fivetitle");
let searchBtn = document.querySelector(".search");

if (!dayForecastEl.innerHTML) {
  dayForecastEl.setAttribute("style", "display: none");
}
if (!fiveDayEl.innerHTML) {
  fiveDayEl.setAttribute("style", "display: none");
  fiveDayTitle.setAttribute("style", "display: none");
}

function printCities(city) {
  let cityLi = document.createElement("li");
  cityUlEl.append(cityLi);
  cityLi.textContent = city;
  cityLi.classList.add("list-group-item");
  cityLi.classList.add("list-group-item-dark");
}

//Get lat long for city
function getDayForecast(city) {
  dayForecastEl.textContent = "";
  fiveDayEl.textContent = "";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          let lat = data.coord.lat;
          let lon = data.coord.lon;
          oneCallWeather(lat, lon, city);
        });
      } else {
        console.log("error");
      }
    })
    .catch(function (error) {
      console.log("Caught Error");
    });
}

//Use above call's lat and long to get the one call data
function oneCallWeather(lat, lon, city) {
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
            data3.current.weather[0].icon +
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
          cityName.innerHTML = `${city} ${month}/${day}/${year} <img src="${currentWeatherIcon}" alt="${data3.current.weather[0].description}" />`;
          temp.textContent = `Temp: ${data3.current.temp}°F`;
          wind.textContent = `Wind Speed: ${data3.current.wind_speed} MPH`;
          humidity.textContent = `Humidity: ${data3.current.humidity}%`;
          uvIndex.textContent = `UV Index: ${data3.current.uvi}`;

          //Generate 5 day forecast

          for (let i = 1; i < 6; i++) {
            let dailyDate = new Date(data3.daily[i].dt * 1000);
            let dailyInfo = {
              day: dailyDate.getDate(),
              month: dailyDate.getMonth() + 1,
              year: dailyDate.getFullYear(),
              icon: data3.daily[i].weather[0].icon,
              temp: data3.daily[i].temp.day,
              wind: data3.daily[i].wind_speed,
              humidity: data3.daily[i].humidity,
            };
            console.log(dailyInfo);

            // let breakEl = document.createElement("br");
            // fiveDayEl.append(breakEl);
            let dailyCard = document.createElement("div");
            dailyCard.classList.add("dailycard");
            let dailyDateEl = document.createElement("p");
            let dailyIcon = document.createElement("img");
            let dailyTemp = document.createElement("p");
            let dailyWind = document.createElement("p");
            let dailyHumidity = document.createElement("p");
            dailyCard.classList.add("col-2");
            fiveDayEl.append(dailyCard);
            dailyCard.append(dailyDateEl);
            dailyCard.append(dailyIcon);
            dailyCard.append(dailyTemp);
            dailyCard.append(dailyWind);
            dailyCard.append(dailyHumidity);
            dailyDateEl.textContent = `${dailyInfo.month}/${dailyInfo.day}/${dailyInfo.year}`;
            dailyIcon.setAttribute(
              "src",
              "https://openweathermap.org/img/w/" + dailyInfo.icon + ".png"
            );
            dailyTemp.textContent = `Temp: ${dailyInfo.temp}°F`;
            dailyWind.textContent = `Wind: ${dailyInfo.wind} MPH`;
            dailyHumidity.textContent = `Humidity: ${dailyInfo.humidity}%`;
          }
        });
      } else {
        console.log("error");
      }
    })
    .catch(function (error) {
      console.log("Caught Error");
    });
}

function handleInput(event) {
  event.preventDefault();

  let cityInput = cityInputEl.value;
  if (!cityInput) {
    return;
  }
  dayForecastEl.setAttribute("style", "display");
  fiveDayEl.setAttribute("style", "display:flex");
  fiveDayTitle.setAttribute("style", "display");

  printCities(cityInput);
  getDayForecast(cityInput);
  cityInputEl.value = "";
}

searchBtn.addEventListener("click", handleInput);
