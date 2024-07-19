const contentEl = document.querySelector('.content');
const searchEl = document.querySelector('.userSubmission')
const submitEl = document.querySelector('#submission')
const previousSearchEl = document.querySelector('.previousSearches')
const resultsButtonEl = document.querySelector('.searchedCities')

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
    const searchedCity = JSON.parse(localStorage.getItem('citySearch'));
    // console.log(searchedCity);
    searchedCity.push(userSearch);
    localStorage.setItem('citySearch', JSON.stringify(searchedCity))
    contentEl.innerHTML = ""
    getVenueData(userSearch);
}

function previousResultClick(event) {
    event.preventDefault();
    const previousSearch = event.target.getAttribute("value")
    contentEl.innerHTML = ""
    getVenueData(previousSearch);
}

function getVenueData(city) {
    const citySearchUrl = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&radius=100&size=30&classificationName=music&sort=date,asc&apikey=EGPaeJvEARHDtDujZj2YKE5LyNqeJry5`;
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
            eventCard.classList.add('container.is-max-desktop', 'event-card')

            // console.log(responseObj._embedded.events[i].name);
            const eventName = document.createElement('h3');
            eventName.classList.add('event-name');
            eventName.innerHTML = responseObj._embedded.events[i].name;

            // console.log(responseObj._embedded.events[i].dates.start.localDate);
            const eventDate = document.createElement('h4');
            eventDate.classList.add('event-date')
            eventDate.innerHTML = `Date: ${responseObj._embedded.events[i].dates.start.localDate}`;

            // console.log(responseObj._embedded.events[i]._embedded.venues[0].name);
            const venueLocation = document.createElement('h4');
            venueLocation.classList.add('venue-location')
            venueLocation.innerHTML = `Venue: ${responseObj._embedded.events[i]._embedded.venues[0].name}`

            // console.log(responseObj._embedded.events[i].url);
            const webLink = document.createElement('a');
            webLink.classList.add('web-link');
            webLink.setAttribute('href', responseObj._embedded.events[i].url)
            webLink.innerHTML = "Click here to buy tickets!"

            // console.log(responseObj._embedded.events[i]._embedded.venues[0].name);
            const eventImage = document.createElement('div');
            eventImage.classList.add('event-image', 'image');
            eventImage.innerHTML = `<img src=${responseObj._embedded.events[i].images[0].url}>`


            eventCard.append(eventName, eventDate, venueLocation, webLink, eventImage);
            contentEl.append(eventCard);
        }
    }
}

// console.log(events[i]._embedded.venues[0].location.latitude);
// console.log(events[i]._embedded.venues[0].location.longitude);

submitEl.addEventListener('click', searchResultClick);

previousSearchEl.addEventListener('click', previousResultClick);
