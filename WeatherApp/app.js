window.addEventListener('load', () =>{

    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    let tempSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/6c227d7cb659b67fccccbb09463a60c0/${lat},${long}`;


            fetch(api)
            .then(response => {return response.json();})
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                
                // SET DOM elements here

                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone = data.timezone;

                // Formula for celcius
                let celcius = ((temperature - 32) * (5 / 9)).toFixed(2);

                // SET icons

                setIcons(icon, document.querySelector('.icon'));

                // Change temperature unit
                degreeSection.addEventListener('click', () => {
                    if(tempSpan.textContent === 'F'){
                        temperatureDegree.textContent = celcius;
                        tempSpan.textContent = 'C';
                    } else{
                        temperatureDegree.textContent = temperature;
                        tempSpan.textContent = 'F';
                    }
                });

            });

        });

    }


    function setIcons(icon, iconID){
        const skyCons = new Skycons({color : "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skyCons.play();
        return skyCons.set(iconID, Skycons[currentIcon]);
    };

});