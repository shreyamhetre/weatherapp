const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('.locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

//default city
let cityInput = "London";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
})

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

function daysOfTheWeek(day, month, year) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${day}/${month}/${year}`).getData()];
};

//fetches data from API
function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${cityInput}=bcfba91fa09f4cae9b9201828222008&q =${cityInput}`)

        .then(response => response.jason())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;

            const date = date.location.localtime;
            const y = parseInt(data.substr(0, 4));
            const m = parseInt(data.substr(5, 2));
            const d = parseInt(data.substr(8, 2));
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} $d , $m $y`;
            timeOutput.innerHTML = time;

            nameOutput.innerHTML = data.location.name;

            const iconID = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);

            icon.scr = "./icons/" + iconID;

            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/hr";

            //default day
            let timeOfDay = "day";

            const code = data.current.condition.code;

            if (!data.current.is_day) {
                timeOfDay = "night";

            } if (code == 1000) {
                app.style.backgroundImage = `url(https://images.unsplash.com/photo-1572162522099-7a0c28d7691b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)`;
                btn.style.background = "#e5ba92";

                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }

            }
            elseif(code == 1003 || code == 1006 || code == 1009 || code == 1030 || code == 1069 ||
                code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282)
            {
                app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#fa6d1b";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }
            elseif(code == 1063 || code == 1069 || code == 1072 || code == 1050 || code == 1053 ||
                code == 1080 || code == 1183 || code == 1286 || code == 1289 || code == 1292 || code == 1295 ||
                code == 1004 || code == 1007 || code == 1040 || code == 1043 || code == 1046 ||
                code == 1049 || code == 1152)
            {
                app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                btn.style.background = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.background = "#325c80";
                }
            }
            elseif
            {
                app.style.backgroundImage = `url(./images/${timeOfDay}/snow.jpg)`;
                btn.style.background = "#4d72aa";
                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }
            app.style.opacity = "1"
        })
        .catch(() => {
            alert('city not found, please try again');
            app.style.opacity = "1";
        });
}

fetchWeatherData();

app.style.opacity = "1";