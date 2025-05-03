document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle the navigation menu
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Handle form submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (validateForm(email, password)) {
            alert('Login successful!');
            // Add form submission logic here (e.g., AJAX request)
        } else {
            alert('Please fill out all fields correctly.');
        }
    });

    function validateForm(email, password) {
        if (email.trim() === '' || password.trim() === '') {
            return false;
        }
        return true;
    }

    // Password strength checker
    document.getElementById('password').addEventListener('input', function() {
        const password = this.value;
        const strengthIndicator = document.getElementById('passwordStrength');
        const passwordError = document.getElementById('passwordError');

        // Reset previous error and strength classes
        strengthIndicator.className = 'strength';
        passwordError.textContent = '';

        // Check password strength
        if (password.length < 6) {
            strengthIndicator.textContent = 'Password is too short';
            strengthIndicator.classList.add('weak');
        } else if (!/[A-Z]/.test(password)) {
            strengthIndicator.textContent = 'Add at least one uppercase letter';
            strengthIndicator.classList.add('medium');
        } else if (!/[0-9]/.test(password)) {
            strengthIndicator.textContent = 'Add at least one number';
            strengthIndicator.classList.add('medium');
        } else if (!/[\W_]/.test(password)) {
            strengthIndicator.textContent = 'Add at least one special character';
            strengthIndicator.classList.add('medium');
        } else {
            strengthIndicator.textContent = 'Strong password';
            strengthIndicator.classList.add('strong');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    emailInput.addEventListener('input', function() {
        const emailValue = this.value;

        // Reset previous error message
        emailError.textContent = '';

        // Validate the email format
        if (!validateEmail(emailValue)) {
            emailError.textContent = 'Please enter a valid email address';
            this.setCustomValidity('Invalid');
        } else {
            this.setCustomValidity('');
        }
    });

    function validateEmail(email) {
        // Simple regex to validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});


