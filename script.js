document.addEventListener("DOMContentLoaded", function () {
  var apartmentNameSelect = document.getElementById("apartmentNameSelect");
  var apartmentLocationSelect = document.getElementById(
    "apartmentLocationSelect"
  );
  var apartmentNameInput = document.getElementById("apartmentName");
  var apartmentLocationInput = document.getElementById("apartmentLocation");

  var apartmentNames = [
    "Collective On 4th",
    "CYAN PDX",
    "Goose Hollow",
    "University Pointe",
    "SKY 3"
  ];
  var apartmentLocations = [
    "1818 SW 4th Ave",
    "1720 SW 4th Ave",
    "1450 SW Jefferson St",
    "1955 SW 5th Ave",
    "1221 SW 11th Ave"
  ];
  var numBedroomsOptions = ["1", "2", "3", "4"];
  var petsOptions = ["Yes", "No"];


  populateDropdown(apartmentNames, apartmentNameSelect);
  populateDropdown(apartmentLocations, apartmentLocationSelect);
  populateDropdown(
    numBedroomsOptions,
    document.getElementById("numBedroomsSelect")
  );
  populateDropdown(petsOptions, document.getElementById("petsSelect")); // Update the dropdown for number of bedrooms

  apartmentNameSelect.addEventListener("change", function () {
    updateInputField("apartmentNameSelect", "apartmentName");
  });

  apartmentLocationSelect.addEventListener("change", function () {
    updateInputField("apartmentLocationSelect", "apartmentLocation");
  });
  numBedroomsSelect.addEventListener("change", function () {
    updateInputField("numBedroomsSelect", "numBedrooms");
  });
  petsSelect.addEventListener("change", function () {
    updateInputField("petsSelect", "pets");
  });
});

function populateDropdown(options, selectElement) {
  options.forEach(function (option) {
    var optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.text = option;
    selectElement.add(optionElement);
  });
}

function updateInputField(selectId, inputId) {
  var selectedValue = document.getElementById(selectId).value;
  document.getElementById(inputId).value = selectedValue;
}

function submitForm() {

  var apartmentName = document.getElementById("apartmentName").value;
  var apartmentLocation = document.getElementById("apartmentLocation").value;
  var apartmentPrice = document.getElementById("apartmentPrice").value;
  var studentName = document.getElementById("studentName").value;
  var studentEmail = document.getElementById("studentEmail").value;
  var studentContact = document.getElementById("studentContact").value;
  var apartmentNumber = document.getElementById("apartmentNumber").value;
  var numBedrooms = document.getElementById("numBedrooms").value;
  var pets = document.getElementById("pets").value;


  if (
    !isValidInput(apartmentName, "Apartment Name") ||
    !isValidInput(apartmentLocation, "Apartment Location") ||
    !isValidPrice(apartmentPrice, "Price") ||
    !isValidInput(studentName, "Student Name") ||
    !isValidEmail(studentEmail, "Student Email") ||
    !isValidContact(studentContact, "Student Contact") ||
    !isValidInput(apartmentNumber, "Apartment Number") ||
    !isValidBedrooms(numBedrooms, "Number of Bedrooms") ||
    !isValidInput(pets, "Pets")
  ) {
    return;
  }


  var apartmentDetails = {
    name: apartmentName,
    location: apartmentLocation,
    price: apartmentPrice,
    studentName: studentName,
    studentEmail: studentEmail,
    studentContact: studentContact,
    apartmentNumber: apartmentNumber,
    numBedrooms: numBedrooms,
    pets: pets,
  };


  var existingDetails = localStorage.getItem("apartmentDetails");


  var detailsArray = existingDetails ? JSON.parse(existingDetails) : [];
  detailsArray.push(apartmentDetails);


  localStorage.setItem("apartmentDetails", JSON.stringify(detailsArray));

  var submissionMessage = document.getElementById("submission-message");
  alert("Your form has been submitted!");

  var viewListingsBtn = document.getElementById("viewListingsBtn");
  viewListingsBtn.style.display = "block";


  document.getElementById("apartmentForm").reset();
}

function isValidInput(value, fieldName) {
  if (value.trim() === "") {
    alert(fieldName + " cannot be empty.");
    return false;
  }
  return true;
}

function isValidPrice(price, fieldName) {
  if (isNaN(price) || parseFloat(price) <= 0) {
    alert(fieldName + " must be a positive number.");
    return false;
  }
  return true;
}

function isValidEmail(email, fieldName) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Invalid " + fieldName + ".");
    return false;
  }
  return true;
}

function isValidContact(contact, fieldName) {
  var contactPattern = /^\d{10}$/;
  if (!contactPattern.test(contact)) {
    alert("Invalid " + fieldName + ". It must be a 10-digit number.");
    return false;
  }
  return true;
}

function isValidBedrooms(bedrooms, fieldName) {
  if (!/^\d+$/.test(bedrooms) || parseInt(bedrooms) <= 0) {
    alert(fieldName + " must be a positive integer.");
    return false;
  }
  return true;
}

function viewListings() {
 
  console.log("Attempting to redirect to view listings...");

  window.location.href = "details.html";
}
