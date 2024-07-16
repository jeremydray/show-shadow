
//Event Search
//'https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=EGPaeJvEARHDtDujZj2YKE5LyNqeJry5'

//Get event details
//'https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=EGPaeJvEARHDtDujZj2YKE5LyNqeJry5'

//Get event images
//https://app.ticketmaster.com/discovery/v2/events/k7vGFKzleBdwS/images.json?apikey=EGPaeJvEARHDtDujZj2YKE5LyNqeJry5

function getVenueData(city) {

    const zipSearch = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&radius=100&size=30&classificationName=music&apikey=EGPaeJvEARHDtDujZj2YKE5LyNqeJry5`;
    fetch(zipSearch)
        .then(function (response) {
            console.log(response.json());
        })
}

console.log(getVenueData('Dallas'));




