
window.onload = function () {
    var menuButton = document.getElementsByClassName("menu-btn")[0];
    menuButton.onclick = function () {
        var element = document.getElementsByClassName("header-menu")[0];
        element.classList.toggle("slide-in");
    }
}