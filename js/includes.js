// Include system for pesce-mignon
// Usage: Add <div data-include="path/to/file.html"></div> to your HTML
(function() {
    function includeHTML() {
        const elements = document.querySelectorAll('[data-include]');
        elements.forEach(el => {
            const file = el.dataset.include;
            fetch(file)
                .then(response => response.text())
                .then(html => {
                    el.outerHTML = html;
                    // Fix home link based on current path
                    fixHomeLink();
                })
                .catch(err => console.error('Include error:', err));
        });
    }
    
    function fixHomeLink() {
        const homeLink = document.getElementById('home-link');
        if (!homeLink) return;
        
        const path = window.location.pathname;
        const isRoot = path === '/' || path === '' || path === '/index.html';
        
        if (isRoot) {
            homeLink.href = '.';
        } else {
            // Count path depth
            const parts = path.split('/').filter(Boolean);
            const depth = parts.length;
            homeLink.href = '../'.repeat(depth);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', includeHTML);
    } else {
        includeHTML();
    }
})();
