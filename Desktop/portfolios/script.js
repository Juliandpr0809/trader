// ============================================
// SCROLL SUAVE Y NAVEGACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeNavbar();
});

// Navegación suave entre secciones
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Evitar scroll si es un anchor vacío
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// ANIMACIONES EN SCROLL
// ============================================

function initializeScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in, .scroll-reveal');
    
    // Usar Intersection Observer para detección de scroll eficiente
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// NAVBAR MEJORADA
// ============================================

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        
        // Cambiar estilo del navbar al hacer scroll
        if (scrollTop > 50) {
            navbar.style.borderBottomColor = 'rgba(34, 34, 34, 0.5)';
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.borderBottomColor = 'rgba(34, 34, 34, 0.3)';
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Destacar link activo en navbar
    highlightActiveNavLink();
    window.addEventListener('scroll', highlightActiveNavLink);
}

function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--color-accent)';
        }
    });
}

// ============================================
// FUNCIONES DE CONTACTO Y NEWSLETTER
// ============================================

function handleNewsletter() {
    const email = prompt('Ingresa tu email para suscribirte:');
    if (email && isValidEmail(email)) {
        alert('¡Gracias por suscribirte! Pronto recibirás las novedades.');
    } else if (email) {
        alert('Por favor, ingresa un email válido.');
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function scrollToContact() {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// EFECTOS DE HOVER EN TARJETAS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    addCardMouseEffects();
});

function addCardMouseEffects() {
    const cards = document.querySelectorAll(
        '.cert-card, .stat-card, .gallery-item'
    );
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// ============================================
// SCROLL PROGRESIVO (Progress Bar)
// ============================================

function initializeScrollProgress() {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d9a3 0%, #1dd1a1 100%);
        z-index: 999;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progress.style.width = scrolled + '%';
    });
}

// Inicializar progress bar al cargar
initializeScrollProgress();

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================

function initializeLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        threshold: 0.1
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
initializeLazyLoading();

// ============================================
// FUNCIONES AUXILIARES GENERALES
// ============================================

// Debounce para optimizar event listeners
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Throttle para limitar frecuencia de ejecución
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// UTILIDAD: COPIAR AL PORTAPAPELES
// ============================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copiado al portapapeles: ' + text);
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// ============================================
// CONSOLE - BIENVENIDA PERSONALIZADA
// ============================================

console.log(`
╔═══════════════════════════════════════╗
║   TRADER PROFESIONAL - SITIO WEB      ║
║     Optimizado y Responsivo           ║
║     © 2024 Todos los derechos         ║
╚═══════════════════════════════════════╝

Bienvenido al sitio del Trader Profesional.
Descubre estrategias probadas y logros verificables.

Para más información, contáctame directamente. 📊💡
`)
