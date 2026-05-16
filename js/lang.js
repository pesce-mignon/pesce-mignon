// Language switcher
(function() {
    const lang = localStorage.getItem('lang') || 'en';
    document.documentElement.classList.add(lang + '-lang');
    
    function setLang(l) {
        document.documentElement.classList.remove('en-lang', 'fr-lang');
        document.documentElement.classList.add(l + '-lang');
        localStorage.setItem('lang', l);
        updateLangLinks();
    }
    
    function updateLangLinks() {
        const current = localStorage.getItem('lang') || 'en';
        const links = document.querySelectorAll('.lang-switcher a');
        links.forEach(link => {
            link.classList.toggle('active', link.dataset.lang === current);
        });
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        updateLangLinks();
        const switcher = document.createElement('div');
        switcher.className = 'lang-switcher';
        switcher.innerHTML = '
            <a href="#" data-lang="en" class="en-link">EN</a>
            <a href="#" data-lang="fr" class="fr-link">FR</a>
        ';
        document.querySelector('header').appendChild(switcher);
        
        switcher.addEventListener('click', function(e) {
            e.preventDefault();
            const target = e.target.closest('a');
            if (target && target.dataset.lang) {
                setLang(target.dataset.lang);
            }
        });
    });
})();
