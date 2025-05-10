// DOM Elements
const header = document.getElementById('header');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const backToTopBtn = document.querySelector('.back-to-top');
const themeToggle = document.getElementById('checkbox');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contactForm');

// Toggle Dark/Light Theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Check for saved theme preference
function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    }
}

// Mobile Menu Toggle
function toggleMenu() {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Close menu when a nav item is clicked
function closeMenu() {
    menuBtn.classList.remove('open');
    navLinks.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

// Activate nav link based on scroll position
function setActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

// Show/Hide Back To Top button
function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Add box shadow to header when scrolled
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Set active nav link
    setActiveNavLink();
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - 80;
    
    window.scrollTo({
        top: targetPosition - 80,
        behavior: 'smooth'
    });
    
    closeMenu();
}

// Handle contact form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    alert(`Thanks for your message, ${name}! This is a demo form, so no message was actually sent.`);
    
    // Reset form
    contactForm.reset();
}

// Initialize Animations
function initAnimations() {
    // Initialize progress bars
    document.querySelectorAll('.progress').forEach(progress => {
        const percent = progress.getAttribute('data-percent');
        setTimeout(() => {
            progress.style.width = `${percent}%`;
        }, 500);
    });
}

// Event Listeners
window.addEventListener('load', () => {
    checkTheme();
    initAnimations();
});

window.addEventListener('scroll', scrollFunction);
backToTopBtn.addEventListener('click', scrollToTop);
themeToggle.addEventListener('change', toggleTheme);
menuBtn.addEventListener('click', toggleMenu);

navItems.forEach(item => {
    item.addEventListener('click', smoothScroll);
});

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

// Prevent transitions on page load
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});