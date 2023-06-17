#  🌦️ WEATHER-FORECAST

***
# Simple Weather-App! ☔

> "Weather-forecast" project is a simple project made with the help of HTML, CSS and JS and displays data from Weather-API.  Weather app that allows you to get current weather, 7-day weather forecast  and detailed changes in 24-hour weather data, based on the city. The project adapted according to Ankara weather conditions and implemented using pure JavaScript, does not include any frameworks or libraries.

<video src="https://github.com/emektarkubra/weather-forecast/assets/124355274/627492f9-e3d9-42ac-aad5-9b39da92b948" controls="controls" >
</video>

***

## 🛠️ Built With

* HTML
* CSS
* Javascript

## 🌟 Features

* Display current weather 
* Display 7 day weather forecast
* Display 24 hour weather forecast
* Change background according to the weather 

![snow](https://github.com/emektarkubra/weather-forecast/assets/124355274/a91dc8bb-7dfd-407c-95df-f9a465ff583c)

## 💦 Weather API

A Weather API that returns information about current and forecast weather datas.

Visit the main page of this API (that comes by default with json-server) after login and get API key:

[http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7](http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7)

### Endpoints

Endpoints may change depending on the number of days, to the city and whether it is current, forecast or both;

So to get current weather for London: (JSON)

[http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London](http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London)

To get 7 day weather for US Zipcode 07112: (JSON)

[http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7](http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7)

Search for cities starting with Lond: (JSON)

[http://api.weatherapi.com/v1/search.json?key=<YOUR_API_KEY>&q=lond](http://api.weatherapi.com/v1/search.json?key=<YOUR_API_KEY>&q=lond)

### How to use
Here is a JavaScript example of fetching the entire API. Just change the URL or key and endpoint for fetching different APIs

```javascript
function getDataFromAPI(url) {
    return new Promise((resolve, reject) => {
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
}

getDataFromAPI(`http://api.weatherapi.com/v1/forecast.json?key=3c5c01d2237a4ab5a79125234231506&q=07112&days=7&q=Ankara`)
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
        console.log(err);
    })
```

## 🚀 Getting Started

There are no prerequisites for this project.

Clone Repository using;
```javascript
git clone git@github.com:emektarkubra/weather-forecast.git
```
or
```javascript
git clone https://github.com/emektarkubra/weather-forecast.git
```
After clone, open index.html in your extended browser.

***

## 👷‍♀️ Authors

### Kübra Emektar

**Github** : [@github](https://github.com/emektarkubra)
**Linkedln** : [Linkedln](https://www.linkedin.com/in/kübra-emektar-184103267/)

## 🙋‍♀️ Show your support

Give a ⭐️ if you like this project!

***

> Lots of sunshine and coding days 🌞


