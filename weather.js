function getData(url) {

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

getData("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]")
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })