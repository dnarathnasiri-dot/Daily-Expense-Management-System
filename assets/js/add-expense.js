// Set today's date as default
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    
    // Form submission handler
    const form = document.getElementById('expenseForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            amount: document.getElementById('amount').value,
            category: document.getElementById('category').value,
            date: document.getElementById('date').value,
            description: document.getElementById('description').value
        };
        
        console.log('Expense saved:', formData);
        
        // Show success message (you can customize this)
        alert('Expense saved successfully!');
        
        // Reset form
        form.reset();
        dateInput.value = today;
    });
    
    // Cancel button handler
    const cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
            form.reset();
            dateInput.value = today;
        }
    });
    
    // Navigation items click handler
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            const page = this.getAttribute('href').substring(1);
            console.log('Navigating to:', page);
            
            // Here you can add logic to show different pages
            // For now, we just log the navigation
        });
    });
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
            }
        });
    });
    
    // Format amount input
    const amountInput = document.getElementById('amount');
    amountInput.addEventListener('blur', function() {
        if (this.value) {
            this.value = parseFloat(this.value).toFixed(2);
        }
    });
    
    // Add input validation feedback
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ef4444';
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
