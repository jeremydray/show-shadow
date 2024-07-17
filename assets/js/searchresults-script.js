
//Event Search
//'https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=EGPaeJvEARHDtDujZj2YKE5LyNqeJry5'

//Get event details
//'https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=EGPaeJvEARHDtDujZj2YKE5LyNqeJry5'

//Get event images
//https://app.ticketmaster.com/discovery/v2/events/k7vGFKzleBdwS/images.json?apikey=EGPaeJvEARHDtDujZj2YKE5LyNqeJry5

async function getVenueData(city) {

    const citySearchUrl = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&radius=100&size=30&classificationName=music&apikey=EGPaeJvEARHDtDujZj2YKE5LyNqeJry5`;
    const eventInfo = await fetch(citySearchUrl)
    const eventData = await eventInfo.json();
    return eventData._embedded.events
    // .then(function (response) {
    //     console.log(response.json());
    //     // displayVenueData(response)
    // })
}

getVenueData('Dallas').then(function (events) {
    console.log(events);
    for (let i = 0; i < 3; i++) { //change to events length
        console.log(events[i].name);
        console.log(events[i].dates.start.localDate);
        console.log(events[i].url);
        console.log(events[i]._embedded.venues[0].location.latitude);
        console.log(events[i]._embedded.venues[0].location.longitude);
    }
})



// console.log(test)


// function displayVenueData(responseObj) {
//     let response {
//         venueName: responseObj._embedded.events[0].name,
//     }
// }
// console.log(responseData.name)

