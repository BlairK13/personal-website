document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('nav ul');

    // Load saved theme from localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Theme Toggle Event Listener
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Simple email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Thank you for your message!');
        contactForm.reset();
    });

    // Mobile Navigation Toggle Event Listener
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Back to Top Button Scroll Visibility
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.display = 'none';
        }

        // Scroll Progress Bar Calculation
        if (scrollProgress) {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
            scrollProgress.style.width = `${scrolled}%`;
        }
    });

    // Back to Top Button Click Event
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinksSmooth = document.querySelectorAll('nav a[href^="#"]');

    navLinksSmooth.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) { // Check if section exists
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjust based on header height
                    behavior: 'smooth',
                });
            }

            // Close mobile nav if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Add loading animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in');
    });

    // Enhance form submission feedback
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
        setTimeout(() => {
            submitButton.innerHTML = 'Send';
            contactForm.reset();
        }, 2000);
    });

});
