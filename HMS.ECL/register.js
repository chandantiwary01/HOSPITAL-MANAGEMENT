document.addEventListener('DOMContentLoaded', () => {
    // Burger menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Form validation and submission
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (validateForm(name, email, password)) {
            submitForm({ name, email, password });
        } else {
            alert('Please fill out all fields correctly.');
        }
    });

    function validateForm(name, email, password) {
        return name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && validateEmail(email);
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function submitForm(formData) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/register',
            data: formData,
            success: () => showPopup('Registration Completed!', 'Your registration has been successfully completed.'),
            error: () => alert('Error registering customer'),
        });
    }

    // Password strength indicator
    document.getElementById('password').addEventListener('input', function () {
        const password = this.value;
        const strengthIndicator = document.getElementById('passwordStrength');
        strengthIndicator.className = 'strength';

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

    // Name field validation
    document.getElementById('name').addEventListener('input', function () {
        const nameValue = this.value;
        const nameError = document.getElementById('nameError');
        nameError.textContent = '';

        if (!/\d/.test(nameValue)) {
            nameError.textContent = 'Name must include at least one number';
            this.setCustomValidity('Invalid');
        } else {
            this.setCustomValidity('');
        }
    });

    // Email field validation
    document.getElementById('email').addEventListener('input', function () {
        const emailValue = this.value;
        const emailError = document.getElementById('emailError');
        emailError.textContent = '';

        if (!validateEmail(emailValue)) {
            emailError.textContent = 'Please enter a valid email address';
            this.setCustomValidity('Invalid');
        } else {
            this.setCustomValidity('');
        }
    });

    // Password visibility toggle
    const passwordField = document.getElementById("password");
    const togglePassword = document.querySelector(".password-toggle-icon i");
    
    togglePassword.addEventListener("click", function () {
      if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
      } else {
        passwordField.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
      }
    });

    // Popup functionality
    function showPopup(title, message) {
        const popup = document.createElement('div');
        popup.id = 'registrationCompletePopup';
        popup.className = 'popup';
        popup.innerHTML = `
            <div class="popup-content">
                <span class="close-btn">&times;</span>
                <h2>${title}</h2>
                <p>${message}</p>
                <button id="closePopupBtn">OK</button>
            </div>
        `;

        document.body.appendChild(popup);

        const closePopupBtn = document.getElementById('closePopupBtn');
        const closeBtn = document.querySelector('.close-btn');

        closePopupBtn.addEventListener('click', closePopup);
        closeBtn.addEventListener('click', closePopup);
        window.addEventListener('click', (e) => {
            if (e.target === popup) closePopup();
        });

        function closePopup() {
            popup.style.display = 'none';
            popup.remove();
        }

        popup.style.display = 'flex';
    }
});

$('#registerForm').submit(function(e) {
    e.preventDefault();
  
    const patientData = {
      name: $('#name').val(),
      email: $('#email').val(),
      password: $('#password').val()
    };
  
    $.ajax({
      type: 'POST',
      url: '/api/patients/register',
      data: JSON.stringify(patientData),
      contentType: 'application/json',
      success: function(response) {
        alert('Registration successful');
      },
      error: function(error) {
        alert('Registration failed');
      }
    });
  });