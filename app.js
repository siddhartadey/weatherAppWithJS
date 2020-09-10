window.addEventListener('load', () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7e8e95f1c23fb6df23a73925c05e64e2`;

            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const temp = data.main.temp - 273.15;
                    const disc = data.weather[0].description;
                    const city = data.name;
                    const wetherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                    console.log(city);
                    document.querySelector(
                        '.temperature-degree'
                    ).textContent = temp;
                    document.querySelector(
                        '.temperature-description'
                    ).textContent = disc;
                    document.querySelector(
                        '.location-timezone'
                    ).textContent = city;
                    document
                        .querySelector('#icon')
                        .setAttribute('src', wetherIcon);
                    const degree = document.querySelector('.degree-section');
                    degree.addEventListener('click', () => {
                        if (
                            document.querySelector('.temperature-symbol')
                                .textContent != 'F'
                        ) {
                            ctof();
                        } else {
                            ftoc();
                        }
                    });
                    function ctof() {
                        document.querySelector(
                            '.temperature-degree'
                        ).textContent = (temp * 9) / 5 + 32;
                        document.querySelector(
                            '.temperature-symbol'
                        ).textContent = 'F';
                    }
                    function ftoc() {
                        document.querySelector(
                            '.temperature-degree'
                        ).textContent = temp;
                        document.querySelector(
                            '.temperature-symbol'
                        ).textContent = 'C';
                    }
                });
        });
    }
});
