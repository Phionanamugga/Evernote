import * as tf from '@tensorflow/tfjs';

// ML pipeline
async function loadModel() {
    const model = await tf.loadLayersModel('path/to/model.json');
    console.log("Model loaded successfully");
}

loadModel();


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

        if (!valid) {
            event.preventDefault();
            return;
        }

        // Fetch API Example
        const formData = {
            username: usernameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };

        // Replace with your actual API endpoint
        const apiUrl = 'https://your-api-endpoint.com/register';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data here
            console.log('Success:', data);
            // Redirect or show success message
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

        // Password complexity validation
        const errorMessage = document.getElementById('error-message');

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordPattern.test(passwordInput.value)) {
            errorMessage.textContent = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
            errorMessage.style.display = 'block';
            event.preventDefault(); // Prevent form submission
            return;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            errorMessage.textContent = 'Passwords do not match.';
            errorMessage.style.display = 'block';
            event.preventDefault(); // Prevent form submission
            return;
        }

        errorMessage.style.display = 'none'; // Clear error message
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
