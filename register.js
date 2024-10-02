document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    form.addEventListener("submit", async function (event) {
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

        // Regex pattern for password complexity: at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordPattern.test(passwordInput.value)) {
            showError(passwordInput, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
            return;
        }

        // Proceed to fetch API if valid
        try {
            const response = await fetch('https://api.example.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usernameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                showError(form, errorData.message || 'Registration failed.'); // Show server error
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            // Redirect or show success message here
        } catch (error) {
            console.error('Error:', error);
            showError(form, 'An unexpected error occurred.'); // Show generic error message
        }

        event.preventDefault(); // Prevent form submission
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
