// JavaScript Document

// Component Loading System
async function loadComponents() {
    try {
        // Header laden
        const headerResponse = await fetch('./components/header.html');
        const headerHTML = await headerResponse.text();
        document.querySelector('.header-section').insertAdjacentHTML('afterbegin', headerHTML);
        
        // Footer laden
        const footerResponse = await fetch('./components/footer.html');
        const footerHTML = await footerResponse.text();
        document.body.insertAdjacentHTML('beforeend', footerHTML);
        
        // Nach dem Laden der Komponenten die Event Listener initialisieren
        initializeEventListeners();
        
    } catch (error) {
        console.error('Fehler beim Laden der Komponenten:', error);
    }
}

// Event Listeners initialisieren
function initializeEventListeners() {
    // Menu Toggle Funktionalität
    const hamburger = document.querySelector('.hamburger-menu');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Close Menu Button
    const closeMenu = document.querySelector('.close-menu');
    if (closeMenu) {
        closeMenu.addEventListener('click', toggleMenu);
    }
    
    // Menu schließen beim Klick außerhalb
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.querySelector('.hamburger-menu');
        
        if (navMenu && hamburger && !navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('hidden');
        }
    });
    
    // Video Autoplay Observer
    initializeVideoObserver();
}

// Menu Toggle Funktion
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger-menu');
    
    if (navMenu && hamburger) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('hidden');
    }
}

// Video Observer
function initializeVideoObserver() {
    const video = document.querySelector('.gallery-video');
    if (video) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        }, {
            threshold: 0.5
        });
        
        videoObserver.observe(video);
    }
}

// Beim Laden der Seite ausführen
document.addEventListener('DOMContentLoaded', loadComponents);