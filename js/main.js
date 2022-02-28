// Search Handler
const searchBtn = document.getElementById('search-btn')
searchBtn.addEventListener('click', () => {
    const searchField = document.getElementById('search-field');

    // Load Phone APi ..........
    const loadPhones = () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField.value}`;
        fetch(url)
        .then((res) => res.json())
        .then((data) => console.log(data))
    };
        loadPhones();
});