// This class performs client side validation
class FormValidator {
    constructor(name, email, password, confirmPassword) {
    }

    validateForm() {
        this.name = document.getElementById("name").value;
        this.email = document.getElementById("email").value;
        this.password = document.getElementById("password").value;
        this.confirmPassword = document.getElementById("confirmPassword").value;

        if (this.name === "" || this.email === "" || this.password === "" || this.confirmPassword === "") {
            alert("All fields are required");
            return false;
        }

        if (this.password !== this.confirmPassword) {
            alert("Passwords do not match");
            return false;
        }

        return true;
    }
}

const formValidator = new FormValidator();

function SubmitForm() {
    return formValidator.validateForm();
}

module.exports = { FormValidator };