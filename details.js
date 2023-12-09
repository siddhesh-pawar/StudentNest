class ApartmentManager {
    constructor() {
        this.apartmentDetails = this.retrieveDetailsFromLocalStorage() || [];
        this.initializeListeners();
        this.displayDetails();
    }

    retrieveDetailsFromLocalStorage() {
        const storedDetails = localStorage.getItem("apartmentDetails");
        return storedDetails ? JSON.parse(storedDetails) : null;
    }

    initializeListeners() {
        document.getElementById("sortByPrice").addEventListener("change", () => this.handleFilterChange());
        document.getElementById("filterByName").addEventListener("change", () => this.handleFilterChange());
        document.getElementById("filterByPets").addEventListener("change", () => this.handleFilterChange());
        document.getElementById("filterByBedrooms").addEventListener("change", () => this.handleFilterChange());
        document.getElementById("applyFiltersBtn").addEventListener("click", () => this.handleApplyFilters());
    }

    displayDetails() {
        const detailsDiv = document.getElementById("details");
        detailsDiv.innerHTML = "<h2>All Apartment Details</h2>";

        this.apartmentDetails.forEach((details, index) => {
            const apartmentSection = this.createApartmentSection(details, index);
            detailsDiv.appendChild(apartmentSection);
        });
    }

    createApartmentSection(details, index) {
        const apartmentSection = document.createElement("article");
        apartmentSection.classList.add("apartment-section");

        const apartmentDetailsDiv = document.createElement("div");
        apartmentDetailsDiv.classList.add("apartment-details");

        apartmentDetailsDiv.innerHTML = `
            <p><strong>Apartment ${index + 1}:</strong></p>
            <p><strong>Name:</strong> ${details.name}</p>
            <p><strong>Location:</strong> ${details.location}</p>
            <p><strong>Price:</strong> ${this.formatPrice(details.price)}</p>
            <h2>Student Details</h2>
            <p><strong>Student Name:</strong> ${details.studentName}</p>
            <p><strong>Student Email:</strong> ${details.studentEmail}</p>
            <p><strong>Student Contact:</strong> ${details.studentContact}</p>
            <h2>Apartment Additional Information</h2>
            <p><strong>Apartment Number:</strong> ${details.apartmentNumber}</p>
            <p><strong>Number of Bedrooms:</strong> ${details.numBedrooms}</p>
            <p><strong>Pets:</strong> ${details.pets}</p>
        `;

        apartmentSection.appendChild(apartmentDetailsDiv);
        return apartmentSection;
    }
    function sortAndFilterDetails(detailsArray, sortByPrice, filterByName, filterByPets, filterByBedroomsCount) {
        // Sort by price
        if (sortByPrice === "ascending") {
            detailsArray.sort((a, b) => a.price - b.price);
        } else if (sortByPrice === "descending") {
            detailsArray.sort((a, b) => b.price - a.price);
        }
    
        // Filter by apartment name
        if (filterByName !== "all") {
            detailsArray = detailsArray.filter(details => details.name === filterByName);
        }
    
        // Filter by pet preferences
        if (filterByPets !== "all") {
            detailsArray = detailsArray.filter(details => details.pets === filterByPets);
        }
    
        // Filter by number of bedrooms
        if (filterByBedroomsCount !== "all") {
            detailsArray = detailsArray.filter(details => details.numBedrooms === filterByBedroomsCount);
        }
    
        return detailsArray;
    }
    
    // Initial display on page load
    var storedDetails = localStorage.getItem("apartmentDetails");
    var initialDetailsArray = storedDetails ? JSON.parse(storedDetails) : [];
    displayDetails(initialDetailsArray);

    // Add event listeners to trigger the displayDetails function when user input changes
    document.getElementById("sortByPrice").addEventListener("change", function () {
        var filteredDetailsArray = sortAndFilterDetails(initialDetailsArray, this.value, document.getElementById("filterByName").value, document.getElementById("filterByPets").value, document.getElementById("filterByBedrooms").value);
        displayDetails(filteredDetailsArray);
    });
    
    document.getElementById("filterByName").addEventListener("change", function () {
        var filteredDetailsArray = sortAndFilterDetails(initialDetailsArray, document.getElementById("sortByPrice").value, this.value, document.getElementById("filterByPets").value, document.getElementById("filterByBedrooms").value);
        displayDetails(filteredDetailsArray);
    });
    
    document.getElementById("filterByPets").addEventListener("change", function () {
        var filteredDetailsArray = sortAndFilterDetails(initialDetailsArray, document.getElementById("sortByPrice").value, document.getElementById("filterByName").value, this.value, document.getElementById("filterByBedrooms").value);
        displayDetails(filteredDetailsArray);
    });
    
    document.getElementById("filterByBedrooms").addEventListener("change", function () {
        var filteredDetailsArray = sortAndFilterDetails(initialDetailsArray, document.getElementById("sortByPrice").value, document.getElementById("filterByName").value, document.getElementById("filterByPets").value, this.value);
        displayDetails(filteredDetailsArray);
    });

    document.getElementById("applyFiltersBtn").addEventListener("click", function () {
        // Get the selected values from dropdowns
        var sortByBedrooms = document.getElementById("sortByBedrooms").value;
        var filterByName = document.getElementById("filterByName").value;
        var filterByPets = document.getElementById("filterByPets").value;
        var filterByBedroomsCount = document.getElementById("filterByBedrooms").value;

        // Apply filters and display details
        var filteredDetailsArray = sortAndFilterDetails(initialDetailsArray, sortByBedrooms, filterByName, filterByPets, filterByBedroomsCount);
        displayDetails(filteredDetailsArray);
    });
});
