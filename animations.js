// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', () => {
    // Elements to observe
    const elements = [
        ...document.querySelectorAll('.skill-category'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.cert-card'),
        ...document.querySelectorAll('.timeline-content'),
        ...document.querySelectorAll('.contact-form'),
        ...document.querySelectorAll('.about-text'),
        ...document.querySelectorAll('.about-image'),
        document.querySelector('.home-image'),
        document.querySelector('.home-text')
    ].filter(el => el !== null); // Filter out null elements
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes based on element type
                if (entry.target.classList.contains('home-image')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'fadeInLeft 1s ease-out forwards';
                } else if (entry.target.classList.contains('home-text')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'fadeInRight 1s ease-out forwards';
                } else if (entry.target.classList.contains('about-text')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'fadeInLeft 1s ease-out forwards';
                } else if (entry.target.classList.contains('about-image')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'fadeInRight 1s ease-out forwards';
                } else if (entry.target.classList.contains('skill-category')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                } else if (entry.target.classList.contains('project-card') || 
                           entry.target.classList.contains('cert-card') || 
                           entry.target.classList.contains('timeline-content') || 
                           entry.target.classList.contains('contact-form')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'zoomIn 0.8s ease-out forwards';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    elements.forEach(element => {
        observer.observe(element);
    });
    
    // Animate progress bars when in view
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');
    
    const progressObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            progressBars.forEach(progress => {
                const percent = progress.getAttribute('data-percent');
                setTimeout(() => {
                    progress.style.width = `${percent}%`;
                }, 300);
            });
            progressObserver.unobserve(skillsSection);
        }
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        progressObserver.observe(skillsSection);
    }
});

// Scroll animations for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');

window.addEventListener('scroll', () => {
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.8) {
            item.classList.add('animate-fadeInLeft');
        }
    });
});

// Hover animations for project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = 'var(--shadow-lg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow-md)';
    });
});

// Typing animation for home section (optional)
document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing animation when home section is in view
        const homeSection = document.getElementById('home');
        if (homeSection) {
            const homeObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(typeWriter, 500);
                    homeObserver.unobserve(homeSection);
                }
            }, { threshold: 0.5 });
            
            homeObserver.observe(homeSection);
        }
    }
});

// Parallax effect for section backgrounds (subtle)
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    document.querySelectorAll('.section').forEach(section => {
        const sectionSpeed = 0.05;
        const distanceFromTop = section.offsetTop;
        const offset = (scrollPosition - distanceFromTop) * sectionSpeed;
        
        // Only apply to sections that are in view
        if (scrollPosition > distanceFromTop - window.innerHeight && 
            scrollPosition < distanceFromTop + section.offsetHeight) {
            section.style.backgroundPositionY = `${offset}px`;
        }
    });
});

// Animate social icons
const socialLinks = document.querySelectorAll('.social-links a');

socialLinks.forEach((link, index) => {
    link.style.animationDelay = `${0.3 + (index * 0.1)}s`;
});

// Animate skill icons on hover
const skillIcons = document.querySelectorAll('.skill-icon');

skillIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'rotate(10deg) scale(1.1)';
        icon.style.backgroundColor = 'var(--secondary-color)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'rotate(0) scale(1)';
        icon.style.backgroundColor = 'var(--primary-color)';
    });
});