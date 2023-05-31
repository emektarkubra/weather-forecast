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


function get(day) {

    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=31102415b6534b21a47133156232605&q=Ankara&days=${day}&aqi=no&alerts=no`

    getDataFromAPI(apiUrl)
        .then((data) => {
            createElement(data, day);

        })
        .catch((err) => {
            console.log(err);
        })
}


get("1");

function createElement(data, day) {

    // select-form

    const selectForm = document.createElement("div");
    selectForm.className = "select-form";

    const select = document.createElement("select");
    select.name = "city";
    select.id = "cities";

    const option1 = document.createElement("option");
    option1.value = "Ankara";
    option1.textContent = "Ankara";

    const option2 = document.createElement("option");
    option2.value = "İstanbul";
    option2.textContent = "İstanbul";

    if (option1.selected) {
        option1.selected == true;
    } else if (option2.selected) {
        option2.selected == true;
    }

    const container = document.querySelector(".container")
    container.appendChild(selectForm);
    selectForm.appendChild(select);
    select.appendChild(option1);
    select.appendChild(option2);

    // date-inform


    const dateInform = document.createElement("div");
    dateInform.className = "date-inform";

    const today = document.createElement("div");
    today.className = "today";
    let days = ["SUNDAY", "MONDAY", "THUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    let date = new Date();
    today.textContent = days[date.getDay()];

    const currentDate = document.createElement("div");
    currentDate.className = "current-date";
    currentDate.textContent = data.current.last_updated;

    container.appendChild(dateInform);
    dateInform.appendChild(today);
    dateInform.appendChild(currentDate);

    // current

    //weather condition

    const current = document.createElement("div");
    current.className = "current";

    const weatherCondition = document.createElement("div");
    weatherCondition.className = "weather-condition";

    const currentIcon = document.createElement("div");
    currentIcon.className = "current-icon";


    const currentImg = document.createElement("img");
    currentImg.src = data.current.condition.icon;
    currentImg.alt = "image not found";

    const currentTemp = document.createElement("div");
    currentTemp.className = "current-temperature";

    const temp = document.createElement("h3");
    temp.textContent = data.current.temp_c;

    const celcius = document.createElement("div");
    celcius.className = "celcius";
    celcius.textContent = "°C";

    const fahrenheit = document.createElement("div");
    fahrenheit.className = "fahrenheit";
    fahrenheit.textContent = "°F";

    const text = document.createElement("p");
    text.textContent = data.current.condition.text;

    const information = document.createElement("div");
    information.className = "information";

    information.innerHTML = `
    <table>
        <tr>
            <td>Precip: ${data.current.precip_in} in</td>
        </tr>
        <tr>
            <td>Humidity: ${data.current.humidity}%</td>
        </tr>
        <tr>
            <td>Wind: ${data.current.wind_kph} kph</td>
        </tr>
    </table>
    `

    container.appendChild(current);
    current.appendChild(weatherCondition);
    weatherCondition.appendChild(currentIcon);
    currentIcon.appendChild(currentImg);
    weatherCondition.appendChild(currentTemp);
    currentTemp.appendChild(temp);
    currentTemp.appendChild(celcius);
    currentTemp.appendChild(fahrenheit);
    currentTemp.appendChild(text);
    current.appendChild(information);

    // forecast

    const forecast = document.createElement("div");
    forecast.className = "forecast";

    const forecastDay = document.createElement("div");
    forecastDay.className = "forecast-day";

    const dayName = document.createElement("div");
    dayName.className = "day";
    dayName.textContent = days[date.getDay()];

    const icon = document.createElement("div");
    icon.className = "icon";

    const img1 = document.createElement("img");
    img1.src = data.forecast.forecastday[0].day.condition.icon;
    img1.alt = "image not found";

    const lightTemp1 = document.createElement("h4");
    lightTemp1.textContent = `${data.forecast.forecastday[0].day.maxtemp_c}°`;

    const nightTemp1 = document.createElement("h4");
    nightTemp1.textContent = `${data.forecast.forecastday[0].day.mintemp_c}°`;

    container.appendChild(forecast)
    forecast.appendChild(forecastDay);
    forecastDay.appendChild(dayName);
    forecastDay.appendChild(icon);
    icon.appendChild(img1);
    forecastDay.appendChild(lightTemp1);
    forecastDay.appendChild(nightTemp1);

}