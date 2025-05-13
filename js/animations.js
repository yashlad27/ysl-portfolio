// GSAP Animations for Yash Lad's Portfolio
// This file contains all animation logic using GSAP library

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initPageLoadAnimations();
    initScrollAnimations();
    initHoverEffects();
    initSkillsAnimation();
    initParticles();
    initProjectsInteraction();
    initCursorEffects();
});

// Page load animations
function initPageLoadAnimations() {
    // Hide elements initially
    gsap.set('.hero-content > *', { y: 30, opacity: 0 });
    gsap.set('.nav-links li', { y: -20, opacity: 0 });
    gsap.set('.logo', { x: -20, opacity: 0 });
    
    // Create timeline for entrance animation
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Logo & Navigation Animation
    tl.to('.logo', { duration: 0.6, x: 0, opacity: 1, ease: 'power2.out' })
      .to('.nav-links li', { duration: 0.4, y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out' }, '-=0.2')
    
    // Hero Content Animation
    tl.to('.hero-content > .profile-img', { duration: 0.8, y: 0, opacity: 1, ease: 'back.out(1.7)' }, '-=0.2')
      .to('.hero-content > h1', { duration: 0.5, y: 0, opacity: 1, ease: 'power2.out' }, '-=0.4')
      .to('.hero-content > h2', { duration: 0.5, y: 0, opacity: 1, ease: 'power2.out' }, '-=0.3')
      .to('.hero-content > p', { duration: 0.5, y: 0, opacity: 1, ease: 'power2.out' }, '-=0.2')
      .to('.hero-content > .cta-buttons', { duration: 0.5, y: 0, opacity: 1, ease: 'power2.out' }, '-=0.1');

    // Add a subtle floating animation to the profile image
    gsap.to('.profile-img', {
        y: 15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// Scroll-based animations using Intersection Observer
function initScrollAnimations() {
    // Section header animations
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tl = gsap.timeline();
                
                tl.fromTo(entry.target.querySelector('h2'), 
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
                )
                .fromTo(entry.target.querySelector('.underline'), 
                    { width: 0 },
                    { width: '70px', duration: 0.4, ease: 'power2.out' },
                    '-=0.2'
                );
                
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    sectionHeaders.forEach(header => {
        headerObserver.observe(header);
    });
    
    // About section animation
    const aboutContent = document.querySelector('.about-content');
    
    if (aboutContent) {
        const aboutObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                gsap.fromTo('.about-text p', 
                    { y: 30, opacity: 0 }, 
                    { y: 0, opacity: 1, stagger: 0.2, duration: 0.7, ease: 'power2.out' }
                );
                aboutObserver.unobserve(aboutContent);
            }
        }, { threshold: 0.2 });
        
        aboutObserver.observe(aboutContent);
    }
    
    // Education items animation
    const educationItems = document.querySelectorAll('.education-item');
    
    const eduObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.fromTo(entry.target, 
                    { x: -50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
                );
                eduObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    educationItems.forEach(item => {
        eduObserver.observe(item);
    });
    
    // Experience items animation
    const experienceItems = document.querySelectorAll('.experience-item');
    
    const expObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.fromTo(entry.target, 
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
                );
                expObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    experienceItems.forEach(item => {
        expObserver.observe(item);
    });
    
    // Contact section animation
    const contactSection = document.querySelector('#contact');
    
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                gsap.fromTo('.contact-info-item', 
                    { y: 30, opacity: 0 }, 
                    { y: 0, opacity: 1, stagger: 0.15, duration: 0.5, ease: 'power2.out' }
                );
                
                if (document.querySelector('#contact-form')) {
                    gsap.fromTo('#contact-form', 
                        { y: 50, opacity: 0 }, 
                        { y: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: 'power2.out' }
                    );
                }
                
                contactObserver.unobserve(contactSection);
            }
        }, { threshold: 0.2 });
        
        contactObserver.observe(contactSection);
    }
}

// Interactive hover effects
function initHoverEffects() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power1.out' });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power1.out' });
        });
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -10, boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)', duration: 0.3 });
            gsap.to(card.querySelector('img'), { scale: 1.05, duration: 0.5 });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', duration: 0.3 });
            gsap.to(card.querySelector('img'), { scale: 1, duration: 0.5 });
        });
    });
}

