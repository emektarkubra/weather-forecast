function getDataFromAPI(url) {

    let promise = new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
    })
    return promise;
}

getDataFromAPI(`http://api.weatherapi.com/v1/forecast.json?key=3c5c01d2237a4ab5a79125234231506&q=07112&days=7&q=Ankara`)
    .then((data) => {
        console.log(data)
        createElement(data);
    })
    .catch((err) => {
        console.log(err);
    })

const container = document.querySelector(".container");
const forecastContainer = document.querySelector(".forecast-container");

let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let date = new Date();
let dayIndex = date.getDay();


function createElement(data) {

    // date-inform
    const dateInformBox = document.createElement("div");
    dateInformBox.className = "date-inform";

    const todayNameBox = document.createElement("div");
    todayNameBox.className = "today";
    todayNameBox.textContent = days[dayIndex];

    const currentDateBox = document.createElement("div");
    currentDateBox.className = "current-date";
    currentDateBox.textContent = data.current.last_updated;

    container.appendChild(dateInformBox);
    dateInformBox.appendChild(todayNameBox);
    dateInformBox.appendChild(currentDateBox);

    // current information

    const currentBox = document.createElement("div");
    currentBox.className = "current";

    const weatherConditionBox = document.createElement("div");
    weatherConditionBox.className = "weather-condition";

    const currentIconBox = document.createElement("div");
    currentIconBox.className = "current-icon";

    const currentIcon = document.createElement("img");
    currentIcon.src = data.current.condition.icon;
    currentIcon.alt = "image not found";

    const currentTempBox = document.createElement("div");
    currentTempBox.className = "current-temperature";

    const temp = document.createElement("h3");
    temp.textContent = `${data.current.temp_c}`;

    const celciusSymbol = document.createElement("div");
    celciusSymbol.className = "celcius";
    celciusSymbol.textContent = " °C";

    const currentText = document.createElement("p");
    currentText.textContent = data.current.condition.text;

    if ((data.current.condition.text).includes("rain")) document.body.style.backgroundImage = "url('https://www.wallpaperup.com/uploads/wallpapers/2020/03/17/1373964/472766df4d96f765c7d300631f905fcb-1000.jpg')";
    else if ((data.current.condition.text).includes("sun")) document.body.style.backgroundImage = "url('https://img.gazeta.ru/files3/839/7947839/upload-shutterstock_109674992-pic4_zoom-1500x1500-83836.jpg')";
    else if ((data.current.condition.text).includes("cloud")) document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1528157509193-8254fac59543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80')";
    else if ((data.current.condition.text).includes("snow")) document.body.style.backgroundImage = "url('https://kan-yu.com.ua/wp-content/uploads/2017/01/201701-1.jpg')";
    else document.body.style.backgroundImage = "url('https://i1.wp.com/img-4.linternaute.com/7XGwcTIr6IY-S5lBEURQRroZGvM=/1500x/smart/0d64a778e3b54ed9a43c3f927514df7f/ccmcms-linternaute/31139160.jpg')";
    const currentInformBox = document.createElement("div");
    currentInformBox.className = "information";
    currentInformBox.innerHTML = `
        <table>
            <tr>
                <td>Precip: ${data.current.precip_in} in</td>
            </tr>
            <tr>
                <td>Humidity: ${data.current.humidity} %</td>
            </tr>
            <tr>
                <td>Wind: ${data.current.wind_kph} kph</td>
            </tr>
        </table>
    `

    container.appendChild(currentBox);
    currentBox.appendChild(weatherConditionBox);
    weatherConditionBox.appendChild(currentIconBox);
    currentIconBox.appendChild(currentIcon);
    weatherConditionBox.appendChild(currentTempBox);
    currentTempBox.appendChild(temp);
    currentTempBox.appendChild(celciusSymbol);
    currentTempBox.appendChild(currentText);
    currentBox.appendChild(currentInformBox);

    // forecast

    const forecastBox = document.createElement("div");
    forecastBox.className = "forecast";
    container.appendChild(forecastBox);
    let day = 0;

    const forecastDays = data.forecast.forecastday;

    forecastDays.forEach(forecastDay => {

        const forecastDayBox = document.createElement("div");
        forecastDayBox.className = "forecast-day";
        forecastDayBox.setAttribute("day", day);
        day++;


        const forecastDayName = document.createElement("div");
        forecastDayName.className = "day";
        forecastDayName.textContent = days[dayIndex];
        dayIndex++;
        if (dayIndex == 7) dayIndex = 0;

        const iconBox = document.createElement("div");
        iconBox.className = "icon";

        const iconImg = document.createElement("img");
        iconImg.src = forecastDay.day.condition.icon;
        iconImg.alt = "image not found";

        const maxTemp = document.createElement("h4");
        maxTemp.textContent = forecastDay.day.maxtemp_c;

        const minTemp = document.createElement("h4");
        minTemp.textContent = forecastDay.day.mintemp_c;

        forecastBox.appendChild(forecastDayBox);
        forecastDayBox.appendChild(forecastDayName);
        forecastDayBox.appendChild(iconBox);
        iconBox.appendChild(iconImg);
        forecastDayBox.appendChild(maxTemp);
        forecastDayBox.appendChild(minTemp);


        // forecast detailed weather
        forecastDayBox.addEventListener("click", createDetailWeather)

        function createDetailWeather(e) {

            forecastContainer.innerHTML = ``;
            forecastDayBox.style.backgroundColor = "rgba(255, 255, 255, 0.356)";
            for (let i = 0; i < forecastBox.children.length; i++) {
                forecastBox.children[i];
                if (forecastBox.children[i] != forecastDayBox) {
                    forecastBox.children[i].style.backgroundColor = "rgba(0, 0, 0, 0)";
                }
            }

            const detailedWeatherBox = document.createElement("div");
            detailedWeatherBox.className = "detailed-weather";

            detailedWeatherBox.innerHTML = `
                <table>
                    <caption>${forecastDay.date}</caption>
                    <tr>
                        <td>Sunrise: ${forecastDay.astro.sunrise}</td>
                        <td>Max-temp</td>
                        <td>Min-temp</td>
                        <td>Avg-temp</td>
                        <td>Total-precip</td>
                        <td>Max-wind</td>
                    </tr>
                    <tr>
                        <td>Sunset: ${forecastDay.astro.sunset}</td>
                        <td>${forecastDay.day.maxtemp_c} °C</td>
                        <td>${forecastDay.day.mintemp_c} °C</td>
                        <td>${forecastDay.day.avgtemp_c} °C</td>
                        <td>${forecastDay.day.totalprecip_in} in</td>
                        <td>${forecastDay.day.maxwind_kph} kph</td>
                    </tr>
                </table>
            
            `
            const detailedParametersBox = document.createElement("div");
            detailedParametersBox.className = "detailed-parameters";

            const hours = forecastDay.hour;
            detailedParametersBox.innerHTML = `
                <table>
                    <tr>
                        <td></td>
                        <td>${hours[0].time.slice(11)}</td>
                        <td>${hours[3].time.slice(11)}</td>
                        <td>${hours[6].time.slice(11)}</td>
                        <td>${hours[9].time.slice(11)}</td>
                        <td>${hours[12].time.slice(11)}</td>
                        <td>${hours[15].time.slice(11)}</td>
                        <td>${hours[18].time.slice(11)}</td>
                        <td>${hours[21].time.slice(11)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><img src="${hours[0].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[3].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[6].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[9].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[12].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[15].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[18].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[21].condition.icon}" alt="image not found"></td>
                    </tr>
                    <tr>
                        <td>Temp</td>
                        <td>${hours[0].temp_c} °C</td>
                        <td>${hours[3].temp_c} °C</td>
                        <td>${hours[6].temp_c} °C</td>
                        <td>${hours[9].temp_c} °C</td>
                        <td>${hours[12].temp_c} °C</td>
                        <td>${hours[15].temp_c} °C</td>
                        <td>${hours[18].temp_c} °C</td>
                        <td>${hours[21].temp_c} °C</td>
                    </tr>
                    <tr>
                        <td>Wind</td>
                        <td>${hours[0].wind_kph} kph</td>
                        <td>${hours[3].wind_kph} kph</td>
                        <td>${hours[6].wind_kph} kph</td>
                        <td>${hours[9].wind_kph} kph</td>
                        <td>${hours[12].wind_kph} kph</td>
                        <td>${hours[15].wind_kph} kph</td>
                        <td>${hours[18].wind_kph} kph</td>
                        <td>${hours[21].wind_kph} kph</td>
                    </tr>
                    <tr>
                        <td>Precip</td>
                        <td>${hours[0].precip_in} in</td>
                        <td>${hours[3].precip_in} in</td>
                        <td>${hours[6].precip_in} in</td>
                        <td>${hours[9].precip_in} in</td>
                        <td>${hours[12].precip_in} in</td>
                        <td>${hours[15].precip_in} in</td>
                        <td>${hours[18].precip_in} in</td>
                        <td>${hours[21].precip_in} in</td>

                    </tr>
                    <tr>
                        <td>Cloud</td>
                        <td>${hours[0].cloud}%</td>
                        <td>${hours[3].cloud}%</td>
                        <td>${hours[6].cloud}%</td>
                        <td>${hours[9].cloud}%</td>
                        <td>${hours[12].cloud}%</td>
                        <td>${hours[15].cloud}%</td>
                        <td>${hours[18].cloud}%</td>
                        <td>${hours[21].cloud}%</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td>${hours[0].humidity}%</td>
                        <td>${hours[3].humidity}%</td>
                        <td>${hours[6].humidity}%</td>
                        <td>${hours[9].humidity}%</td>
                        <td>${hours[12].humidity}%</td>
                        <td>${hours[15].humidity}%</td>
                        <td>${hours[18].humidity}%</td>
                        <td>${hours[21].humidity}%</td>
                    </tr>
                    <tr>
                        <td>Pressure</td>
                        <td>${hours[0].pressure_in} in</td>
                        <td>${hours[3].pressure_in} in</td>
                        <td>${hours[6].pressure_in} in</td>
                        <td>${hours[9].pressure_in} in</td>
                        <td>${hours[12].pressure_in} in</td>
                        <td>${hours[15].pressure_in} in</td>
                        <td>${hours[18].pressure_in} in</td>
                        <td>${hours[21].pressure_in} in</td>
                    </tr>
                </table>
            `
            forecastContainer.appendChild(detailedWeatherBox);
            forecastContainer.appendChild(detailedParametersBox);
        };
    });

    // current detailed weather

    const detailedWeatherBox = document.createElement("div");
    detailedWeatherBox.className = "detailed-weather";
    detailedWeatherBox.innerHTML = `
                <table>
                    <caption>${data.forecast.forecastday[0].date}</caption>
                    <tr>
                        <td>Sunrise: ${data.forecast.forecastday[0].astro.sunrise}</td>
                        <td>Max-temp</td>
                        <td>Min-temp</td>
                        <td>Avg-temp</td>
                        <td>Total-precip</td>
                        <td>Max-wind</td>
                    </tr>
                    <tr>
                        <td>Sunset: ${data.forecast.forecastday[0].astro.sunset}</td>
                        <td>${data.forecast.forecastday[0].day.maxtemp_c} °C</td>
                        <td>${data.forecast.forecastday[0].day.mintemp_c} °C</td>
                        <td>${data.forecast.forecastday[0].day.avgtemp_c} °C</td>
                        <td>${data.forecast.forecastday[0].day.totalprecip_in} in</td>
                        <td>${data.forecast.forecastday[0].day.maxwind_kph} kph</td>
                    </tr>
                </table>
            
            `
    const detailedParametersBox = document.createElement("div");
    detailedParametersBox.className = "detailed-parameters";

    const hours = data.forecast.forecastday[0].hour;
    detailedParametersBox.innerHTML = `
                <table>
                    <tr>
                        <td></td>
                        <td>${hours[0].time.slice(11)}</td>
                        <td>${hours[3].time.slice(11)}</td>
                        <td>${hours[6].time.slice(11)}</td>
                        <td>${hours[9].time.slice(11)}</td>
                        <td>${hours[12].time.slice(11)}</td>
                        <td>${hours[15].time.slice(11)}</td>
                        <td>${hours[18].time.slice(11)}</td>
                        <td>${hours[21].time.slice(11)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><img src="${hours[0].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[3].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[6].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[9].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[12].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[15].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[18].condition.icon}" alt="image not found"></td>
                        <td><img src="${hours[21].condition.icon}" alt="image not found"></td>
                    </tr>
                    <tr>
                        <td>Temp</td>
                        <td>${hours[0].temp_c} °C</td>
                        <td>${hours[3].temp_c} °C</td>
                        <td>${hours[6].temp_c} °C</td>
                        <td>${hours[9].temp_c} °C</td>
                        <td>${hours[12].temp_c} °C</td>
                        <td>${hours[15].temp_c} °C</td>
                        <td>${hours[18].temp_c} °C</td>
                        <td>${hours[21].temp_c} °C</td>
                    </tr>
                    <tr>
                        <td>Wind</td>
                        <td>${hours[0].wind_kph} kph</td>
                        <td>${hours[3].wind_kph} kph</td>
                        <td>${hours[6].wind_kph} kph</td>
                        <td>${hours[9].wind_kph} kph</td>
                        <td>${hours[12].wind_kph} kph</td>
                        <td>${hours[15].wind_kph} kph</td>
                        <td>${hours[18].wind_kph} kph</td>
                        <td>${hours[21].wind_kph} kph</td>
                    </tr>
                    <tr>
                        <td>Precip</td>
                        <td>${hours[0].precip_in} in</td>
                        <td>${hours[3].precip_in} in</td>
                        <td>${hours[6].precip_in} in</td>
                        <td>${hours[9].precip_in} in</td>
                        <td>${hours[12].precip_in} in</td>
                        <td>${hours[15].precip_in} in</td>
                        <td>${hours[18].precip_in} in</td>
                        <td>${hours[21].precip_in} in</td>

                    </tr>
                    <tr>
                        <td>Cloud</td>
                        <td>${hours[0].cloud}%</td>
                        <td>${hours[3].cloud}%</td>
                        <td>${hours[6].cloud}%</td>
                        <td>${hours[9].cloud}%</td>
                        <td>${hours[12].cloud}%</td>
                        <td>${hours[15].cloud}%</td>
                        <td>${hours[18].cloud}%</td>
                        <td>${hours[21].cloud}%</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td>${hours[0].humidity}%</td>
                        <td>${hours[3].humidity}%</td>
                        <td>${hours[6].humidity}%</td>
                        <td>${hours[9].humidity}%</td>
                        <td>${hours[12].humidity}%</td>
                        <td>${hours[15].humidity}%</td>
                        <td>${hours[18].humidity}%</td>
                        <td>${hours[21].humidity}%</td>
                    </tr>
                    <tr>
                        <td>Pressure</td>
                        <td>${hours[0].pressure_in} in</td>
                        <td>${hours[3].pressure_in} in</td>
                        <td>${hours[6].pressure_in} in</td>
                        <td>${hours[9].pressure_in} in</td>
                        <td>${hours[12].pressure_in} in</td>
                        <td>${hours[15].pressure_in} in</td>
                        <td>${hours[18].pressure_in} in</td>
                        <td>${hours[21].pressure_in} in</td>
                    </tr>
                </table>
      
            `
    forecastContainer.appendChild(detailedWeatherBox);
    forecastContainer.appendChild(detailedParametersBox);
}