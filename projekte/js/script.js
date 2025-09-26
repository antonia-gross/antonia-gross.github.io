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

// Image Comparison Slider JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('imageSlider');
    const handle = document.getElementById('sliderHandle');
    const afterImage = slider.querySelector('.image-after');
    
    let isDragging = false;
    
    function updateSlider(x) {
        const rect = slider.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, (x - rect.left) / rect.width * 100));
        
        handle.style.left = percentage + '%';
        afterImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        
        // Label nur anzeigen wenn Slider nach links verschoben wird (unter 72.5%)
        const schoolLabel = document.getElementById('schoolLabel');
        if (percentage < 72.5) {
            schoolLabel.classList.add('visible');
        } else {
            schoolLabel.classList.remove('visible');
        }
    }
    
    // Mouse events
    handle.addEventListener('mousedown', function(e) {
        isDragging = true;
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            updateSlider(e.clientX);
        }
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // Touch events for mobile
    handle.addEventListener('touchstart', function(e) {
        isDragging = true;
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            updateSlider(e.touches[0].clientX);
        }
    });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // Click on slider to move handle
    slider.addEventListener('click', function(e) {
        if (e.target !== handle) {
            updateSlider(e.clientX);
        }
    });
    
    // Initialize slider position to match right third
    updateSlider(slider.getBoundingClientRect().left + slider.getBoundingClientRect().width * 0.725);
});
    
// Beim Laden der Seite ausführen
document.addEventListener('DOMContentLoaded', loadComponents);