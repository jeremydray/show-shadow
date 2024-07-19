const submitEl = document.querySelector('#initial-Search')
const searchEl = document.querySelector('#userSearchValue')
const errorEl = document.querySelector('#error-modal')

window.onload = localStorage.clear();

submitEl.addEventListener('click', searchResultSwitch)


function searchResultSwitch(event) {
    event.preventDefault();
    const userSearch = searchEl.value;
    // if (!userSearch) {

    //     return
    // }
    let citySearch = [];
    citySearch.push(userSearch);
    localStorage.setItem('citySearch', JSON.stringify(citySearch))
    location.href = "search-results.html"
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('welcomeModal');
    const closeModalBtn = document.querySelector('.delete');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    // Function to open the modal
    const openModal = () => {
        modal.classList.add('is-active');
    };
    // Function to close the modal
    const closeModal = () => {
        modal.classList.remove('is-active');
    };
    // Open the modal when the page loads
    openModal();
    // Add event listeners to close the modal
    closeModalBtn.addEventListener('click', closeModal);
    modalCloseBtn.addEventListener('click', closeModal);
})

