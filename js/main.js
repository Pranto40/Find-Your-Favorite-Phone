
  // Search Handler
  const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", () => {
    const searchField = document.getElementById("search-field");
  
    // Error Handling
    const errorDiv = document.getElementById("error-message");
    if (searchField.value == "") {
      errorDiv.innerText = "Please write something to search";
    }
    else if (searchField.value < 0) {
      searchField.value = "";
      errorDiv.innerText = "Please write a positive number";
    }
     else {
      errorDiv.innerText = "";

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
        const first20Data = phoneList.slice(0, 20);
        const phonesFromData = first20Data;
        const resultCount = document.getElementById("result-count");
        if (phonesFromData.length > 1) {
          resultCount.innerHTML = `${first20Data.length} results found for "<strong>${searchField.value}</strong>"`;
        } else if (phonesFromData.length == 1) {
          resultCount.innerHTML = `${first20Data.length} result found for "<strong>${searchField.value}</strong>"`;
        }
  
        searchField.value = "";
        resultContainer.textContent = "";
  
        // Show Results
        for (const phone of first20Data) {
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
        };
      };
    };
  });
  