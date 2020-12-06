const wheatherContent = document.querySelector(".js-weather");
const nowTemp = document.querySelector(".now-temp");
const nowTempFeel = document.querySelector(".now-temp-feel");
const nowDescription = document.querySelector(".now-description");
const loc = document.querySelector(".location");
const nowWheatherIcon = document.querySelector(".now-weather-icon");
const seeForecast = document.querySelector(".see_forecast");
const A6H_Temp = document.querySelector(".A6H-temp"),
    A6H_TempFeel = document.querySelector(".A6H-temp-feel"),
    A6H_Description = document.querySelector(".A6H-description"),
    A12H_Temp = document.querySelector(".A12H-temp"),
    A12H_TempFeel = document.querySelector(".A12H-temp-feel"),
    A12H_Description = document.querySelector(".A12H-description"),
    A24H_Temp = document.querySelector(".A24H-temp"),
    A24H_TempFeel = document.querySelector(".A24H-temp-feel"),
    A24H_Description = document.querySelector(".A24H-description");
const API_KEY = "2d1483cb6ef3ba25c6777066e77d34c1";
const COORDS = 'coords';
const aBox = document.querySelectorAll(".a-box");
const A6H_IMG = document.querySelector(".A6H-weather-icon");
const A12H_IMG = document.querySelector(".A12H-weather-icon");
const A24H_IMG = document.querySelector(".A24H-weather-icon");
const forBtn = document.querySelector(".forBtn");

function getHourWeather(json, hour) {
    return json.hourly[hour]
}

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_KEY}&units=metric&lang=kr`
    ).then(function (response) {
        return response.json();
    }).then(function (json) {
        const lat = json.lat;
        const lon = json.lon;
        const Now_temperature = json.current.temp,
            Now_temp_feel = json.current.feels_like,
            Now_mainWeather = json.current.weather[0].main,
            Now_icon = json.current.weather[0].icon,
            Now_description = json.current.weather[0].description;
        const A6H_temperature = getHourWeather(json, 6).temp,
            A6H_feels_like = getHourWeather(json, 6).feels_like,
            A6H_mainWeather = getHourWeather(json, 6).weather[0].main,
            A6H_icon = getHourWeather(json, 6).weather[0].icon,
            A6H_description = getHourWeather(json, 6).weather[0].description;
        const A12H_temperature = getHourWeather(json, 12).temp,
            A12H_feels_like = getHourWeather(json, 12).feels_like,
            A12H_mainWeather = getHourWeather(json, 12).weather[0].main,
            A12H_icon = getHourWeather(json, 12).weather[0].icon,
            A12H_description = getHourWeather(json, 12).weather[0].description;
        const A24H_temperature = getHourWeather(json, 24).temp,
            A24H_feels_like = getHourWeather(json, 24).feels_like,
            A24H_mainWeather = getHourWeather(json, 24).weather[0].main,
            A24H_icon = getHourWeather(json, 24).weather[0].icon,
            A24H_description = getHourWeather(json, 24).weather[0].description;
        console.log(json);
        nowWheatherIcon.src = `http://openweathermap.org/img/wn/${Now_icon}@2x.png`;
        A6H_IMG.src = `http://openweathermap.org/img/wn/${A6H_icon}@2x.png`;
        A12H_IMG.src = `http://openweathermap.org/img/wn/${A12H_icon}@2x.png`;
        A24H_IMG.src = `http://openweathermap.org/img/wn/${A24H_icon}@2x.png`;
        nowTemp.innerText = `현재 온도 ${Now_temperature}℃`;
        nowTempFeel.innerText = `체감 ${Now_temp_feel}℃`;
        nowDescription.innerText = `${Now_description}`;
        loc.innerText = `위치 : 위도 ${lat}˚ , 경도 ${lon}˚`;
        A6H_Temp.innerText = `온도 ${A6H_temperature}℃`;
        A6H_TempFeel.innerText = `체감 ${A6H_feels_like}℃`;
        A6H_Description.innerText = `${A6H_description}`;
        A12H_Temp.innerText = `온도 ${A12H_temperature}℃`;
        A12H_TempFeel.innerText = `체감 ${A12H_feels_like}℃`;
        A12H_Description.innerText = `${A12H_description}`;
        A24H_Temp.innerText = `온도 ${A24H_temperature}℃`;
        A24H_TempFeel.innerText = `체감 ${A24H_feels_like}℃`;
        A24H_Description.innerText = `${A24H_description}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Error");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}
let a_pressed = false;
function forecastScreen(event) {
    if (a_pressed === false) {
        aBox.forEach(function (ele) {
            ele.classList.add("a-box-reverse-none");
        })
        aBox.forEach(function (ele) {
            ele.classList.remove("a-box");
        })
        forBtn.classList.add("forBtnWidth");
        a_pressed = true;
    } else {
        aBox.forEach(function (ele) {
            ele.classList.add("a-box");
        })
        aBox.forEach(function (ele) {
            ele.classList.remove("a-box-reverse-none");
        })
        forBtn.classList.remove("forBtnWidth");
        a_pressed = false;
    }
}

function init() {
    loadCoords();
    seeForecast.addEventListener("click", forecastScreen);
}

init();