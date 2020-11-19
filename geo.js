/**
 *   <main class="box flex">
        <section>
            <h1>Geo Location App</h1>
            <h2>Find out where you are</h2>
            <button id="geoButton">Get your location!</button>
            <div class="position">
                location
            </div>
        </section>
    </main>
 */

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
                let latitude = pos.coords.latitude;
                let longitude = pos.coords.longitude;
                message.innerHTML = `You are at ${latitude}, ${longitude}.`;
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