// Skills animation with progress effect
function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            gsap.fromTo(skillItems, 
                { y: 50, opacity: 0, scale: 0.8 },
                { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    stagger: 0.07,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                }
            );
            
            // Add a subtle hover effect to skill items
            skillItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, { 
                        y: -5, 
                        scale: 1.1, 
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                        color: 'var(--primary-color)',
                        duration: 0.3 
                    });
                });
                
                item.addEventListener('mouseleave', () => {
                    gsap.to(item, { 
                        y: 0, 
                        scale: 1,
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                        color: 'var(--dark-color)', 
                        duration: 0.3 
                    });
                });
            });
            
            skillsObserver.disconnect();
        }
    }, { threshold: 0.2 });
    
    skillsObserver.observe(document.querySelector('#skills'));
}

// Particles background effect for hero section
function initParticles() {
    if (!document.querySelector('#particles-js')) {
        return;
    }
    
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#FF6B6B' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#B5EAD7',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// Project cards interaction - filter and animations
function initProjectsInteraction() {
    const projectsSection = document.querySelector('#projects');
    
    if (!projectsSection || !document.querySelector('.project-filters')) {
        return;
    }
    
    // Setup filter functionality if filter buttons exist
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter the projects
            projectCards.forEach(card => {
                if (filter === 'all') {
                    gsap.to(card, { opacity: 1, scale: 1, duration: 0.4, display: 'block' });
                } else if (card.classList.contains(filter)) {
                    gsap.to(card, { opacity: 1, scale: 1, duration: 0.4, display: 'block' });
                } else {
                    gsap.to(card, { opacity: 0, scale: 0.8, duration: 0.4, display: 'none' });
                }
            });
        });
    });
}

// Custom cursor effects for a modern feel
function initCursorEffects() {
    // Create custom cursor elements if they don't exist
    if (!document.querySelector('.cursor-dot') && !document.querySelector('.cursor-circle')) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        
        const circle = document.createElement('div');
        circle.className = 'cursor-circle';
        
        document.body.appendChild(dot);
        document.body.appendChild(circle);
        
        // Add custom cursor styles
        const style = document.createElement('style');
        style.textContent = `
            .cursor-dot {
                position: fixed;
                top: 0;
                left: 0;
                width: 8px;
                height: 8px;
                background-color: var(--primary-color);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 9999;
            }
            
            .cursor-circle {
                position: fixed;
                top: 0;
                left: 0;
                width: 40px;
                height: 40px;
                border: 2px solid var(--accent-color);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: width 0.2s, height 0.2s;
                pointer-events: none;
                z-index: 9998;
                opacity: 0.5;
            }
            
            a:hover ~ .cursor-circle,
            button:hover ~ .cursor-circle,
            .btn:hover ~ .cursor-circle {
                width: 60px;
                height: 60px;
                opacity: 0.3;
            }
        `;
        document.head.appendChild(style);
        
        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            gsap.to('.cursor-dot', {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            
            gsap.to('.cursor-circle', {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2
            });
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            gsap.to(['.cursor-dot', '.cursor-circle'], {
                opacity: 0,
                duration: 0.2
            });
        });
        
        // Show cursor when entering window
        document.addEventListener('mouseenter', () => {
            gsap.to(['.cursor-dot', '.cursor-circle'], {
                opacity: 1,
                duration: 0.2
            });
        });
        
        // Scale effect when clicking
        document.addEventListener('mousedown', () => {
            gsap.to('.cursor-circle', {
                scale: 0.8,
                duration: 0.2
            });
        });
        
        document.addEventListener('mouseup', () => {
            gsap.to('.cursor-circle', {
                scale: 1,
                duration: 0.2
            });
        });
        
        // Custom behavior on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to('.cursor-circle', {
                    scale: 1.5,
                    opacity: 0.3,
                    duration: 0.3
                });
                
                gsap.to('.cursor-dot', {
                    scale: 0.5,
                    duration: 0.3
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to('.cursor-circle', {
                    scale: 1,
                    opacity: 0.5,
                    duration: 0.3
                });
                
                gsap.to('.cursor-dot', {
                    scale: 1,
                    duration: 0.3
                });
            });
        });
    }
}
