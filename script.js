class ApartmentForm {
  constructor() {
    this.apartmentNameSelect = document.getElementById("apartmentNameSelect");
    this.apartmentLocationSelect = document.getElementById("apartmentLocationSelect");
    this.apartmentNameInput = document.getElementById("apartmentName");
    this.apartmentLocationInput = document.getElementById("apartmentLocation");

    this.apartmentNames = [
      "Collective On 4th",
      "CYAN PDX",
      "Goose Hollow",
      "University Pointe",
      "SKY 3"
    ];
    this.apartmentLocations = [
      "1818 SW 4th Ave",
      "1720 SW 4th Ave",
      "1450 SW Jefferson St",
      "1955 SW 5th Ave",
      "1221 SW 11th Ave"
    ];
    this.numBedroomsOptions = ["1", "2", "3", "4"];
    this.petsOptions = ["Yes", "No"];

    this.init();
  }

  init() {
    this.populateDropdown(this.apartmentNames, this.apartmentNameSelect);
    this.populateDropdown(this.apartmentLocations, this.apartmentLocationSelect);
    this.populateDropdown(this.numBedroomsOptions, document.getElementById("numBedroomsSelect"));
    this.populateDropdown(this.petsOptions, document.getElementById("petsSelect"));

    this.addChangeEventListeners();
  }

  populateDropdown(options, selectElement) {
    options.forEach(option => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.text = option;
      selectElement.add(optionElement);
    });
  }

  addChangeEventListeners() {
    this.apartmentNameSelect.addEventListener("change", () => this.updateInputField("apartmentNameSelect", "apartmentName"));
    this.apartmentLocationSelect.addEventListener("change", () => this.updateInputField("apartmentLocationSelect", "apartmentLocation"));
    document.getElementById("numBedroomsSelect").addEventListener("change", () => this.updateInputField("numBedroomsSelect", "numBedrooms"));
    document.getElementById("petsSelect").addEventListener("change", () => this.updateInputField("petsSelect", "pets"));
  }

  updateInputField(selectId, inputId) {
    const selectedValue = document.getElementById(selectId).value;
    document.getElementById(inputId).value = selectedValue;
  }

}
  
submitForm() {
  const formFields = ["apartmentName", "apartmentLocation", "apartmentPrice", "studentName", "studentEmail", "studentContact", "apartmentNumber", "numBedrooms", "pets"];

  if (!this.validateFormFields(formFields)) {
    return;
  }

  const apartmentDetails = this.getFormValues(formFields);

  this.saveApartmentDetails(apartmentDetails);

  alert("Your form has been submitted!");

  const viewListingsBtn = document.getElementById("viewListingsBtn");
  viewListingsBtn.style.display = "block";

  document.getElementById("apartmentForm").reset();
}

validateFormFields(fields) {
  for (const field of fields) {
    const value = document.getElementById(field).value.trim();
    if (value === "") {
      alert(`${field} cannot be empty.`);
      return false;
    }
  }
  return true;
}

getFormValues(fields) {
  const values = {};
  for (const field of fields) {
    values[field] = document.getElementById(field).value;
  }
  return values;
}

saveApartmentDetails(details) {
  const existingDetails = localStorage.getItem("apartmentDetails");
  const detailsArray = existingDetails ? JSON.parse(existingDetails) : [];
  detailsArray.push(details);
  localStorage.setItem("apartmentDetails", JSON.stringify(detailsArray));
}

viewListings() {
  console.log("Attempting to redirect to view listings...");
  window.location.href = "details.html";
}
}

document.addEventListener("DOMContentLoaded", () => {
  const apartmentForm = new ApartmentForm();
  document.getElementById("submitBtn").addEventListener("click", () => apartmentForm.submitForm());
  document.getElementById("viewListingsBtn").addEventListener("click", () => apartmentForm.viewListings());
});