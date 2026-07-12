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
    // 4. Advanced Smooth Scaling Reveal Animations
    // =================================-----------------
    const cards = document.querySelectorAll('.bento-card');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.05,
        rootMargin: '0px 0px -80px 0px' // Reveal slightly before card hits viewport
    });

    cards.forEach((card, index) => {
        // Initial states: shifted down and slightly scaled down for premium feel
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.97)';
        
        // Custom elegant cubic-bezier for spring-like weight entry
        card.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transitionDelay = `${index * 90}ms`; // Dynamic staggered delays
        
        revealObserver.observe(card);
    });
});
