// Search Handler
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
  const searchField = document.getElementById("search-field");

    // Load Phones API
    const loadPhones = () => {
      const url = `https://openapi.programming-hero.com/api/phones?search=${searchField.value}`;
        fetch(url)
        .then((res) => res.json())
        .then((data) => displayPhones(data.data))
    };
    loadPhones();

    // Display Phones
    const displayPhones = (phoneList) => {
      const resultContainer = document.getElementById("result-container");

      // Show Results ........
      phoneList.forEach((phone) => {
        const createDiv = document.createElement("div");
        createDiv.classList.add("col");
        createDiv.innerHTML = `
          <div class="card shadow border-0 p-2">
              <img src="${phone.image}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h4>Phone Brand: ${phone.brand}</h4>  
                  <h4 class="card-title">Phone Name: ${phone.phone_name}</h4>
                  <h5 class="mb-3">${phone.slug}</h5>
                  <button type="button" class="btn btn-success" onclick="phoneDetails()">More Details</button>
              </div>
          </div>
        `;
        resultContainer.appendChild(createDiv);
      });
    };
});