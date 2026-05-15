/*
 * script.js — Shared site-wide JavaScript
 *
 * Loaded on every page. Handles:
 *   1. Mobile sidebar toggle (hamburger ↔ X + overlay)
 *   2. Contact form client-side validation
 *   3. Hero image opacity on load
 *
 * Page-specific logic lives in its own file (e.g. js/projects.js).
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. MOBILE SIDEBAR TOGGLE
    //
    // Elements injected into every page by the Python script:
    //   #sidebarToggle  — hamburger button in .mobile-topbar
    //   #sidebarClose   — X button inside the sidebar
    //   #sidebarOverlay — full-screen dim layer behind sidebar
    //   #sidebar        — the <aside> element
    //
    // Opening:  add class "open" to #sidebar and #sidebarOverlay
    // Closing:  remove "open" from both
    // =========================================================
    const sidebar        = document.getElementById('sidebar');
    const sidebarToggle  = document.getElementById('sidebarToggle');
    const sidebarClose   = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
        if (!sidebar) return;
        sidebar.classList.add('open');
        sidebarOverlay && sidebarOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent page scroll while drawer is open
    }

    function closeSidebar() {
        if (!sidebar) return;
        sidebar.classList.remove('open');
        sidebarOverlay && sidebarOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Open on hamburger click
    sidebarToggle  && sidebarToggle.addEventListener('click', openSidebar);

    // Close on X click (inside sidebar)
    sidebarClose   && sidebarClose.addEventListener('click', closeSidebar);

    // Close when tapping the dim overlay
    sidebarOverlay && sidebarOverlay.addEventListener('click', closeSidebar);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSidebar();
    });

    // Close sidebar automatically when a nav link is tapped on mobile
    // (needed if navigating to an anchor on the same page)
    if (sidebar) {
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) closeSidebar();
            });
        });
    }

    // Re-enable scroll if window resizes above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            document.body.style.overflow = '';
        }
    });

    // =========================================================
    // 2. CONTACT FORM — basic client-side validation.
    // Replace the alert() with a real backend call when ready
    // (e.g. fetch('/api/contact', { method: 'POST', body: formData }))
    // =========================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name    = document.getElementById('name').value.trim();
            const email   = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && subject && message) {
                // TODO: replace with real form submission
                alert(`Thank you, ${name}! Your message has been sent.\n\nI'll reply to ${email} as soon as possible.`);
                this.reset();
            }
        });
    }

    // =========================================================
    // 3. HERO IMAGE — ensure opacity is correct after load
    // =========================================================
    document.querySelectorAll('.hero-image img').forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => { img.style.opacity = '1'; });
        }
    });

    console.log('Ben Evans Portfolio — loaded');
});
