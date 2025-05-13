// Contact Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const successCloseBtn = document.getElementById('success-close');
    
    if (!form) return;
    
    // Form validation
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        if (!validateForm()) {
            return false;
        }
        
        // Show sending state
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.classList.add('sending');
        submitBtn.querySelector('.btn-icon i').classList.remove('fa-paper-plane');
        submitBtn.querySelector('.btn-icon i').classList.add('fa-spinner');
        
        try {
            // Get form data
            const formData = new FormData(form);
            
            // Send form using Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (response.ok) {
                // Show success message with animation
                showSuccessMessage();
                form.reset();
            } else {
                // Handle error
                alert('There was a problem sending your message. Please try again later.');
                console.error(result);
            }
        } catch (error) {
            alert('There was a problem sending your message. Please try again later.');
            console.error(error);
        }
        
        // Hide sending state
        submitBtn.classList.remove('sending');
        submitBtn.querySelector('.btn-icon i').classList.remove('fa-spinner');
        submitBtn.querySelector('.btn-icon i').classList.add('fa-paper-plane');
    });
    
    // Input validation on blur
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error as soon as user starts typing
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorMsg = this.parentElement.querySelector('.error-message');
                errorMsg.textContent = '';
                errorMsg.classList.remove('show');
            }
        });
    });
    
    // Close success message and show form again
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', function() {
            hideSuccessMessage();
        });
    }
    
    // Helper functions
    function validateForm() {
        let valid = true;
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!validateInput(input)) {
                valid = false;
            }
        });
        
        return valid;
    }
    
    function validateInput(input) {
        let valid = true;
        const errorMsg = input.parentElement.querySelector('.error-message');
        
        // Check if input is empty
        if (input.value.trim() === '') {
            showError(input, errorMsg, 'This field is required');
            valid = false;
        } 
        // Validate email format
        else if (input.type === 'email' && !isValidEmail(input.value)) {
            showError(input, errorMsg, 'Please enter a valid email address');
            valid = false;
        }
        
        return valid;
    }
    
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Add subtle shake animation
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
    }
    
    function clearErrors() {
        const errorInputs = form.querySelectorAll('.error');
        const errorMessages = form.querySelectorAll('.error-message.show');
        
        errorInputs.forEach(input => input.classList.remove('error'));
        errorMessages.forEach(msg => {
            msg.textContent = '';
            msg.classList.remove('show');
        });
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showSuccessMessage() {
        // Use GSAP for smooth animation if available
        if (typeof gsap !== 'undefined') {
            gsap.to(form, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => {
                    form.style.display = 'none';
                    formSuccess.classList.add('show');
                }
            });
        } else {
            form.style.display = 'none';
            formSuccess.classList.add('show');
        }
    }
    
    function hideSuccessMessage() {
        // Use GSAP for smooth animation if available
        if (typeof gsap !== 'undefined') {
            gsap.to(formSuccess, {
                opacity: 0,
                scale: 0.9,
                duration: 0.3,
                onComplete: () => {
                    formSuccess.classList.remove('show');
                    formSuccess.removeAttribute('style');
                    form.style.display = '';
                    gsap.fromTo(form, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.4 }
                    );
                }
            });
        } else {
            formSuccess.classList.remove('show');
            form.style.display = '';
        }
    }
}

// Add a keyframe animation for the shake effect
if (!document.querySelector('#shake-animation')) {
    const style = document.createElement('style');
    style.id = 'shake-animation';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        .shake {
            animation: shake 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}
