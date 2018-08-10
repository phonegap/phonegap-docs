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

    var languageSelect = Sizzle('#language-select')[0];
    var currentUrl = window.location.href;
    var urlArray = currentUrl.replace(/https?:\/\//i, '').split('/');
    for (i = 0; i < languageSelect.children.length; i++) {
        var option = languageSelect.children[i];
        if (getBaseUrl(currentUrl) === getBaseUrl(option.value)) {
            languageSelect.selectedIndex = i;
        }
    }

    languageSelect.addEventListener("change", function (e) {
        ga('send','event','languageChange',e.target.value,languageSelect.options[languageSelect.selectedIndex].text);
        urlArray.shift();
        var newUrl = e.target.value + urlArray.join('/');
        window.location = newUrl;
    });
    /*function resize() {
        if (window.innerWidth>=820 && sidebar.classList.contains('open'))
            sidebar.classList.toggle('open');
    }
    window.addEventListener("resize", resize);*/
});
