function getBaseUrl(urlString) {
    return urlString.replace(/https?:\/\//i, '').split('/')[0];
}


document.addEventListener('DOMContentLoaded', function (event) {
    var toggleButton = Sizzle('.mobile-docs-toggle')[0];
    var sidebar = Sizzle('aside.sidebar')[0];
    var body = Sizzle('body')[0];

    toggleButton.addEventListener("click", function (e) {
        sidebar.classList.toggle('open');
        body.classList.toggle('menu-open');
    });
    /*function resize() {
        if (window.innerWidth>=820 && sidebar.classList.contains('open'))
            sidebar.classList.toggle('open');
    }
    window.addEventListener("resize", resize);*/
});
