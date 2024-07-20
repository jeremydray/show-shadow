const contentEl = document.querySelector('.content');
const searchEl = document.querySelector('.userSubmission')
const submitEl = document.querySelector('#submission')
const previousSearchEl = document.querySelector('.previousSearches')
const resultsButtonEl = document.querySelector('.searchedCities')
const mapLocationEl = document.querySelector('#map')

window.onload =
    function searchResultSwitch(event) {
        event.preventDefault();
        const searchValue = JSON.parse(localStorage.getItem('citySearch'));
        // console.log(searchValue);
        getVenueData(searchValue);
    }

function searchResultClick(event) {
    event.preventDefault();
    const userSearch = searchEl.value;
    if (!userSearch) {

    }
    const searchedCity = JSON.parse(localStorage.getItem('citySearch'));
    // console.log(searchedCity);
    searchedCity.push(userSearch);
    localStorage.setItem('citySearch', JSON.stringify(searchedCity))
    contentEl.innerHTML = ""
    getVenueData(userSearch);
    getMapLocation(userSearch);
}

function previousResultClick(event) {
    event.preventDefault();
    const previousSearch = event.target.getAttribute("value")
    contentEl.innerHTML = ""
    getVenueData(previousSearch);
}

function getVenueData(city) {
    const citySearchUrl = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&radius=100&size=15&classificationName=music&sort=date,asc&apikey=EGPaeJvEARHDtDujZj2YKE5LyNqeJry5`;
    fetch(citySearchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (responseObj) {
            // console.log(responseObj);
            getVenueInfo(responseObj)
        })
}

function getVenueInfo(responseObj) {
    const savedSearches = JSON.parse(localStorage.getItem('citySearch'));
    previousSearchEl.innerHTML = ""
    if (!savedSearches) { return } else {
        for (let i = 0; i < savedSearches.length; i++) {
            const saveButtons = document.createElement('button')
            saveButtons.classList.add('button', 'is-primary', 'is-dark', 'searchedCities')
            saveButtons.setAttribute('value', `${savedSearches[i]}`)
            saveButtons.append(savedSearches[i]);
            previousSearchEl.append(saveButtons)
        }
    }

    if (responseObj.page.totalElements === 0) {
        const noResults = document.createElement('h2');
        noResults.textContent = "Error: No Results Found"
        contentEl.append(noResults)
    } else {
        for (let i = 0; i < responseObj._embedded.events.length; i++) {
            const eventCard = document.createElement('div');
            eventCard.classList.add('container.is-widescreen', 'event-card')
            // eventCard.setAttribute('id', 'map')

            // console.log(responseObj._embedded.events[i].name);
            const eventName = document.createElement('h3');
            eventName.classList.add('event-name', 'is-size-2', 'is-underlined');
            eventName.innerHTML = responseObj._embedded.events[i].name;

            // console.log(responseObj._embedded.events[i].dates.start.localDate);
            const eventDate = document.createElement('h4');
            eventDate.classList.add('event-date')
            eventDate.innerHTML = `Date: ${responseObj._embedded.events[i].dates.start.localDate}`;

            // console.log(responseObj._embedded.events[i]._embedded.venues[0].name);
            const venueLocation = document.createElement('h4');
            venueLocation.classList.add('venue-location')
            venueLocation.innerHTML = `Venue: ${responseObj._embedded.events[i]._embedded.venues[0].name}, ${responseObj._embedded.events[i]._embedded.venues[0].address.line1}`

            // console.log(responseObj._embedded.events[i].url);
            const webLink = document.createElement('a');
            webLink.classList.add('button', 'web-link', 'is-link', 'is-warning');
            webLink.setAttribute('href', responseObj._embedded.events[i].url)
            webLink.innerHTML = "Click here to buy tickets!"

            // console.log(responseObj._embedded.events[i]._embedded.venues[0].name);
            const eventImage = document.createElement('div');
            eventImage.classList.add('event-image', 'image');
            eventImage.innerHTML = `<img src=${responseObj._embedded.events[i].images[0].url}>`

            const eventLocation = document.createElement('div');
            eventLocation.classList.add('event-location', 'map');

            const eventLon = responseObj._embedded.events[i]._embedded.venues[0].location.latitude
            const eventLat = responseObj._embedded.events[0]._embedded.venues[0].location.longitude

            let map = L.map(eventLocation).setView([eventLon, eventLat], 18);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map)
            L.marker([eventLon, eventLat]).addTo(map)
            setTimeout(function () {
                window.dispatchEvent(new Event('resize'));
            }, 1000);

            const imageMapContainer = document.createElement('div')
            imageMapContainer.classList.add('image-map');

            eventLocation.append(map)
            imageMapContainer.append(eventImage, eventLocation)
            eventCard.append(eventName, eventDate, venueLocation, webLink, imageMapContainer);
            contentEl.append(eventCard);


        }
    }
}

// function getMapLocation(eventDetails) {
//     console.log(eventDetails)
//     const eventLocation = document.createElement('div');
//     eventLocation.classList.add('event-location', 'map');
//     const map = L.map('map').setView([51.505, -0.09], 13);
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);
//     const marker = L.marker([51.5, -0.09]).addTo(map);
// }



submitEl.addEventListener('click', searchResultClick);

previousSearchEl.addEventListener('click', previousResultClick);
