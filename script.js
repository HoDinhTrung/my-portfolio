document.addEventListener('DOMContentLoaded', () => {
    // =================================-----------------
    // 1. Bilingual Language Switcher Logic
    // =================================-----------------
    const btnVi = document.getElementById('btn-vi');
    const btnEn = document.getElementById('btn-en');
    const htmlNode = document.documentElement;

    const setLanguage = (lang) => {
        // Set lang attribute on <html> element
        htmlNode.setAttribute('lang', lang);
        
        // Update active class on buttons
        if (lang === 'vi') {
            btnVi.classList.add('active');
            btnEn.classList.remove('active');
        } else {
            btnEn.classList.add('active');
            btnVi.classList.remove('active');
        }
        
        // Save user preference
        localStorage.setItem('portfolio-lang', lang);
        
        // Re-trigger scroll indicator trigger since layout height might change slightly
        observer.disconnect();
        sections.forEach(section => observer.observe(section));
    };

    // Click Event Listeners
    btnVi.addEventListener('click', () => setLanguage('vi'));
    btnEn.addEventListener('click', () => setLanguage('en'));

    // Check localStorage or fallback to navigator language or default 'vi'
    const savedLang = localStorage.getItem('portfolio-lang');
    if (savedLang === 'vi' || savedLang === 'en') {
        setLanguage(savedLang);
    } else {
        // Detect system browser language
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang.startsWith('en')) {
            setLanguage('en');
        } else {
            setLanguage('vi'); // Default
        }
    }

    // =================================-----------------
    // 2. Navigation Active State Link Highlighter
    // =================================-----------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -50% 0px', // Sweet spot of the viewport
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Fallback scroll listener for top of screen
    window.addEventListener('scroll', () => {
        if (window.scrollY < 80) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#hero') {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });

    // =================================-----------------
    // 3. Custom Smooth Scrolling for Sticky Nav Offset
    // =================================-----------------
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20; // 20px padding offset
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =================================-----------------
    // 4. Scroll Parallax & Entrance Animations
    // =================================-----------------
    const cards = document.querySelectorAll('.bento-card');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.02,
        rootMargin: '0px 0px -60px 0px'
    });

    cards.forEach((card, index) => {
        // Initial setup for reveal
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.97)';
        card.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transitionDelay = `${index * 80}ms`;
        
        revealObserver.observe(card);
    });

    // Subtle scroll-driven parallax movement
    const handleScrollParallax = () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;
        
        cards.forEach((card, index) => {
            if (card.classList.contains('visible')) {
                const rect = card.getBoundingClientRect();
                const cardTop = rect.top + scrolled;
                const cardHeight = rect.height;
                
                // Calculate the card center relative to scroll position
                const cardCenter = cardTop + cardHeight / 2;
                const viewportCenter = scrolled + viewportHeight / 2;
                
                // Distance from viewport center
                const distance = cardCenter - viewportCenter;
                
                // Alternate moving direction for alternate cards to create depth
                const factor = (index % 2 === 0) ? 0.025 : -0.025;
                const translateY = distance * factor;
                
                // Apply transition for scroll rendering to avoid visual jumps
                card.style.transition = 'transform 0.15s ease-out, opacity 1s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.transitionDelay = '0ms'; // Clear delay once visible
                card.style.transform = `translateY(${translateY}px) scale(1)`;
            }
        });
    };

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(handleScrollParallax);
    });
});
