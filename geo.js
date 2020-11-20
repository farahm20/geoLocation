 const geoButton = document.querySelector("#geoButton");
 geoButton.addEventListener('click', () => {
     console.log('Geo button clicked');
     const message = document.querySelector('.position');

     if('geolocation' in navigator){
        const geo = navigator.geolocation;
        console.log('Geolocation', geo);
        geo.getCurrentPosition(
            pos => {
                console.log('Got position: ', pos);
                let lat = pos.coords.latitude;
                let lng = pos.coords.longitude;
                message.innerHTML = `You are at ${lat}, ${lng}.`;
                getAddressFromPosition(lat,lng, message)
            },
            error => {
                console.log('could not get position: ', error);
                message.innerHTML = 'Please allow location';
            }
        )
     }else{
         message.innerHTML = 'This device does not have access to the GeoLocation API.';
     }
 })

 //Reverse geocoding
 //make a async response function
 async function getAddressFromPosition(lat, lng, message) {
//    http://open.mapquestapi.com/geocoding/v1/reverse?key=KEY&location=30.333472,-81.470448&includeRoadMetadata=true&includeNearestIntersection=true


     //fetch (returns a promise) the api address and save answer in variable response
     try {
         //This API will fail if others are using it at the same time. 
         const response = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
         //convert response as json and save in data
         const data = await response.json();

        if(data.error){
            message.innerHTML += `<br> Can not get location at this time. Please try again later.`;
        }else {
            //console.log('getAddressFromPosition: data=', data);
            const city = data.city, country = data.country;
            message.innerHTML += `<br> Located in:  ${city}, ${country}`;
        }
     }catch(e) {
         //console.log('getAddressFromPosition error', error.message);
         message.innerHTML += `<br> Can not find your city.`
     }
 }
 //https://geocode.xyz/51.50354,-0.12768?geoit=xml'