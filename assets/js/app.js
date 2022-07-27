const apiKey = "4c7ab1e6de8e858867888fc23a8524ec";

let cityInputEl = document.querySelector(".cityinput");
let cityUlEl = document.querySelector(".cities");

let searchBtn = document.querySelector(".search");

function printCities(city) {
  let cityLi = document.createElement("li");
  cityUlEl.appendChild(cityLi);
  cityLi.textContent = city;
  cityLi.classList.add("list-group-item");
  cityLi.classList.add("list-group-item-dark");
}

function handleInput(event) {
  event.preventDefault();
  let cityInput = cityInputEl.value;
  printCities(cityInput);
  cityInputEl.value = "";
}

searchBtn.addEventListener("click", handleInput);
