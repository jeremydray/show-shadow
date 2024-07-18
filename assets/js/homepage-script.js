const submitEl = document.querySelector('#initial-Search')
const searchEl = document.querySelector('#userSearchValue')

window.onload = localStorage.clear();

submitEl.addEventListener('click', searchResultSwitch)

function searchResultSwitch(event) {
    event.preventDefault();
    const userSearch = searchEl.value;
    let citySearch = [];
    citySearch.push(userSearch);
    localStorage.setItem('citySearch', JSON.stringify(citySearch))
    location.href = "search-results.html"
};