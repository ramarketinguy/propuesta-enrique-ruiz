/* =============================================
   RAMARKETING × ENRIQUE RUIZ — PROPUESTA
   Script v2.0 — Interactions & Animations
============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── CURSOR SPOTLIGHT ─── */
    const cursor = document.getElementById('cursor');
    if (cursor) {
        // Disable on touch devices to avoid getting stuck
        if (!window.matchMedia('(pointer: coarse)').matches) {
            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let cursorX = mouseX;
            let cursorY = mouseY;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            const renderCursor = () => {
                cursorX += (mouseX - cursorX) * 0.15;
                cursorY += (mouseY - cursorY) * 0.15;
                cursor.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
                requestAnimationFrame(renderCursor);
            };
            requestAnimationFrame(renderCursor);
        } else {
            cursor.style.display = 'none';
        }
    }

    /* ─── NAVBAR SCROLL ─── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    /* ─── SMOOTH SCROLL FOR ANCHOR LINKS ─── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ─── SCROLL REVEAL ─── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    /* ─── STAT COUNTER ANIMATION ─── */
    const statNums = document.querySelectorAll('.stat-num[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => counterObserver.observe(el));

    function animateCounter(el) {
        const target   = parseInt(el.getAttribute('data-target'), 10);
        const isCurrency = el.classList.contains('currency');
        const duration = 1800;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed  = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = easeOutExpo(progress);
            const value    = Math.round(eased * target);

            if (isCurrency) {
                el.textContent = '$' + value.toLocaleString('es-AR');
            } else {
                el.textContent = value;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                if (isCurrency) {
                    el.textContent = '$' + target.toLocaleString('es-AR');
                } else {
                    el.textContent = target;
                }
            }
        }
        requestAnimationFrame(update);
    }

    function easeOutExpo(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    /* ─── PERSONA CARD HOVER TILT ─── */
    document.querySelectorAll('.persona-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect   = card.getBoundingClientRect();
            const x      = e.clientX - rect.left;
            const y      = e.clientY - rect.top;
            const cx     = rect.width  / 2;
            const cy     = rect.height / 2;
            const tiltX  = ((y - cy) / cy) * 5;
            const tiltY  = ((x - cx) / cx) * -5;
            card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ─── LEVEL ITEMS — HIGHLIGHT ON SCROLL ─── */
    const levelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity    = '1';
                entry.target.style.transform  = 'translateX(0)';
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.level-item').forEach((item, i) => {
        item.style.opacity   = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.5s ${i * 0.1}s ease, transform 0.5s ${i * 0.1}s ease`;
        levelObserver.observe(item);
    });

    /* ─── MONITOR DATA — CYCLING ROW HIGHLIGHT ─── */
    const dataRows = document.querySelectorAll('.data-row:not(.blank)');
    let currentRow = 0;
    if (dataRows.length > 0) {
        setInterval(() => {
            dataRows.forEach(r => r.style.background = '');
            if (dataRows[currentRow]) {
                dataRows[currentRow].style.background = 'rgba(255,107,0,0.06)';
                dataRows[currentRow].style.borderRadius = '4px';
            }
            currentRow = (currentRow + 1) % dataRows.length;
        }, 900);
    }

    /* ─── PRICE CARD — HOVER GLOW ─── */
    document.querySelectorAll('.price-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 40px rgba(255,107,0,0.12)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });

    /* ─── SECTION LABEL — SLIDE IN ─── */
    const labelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
                labelObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section-label').forEach(label => {
        label.style.opacity   = '0';
        label.style.transform = 'translateY(10px)';
        label.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        labelObserver.observe(label);
    });

    /* ─── ACTIVE NAV LINK ─── */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = '#fff';
            }
        });
    }, { passive: true });

});
