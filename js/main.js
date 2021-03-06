// Spinner
function spinnerControl(remove, add) {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove(remove);
  spinner.classList.add(add);
};
  // Search Handler
  const searchBtn = document.getElementById("search-btn");
  searchBtn.addEventListener("click", () => {
  const searchField = document.getElementById("search-field");
  
    // Error Handling
    const resultCount = document.getElementById("result-count");
    const errorDiv = document.getElementById("error-message");
    if (searchField.value == "") {
      errorDiv.innerText = "Please write something to search";
      resultCount.innerText = '';
    }
    else if (searchField.value < 0) {
      searchField.value = "";
      errorDiv.innerText = "Please write a positive number";
      resultCount.innerText = '';
    }
     else {
      errorDiv.innerText = "";

      spinnerControl("d-none", "d-block");

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
        spinnerControl("d-block", "d-none");
        const phonesFromData = first20Data;
        const resultCount = document.getElementById("result-count");
        if (phonesFromData.length > 1) {
          resultCount.innerHTML = `${first20Data.length} results found for "<strong>${searchField.value}</strong>"`;
        } else if (phonesFromData.length == 1) {
          resultCount.innerHTML = `${first20Data.length} result found for "<strong>${searchField.value}</strong>"`;
        }
  
        // const resultCount = document.getElementById("result-count");
        else if (phoneList.length == 0) {
          searchField.value = "";
          const resultContainer = document.getElementById("result-container");
          resultContainer.textContent = "";
          let errorMessage = "No result found ";
          resultCount.innerText = errorMessage;
        }
        searchField.value = "";
        resultContainer.textContent = "";
  
        // Show Results
        for (const phone of first20Data) {
          resultCount.innerText = '';
          const createDiv = document.createElement("div");
          createDiv.classList.add("col");
        createDiv.innerHTML = `
          <div class="card shadow border-0 p-2">
              <img src="${phone.image}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h4>Phone Brand: ${phone.brand}</h4>  
                  <h4 class="card-title">Phone Name: ${phone.phone_name}</h4>
                  <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#phone-details" onclick="phoneDetails('${phone.slug}')">More Details</button>
              </div>
          </div>
        `;
          resultContainer.appendChild(createDiv);
        };
      };
    };
  });


// phone Details Modal

const phoneDetails = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};

const displayPhoneDetails = (phoneDetails) => {
  console.log(phoneDetails);
  const parentDetailsContainer = document.getElementById("modal-dialog-box");
  const modalContent = document.createElement("div");
  modalContent.classList.add("row", "g-0");
  modalContent.innerHTML = `
  <div class="col-md-4 mt-5">
  <img class="mt-5" src="${phoneDetails.image}" alt="...">
  </div>
      <div class="col-md-8">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="card-body text-start">
                <h3 class="card-title mt-3">Phone Name: ${(phoneDetails.name)}</h3>
                <h4 class="card-text">Release Date: ${(phoneDetails.releaseDate)}</h4>
                <h4>Main Features</h4>
                <ul>
                <li>Chip Set: ${(phoneDetails.mainFeatures.chipSet)}</li>
                <li>Memory: ${(phoneDetails.mainFeatures.memory)}</li>
                <li>Storage: ${(phoneDetails.mainFeatures.storage)}</li>
                <li>Display Size: ${(phoneDetails.mainFeatures.displaySize)}</li>
               </ul>
               <h4>Others Features</h4>
               <ul>
               <li>Bluetooth: ${(phoneDetails.others.Bluetooth)}</li>
               <li>GPS: ${(phoneDetails.others.GPS)}</li>
               <li>NFC: ${(phoneDetails.others.NFC)}</li>
               <li>Radio: ${(phoneDetails.others.Radio)}</li>
               <li>USB: ${(phoneDetails.others.USB)}</li>
               <li>WLAN: ${(phoneDetails.others.WLAN)}</li>
               </ul>

          </div>
      </div>
  `;
  parentDetailsContainer.textContent = "";
  parentDetailsContainer.appendChild(modalContent);
};