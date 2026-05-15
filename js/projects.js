/*
 * projects.js — Project page logic
 *
 * HOW TO ADD A NEW PROJECT:
 *   1. Add a card in projects.html (copy the template below)
 *   2. Add a matching entry to projectData below (same key as the <h3> text)
 *   3. Optionally add a new filter category (web / mobile / ai / etc.)
 *      — add <button data-filter="newcat"> in filter-tabs
 *      — set data-category="newcat" on the article card
 *
 * HTML CARD TEMPLATE (paste inside #projectsGrid):
 * --------------------------------------------------
 *   <article class="project-card" data-category="web">
 *     <div class="project-banner">
 *       <img src="./images/proj-YOURIMAGE.jpg" alt="Project Name" loading="lazy">
 *       <div class="project-banner-overlay"></div>
 *       <span class="project-category">Web Dev</span>   ← label text
 *     </div>
 *     <div class="project-info">
 *       <h3>Project Name</h3>                           ← must match projectData key
 *       <p>Short one-sentence description.</p>
 *       <div class="project-tags">
 *         <span class="tag">React</span>
 *         <span class="tag">Node.js</span>
 *       </div>
 *     </div>
 *     <div class="project-footer">
 *       <button class="btn btn-primary btn-sm view-btn" style="flex:1;">View Details</button>
 *       <a href="https://github.com/..." class="btn btn-secondary btn-sm"><i class="bi bi-github"></i></a>
 *     </div>
 *   </article>
 * --------------------------------------------------
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // PROJECT DATA — powers the detail modal popup.
    // Key must exactly match the <h3> text of the card.
    //
    // To add a project: copy one block below and edit the values.
    // =========================================================
    const projectData = {

        'NeuralFlow Engine': {
            description: 'High-performance AI inference engine built in Rust with WebAssembly targets for in-browser execution. Features custom tensor operations, dynamic graph compilation, and SIMD-optimized kernels for maximum throughput.',
            details: [
                'Custom tensor computation graph with automatic differentiation',
                'WebAssembly bindings for seamless browser integration',
                'SIMD-optimized kernel operations for CPU inference',
                'Quantization support (FP16, INT8) for edge deployment',
                'Benchmarked 3x faster than TensorFlow Lite in-browser'
            ],
            github: '#',   // ← replace # with GitHub URL
            tags: ['Rust', 'WASM', 'Python', 'SIMD']
        },

        'Architect UI Kit': {
            description: 'A comprehensive headless React component library with accessibility-first design. Ships with 45+ components, built-in theming, zero-runtime CSS, and full TypeScript support.',
            details: [
                '45+ headless React components with full ARIA compliance',
                'Built-in design token system with dark mode support',
                'Zero-runtime CSS with compile-time extraction',
                'Comprehensive Storybook documentation with interactive examples',
                'Tree-shakeable — only ship what you use'
            ],
            github: '#',
            tags: ['React', 'TypeScript', 'CSS', 'Storybook']
        },

        'Vigor Mobile': {
            description: 'Cross-platform fitness tracking application with real-time biometric monitoring, custom workout plans, social challenges, and integration with wearable devices.',
            details: [
                'Cross-platform — iOS, Android, and Web from a single codebase',
                'Real-time heart rate monitoring via Bluetooth LE',
                'AI-powered workout recommendations based on progress',
                'Social challenges with leaderboards and achievements',
                'Offline-first architecture with background sync'
            ],
            github: '#',
            tags: ['Flutter', 'Dart', 'Firebase', 'Bluetooth LE']
        },

        'VisionNet Pipeline': {
            description: 'Real-time object detection and tracking pipeline using a custom YOLO architecture. Optimized for edge deployment with TensorRT acceleration and ONNX runtime support.',
            details: [
                'Custom YOLO-v8 architecture with 2x faster inference',
                'TensorRT optimization for NVIDIA GPU deployment',
                'ONNX runtime support for cross-platform inference',
                'Multi-object tracking with DeepSORT algorithm',
                'Achieves 60 FPS on NVIDIA Jetson Orin'
            ],
            github: '#',
            tags: ['Python', 'PyTorch', 'CUDA', 'TensorRT']
        }

        // ← paste new project entry here
    };

    // =========================================================
    // FILTER BUTTONS — shows/hides cards by data-category
    // =========================================================
    const filterBtns  = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects(category) {
        projectCards.forEach(card => {
            card.style.display =
                category === 'all' || card.dataset.category === category
                    ? 'flex' : 'none';
        });
    }

    // Search filters by title, description, and tags simultaneously
    function searchProjects(query) {
        const lower = query.toLowerCase();
        projectCards.forEach(card => {
            if (!card.querySelector('h3')) return;
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc  = card.querySelector('p').textContent.toLowerCase();
            let tagMatch = false;
            card.querySelectorAll('.tag').forEach(t => {
                if (t.textContent.toLowerCase().includes(lower)) tagMatch = true;
            });

            const matchesSearch  = title.includes(lower) || desc.includes(lower) || tagMatch;
            const activeFilter   = document.querySelector('.filter-btn.btn-primary');
            const category       = activeFilter ? activeFilter.dataset.filter : 'all';
            const matchesFilter  = category === 'all' || card.dataset.category === category;

            card.style.display = matchesSearch && matchesFilter ? 'flex' : 'none';
        });
    }

    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-secondary');
                });
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-primary');
                filterProjects(btn.dataset.filter);
                if (searchInput && searchInput.value) searchProjects(searchInput.value);
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => searchProjects(searchInput.value));
    }

    // =========================================================
    // MODAL — opens when "View Details" is clicked on a card.
    // Populates from projectData using the card's <h3> as key.
    // =========================================================
    const modalOverlay     = document.getElementById('projectModal');
    const modalClose       = document.getElementById('modalClose');
    const modalCloseBottom = document.getElementById('modalCloseBottom');
    const modalTitle       = document.getElementById('modalTitle');
    const modalDesc        = document.getElementById('modalDesc');
    const modalDetails     = document.getElementById('modalDetails');
    const modalTags        = document.getElementById('modalTags');
    const modalGithub      = document.getElementById('modalGithub');

    function openModal(title) {
        const data = projectData[title];
        if (!data) return;

        modalTitle.textContent  = title;
        modalDesc.textContent   = data.description;
        modalTags.innerHTML     = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
        modalDetails.innerHTML  = data.details.map(d => `<li>${d}</li>`).join('');
        modalGithub.href        = data.github;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Wire up "View Details" buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.closest('.project-card').querySelector('h3').textContent;
            openModal(title);
        });
    });

    // Close via X, bottom button, clicking the backdrop, or Escape key
    if (modalClose)       modalClose.addEventListener('click', closeModal);
    if (modalCloseBottom) modalCloseBottom.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
    }
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

});
