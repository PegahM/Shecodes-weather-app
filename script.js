let now = new Date();
console.log(now);
let day = now.getDay();
console.log(day);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekdays = days[day];

console.log(weekdays);
function fix_hours() {
  let hours = now.getHours();
  if (hours < 10) {
    return `0${hours}`;
  } else {
    return hours;
  }
}
let hours = fix_hours();
console.log(hours);
function fix_minute() {
  let minutes = now.getMinutes();

  if (minutes < 10) {
    return `0${minutes}`;
  } else {
    return minutes;
  }
}
let minutes = fix_minute();
console.log(minutes);
let currentDate = document.querySelector(".currentDate li");

console.log(currentDate);

currentDate.innerHTML = `${weekdays} ${hours}:${minutes}`;

function showSearchValue(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");
  if (searchInput.value === "") {
    alert("please Enter A city");
  } else {
    console.log(searchInput.value);
    let cityName = document.querySelector("h1");
    cityName.innerHTML = searchInput.value;

    let apiKey = "73e732d25bae3e4404f4d1aa421272a7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
}
function showWeather(response) {
  let myCurrentTemp = Math.round(response.data.main.temp);
  let header = document.querySelector(".temp");
  header.innerHTML = myCurrentTemp;

  let myhumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = myhumidity;
  console.log(response.data.wind.speed);

  let mywind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = mywind;
  let situation = document.querySelector("#situation");
  console.log(response.data.weather[0].main);
  situation.innerHTML = response.data.weather[0].main;
}
function currerntTemp(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(navigatorTemp);

  function navigatorTemp(position) {
    let mylatitude = position.coords.latitude;
    let mylongitude = position.coords.longitude;
    console.log(mylatitude, mylongitude);
    console.log(position);
    let apiKey = "73e732d25bae3e4404f4d1aa421272a7";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${mylatitude}&lon=${mylongitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCurrentWeather);
  }
}

function showCurrentWeather(response) {
  let myCurrentTemp = Math.round(response.data.main.temp);
  console.log(myCurrentTemp);
  console.log(response);
  let header = document.querySelector("h1");
  header.innerHTML = response.data.name;
  let temperature = document.querySelector(".temp");
  temperature.innerHTML = myCurrentTemp;
  let situation = document.querySelector("#situation");
  console.log(response.data.weather[0].main);
  situation.innerHTML = response.data.weather[0].main;
  let myhumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = myhumidity;
  console.log(response.data.wind.speed);

  let mywind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = mywind;
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("click", showSearchValue);
let curretnform = document.querySelector("#currant");
curretnform.addEventListener("click", currerntTemp);

function changeDegreeF(event) {
  event.preventDefault();
  let tempreture = document.querySelector(".temp");
  let farenTemp = Math.round((tempreture.innerHTML * 9) / 5 + 32);
  tempreture.innerHTML = farenTemp;
  console.log(farenTemp);
}
let fDegree = document.querySelector("#faren-link");
fDegree.addEventListener("click", changeDegreeF);

function changeDegreeC(event) {
  event.preventDefault();
  let tempreture = document.querySelector(".temp");
  let oldTemp = Number(tempreture.innerHTML);

  tempreture.innerHTML = Math.round(((oldTemp - 32) * 5) / 9);
}

let cDegree = document.querySelector("#cel-link");
cDegree.addEventListener("click", changeDegreeC);
