function attachEvents() {
    let basicURL = `https://judgetests.firebaseio.com/locations.json`;
    let getBtn = document.getElementById('submit');
    let locationInput = document.getElementById('location');
    let obj;
    let conditions = {
        "Sunny": `&#x2600`,
        "Partly sunny": `&#x26C5`,
        "Overcast": `&#x2601`,
        "Rain": `&#x2614`,
        "Degrees": `&#176`
    }
    let divCurrent = document.getElementById('current');
    let divForecast = document.getElementById('forecast');
    let divupcoming = document.getElementById('upcoming');
    getBtn.addEventListener('click', () => {
        fetch(`${basicURL}`)
            .then(res => res.json())
            .then(data => {
                let current = data.find(x => x.name == locationInput.value);
                if (current !== undefined) {
                    obj = current.code;
                    let promiseOne = fetch(`https://judgetests.firebaseio.com/forecast/today/${obj}.json`)
                        .then(res => res.json());
                    let promiseTwo = fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${obj}.json`)
                        .then(res => res.json())

                    Promise.all([promiseOne, promiseTwo])
                        .then(([dataOne, data]) => {
                            divForecast.style = "display: block";
                            let newDivForecast = document.createElement('div');
                            newDivForecast.classList = 'forecast';
                            newDivForecast.innerHTML = `<span class= "condition symbol">${conditions[dataOne.forecast.condition]}</span>
                <span class = "condition">         
                <span class = "forecast-data">${dataOne.name}</span>
                <span class = "forecast-data">${dataOne.forecast.low}°/${dataOne.forecast.high}°</span>
                <span class = "forecast-data">${dataOne.forecast.condition}</span></span>`
                            divCurrent.appendChild(newDivForecast);
                            let newDivUpcoming = document.createElement('div');
                            newDivUpcoming.classList = "forecast-info";
                            newDivUpcoming.innerHTML = `<span class = "upcoming">
                <span class = "symbol">${conditions[data.forecast[0].condition]}</span>
                <span class = "forecast-data">${data.forecast[0].low}°/${data.forecast[0].high}°</span>
                <span class = "forecast-data">${data.forecast[0].condition}</span>
                <span class = "symbol">${conditions[data.forecast[1].condition]}</span>
                <span class = "forecast-data">${data.forecast[1].low}°/${data.forecast[1].high}°</span>
                <span class = "forecast-data">${data.forecast[1].condition}</span>
                <span class = "symbol">${conditions[data.forecast[2].condition]}</span>
                <span class = "forecast-data">${data.forecast[2].low}°/${data.forecast[2].high}°</span>
                <span class = "forecast-data">${data.forecast[2].condition}</span></span>`
                            divupcoming.appendChild(newDivUpcoming);
                        })
                } else {
                    divForecast.style = "display: block";
                    divCurrent.innerHTML = 'Error';
                }
            })
    })
}
attachEvents();