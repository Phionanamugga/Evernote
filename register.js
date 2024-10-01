document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    form.addEventListener("submit", function(event) {
        let valid = true;
        clearErrors();

        if (usernameInput.value.trim() === "") {
            showError(usernameInput, "Username is required");
            valid = false;
        }

        if (emailInput.value.trim() === "") {
            showError(emailInput, "Email is required");
            valid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, "Enter a valid email address");
            valid = false;
        }

        if (passwordInput.value.trim() === "") {
            showError(passwordInput, "Password is required");
            valid = false;
        }

        if (confirmPasswordInput.value.trim() === "") {
            showError(confirmPasswordInput, "Confirm password is required");
            valid = false;
        } else if (passwordInput.value.trim() !== confirmPasswordInput.value.trim()) {
            showError(confirmPasswordInput, "Passwords do not match");
            valid = false;
        }

        document.getElementById('registration-form').addEventListener('submit', function(event) {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const errorMessage = document.getElementById('error-message');

        // Regex pattern for password complexity: at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordPattern.test(password)) {
            errorMessage.textContent = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
            errorMessage.style.display = 'block';
            event.preventDefault(); // Prevent form submission
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = 'Passwords do not match.';
            errorMessage.style.display = 'block';
            event.preventDefault(); // Prevent form submission
            return;
        }

        errorMessage.style.display = 'none'; // Clear error message
    });

        if (!valid) {
            event.preventDefault();
        }
    });

    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add("error");

        const error = document.createElement("small");
        error.classList.add("error-message");
        error.innerText = message;
        formGroup.appendChild(error);
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(message => message.remove());

        const errorInputs = document.querySelectorAll(".error");
        errorInputs.forEach(input => input.classList.remove("error"));
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
