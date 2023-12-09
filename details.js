class ApartmentManager {
    constructor() {
        this.apartmentDetails = this.retrieveDetailsFromLocalStorage() || [];
        this.initializeListeners();
        this.displayDetails();
    }

    RetrieveDetailsFromLocalStorage() {
        const storedDetails = localStorage.getItem("apartmentDetails");
        return storedDetails ? JSON.parse(storedDetails) : null;
    }

    InitializeListeners() {
        document.getElementById("sortByPrice").addEventListener("change", () => this.handleFilterChange());
        document.getElementById("filterByName").addEventListener("change", () => this.handleFilterChange());
        document.getElementById("filterByPets").addEventListener("change", () => this.handleFilterChange());
        document.getElementById("filterByBedrooms").addEventListener("change", () => this.handleFilterChange());
        document.getElementById("applyFiltersBtn").addEventListener("click", () => this.handleApplyFilters());
    }

    DisplayDetails() {
        const detailsDiv = document.getElementById("details");
        detailsDiv.innerHTML = "<h2>All Apartment Details</h2>";

        this.apartmentDetails.forEach((details, index) => {
            const apartmentSection = this.createApartmentSection(details, index);
            detailsDiv.appendChild(apartmentSection);
        });
    }

    CreateApartmentSection(details, index) {
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
    formatPrice(price) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    }

    SortAndFilterDetails() {
        let filteredDetailsArray = [...this.apartmentDetails];

        const sortByPrice = document.getElementById("sortByPrice").value;
        const filterByName = document.getElementById("filterByName").value;
        const filterByPets = document.getElementById("filterByPets").value;
        const filterByBedroomsCount = document.getElementById("filterByBedrooms").value;

        // Sorting
        if (sortByPrice === "ascending") {
            filteredDetailsArray.sort((a, b) => a.price - b.price);
        } else if (sortByPrice === "descending") {
            filteredDetailsArray.sort((a, b) => b.price - a.price);
        }

        // Filtering
        if (filterByName !== "all") {
            filteredDetailsArray = filteredDetailsArray.filter(details => details.name === filterByName);
        }

        if (filterByPets !== "all") {
            filteredDetailsArray = filteredDetailsArray.filter(details => details.pets === filterByPets);
        }

        if (filterByBedroomsCount !== "all") {
            filteredDetailsArray = filteredDetailsArray.filter(details => details.numBedrooms === filterByBedroomsCount);
        }

        return filteredDetailsArray;
    }

    HandleFilterChange() {
        const filteredDetailsArray = this.sortAndFilterDetails();
        this.displayDetails(filteredDetailsArray);
    }

    HandleApplyFilters() {
        const filteredDetailsArray = this.sortAndFilterDetails();
        this.displayDetails(filteredDetailsArray);
    }
}

// Initialize the ApartmentManager class on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    new ApartmentManager();
});