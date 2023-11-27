class NavigationHighlighter {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.highlightCurrentPage();
        });
    }

    highlightCurrentPage() {
        const currentPageUrl = window.location.href;
        const links = document.querySelectorAll('.navigation ul li a');

        links.forEach(link => {
            if (link.href === currentPageUrl){
                link.classList.add("nav-active");
            }
        });
    }
}

new NavigationHighlighter();
