function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var repassword = document.getElementById("repassword").value;

    if (name === "" || email === "" || password === "" || repassword === "") {
        alert("All fields are required");
        return false;
    }

    if (password !== repassword) {
        alert("Passwords do not match");
        return false;
    }

    return true;
}