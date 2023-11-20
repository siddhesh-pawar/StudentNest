// This class performs client side validation
class FormValidator {
    constructor(name, email, password, confirmPassword) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    validateForm() {
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

module.exports = { FormValidator };
