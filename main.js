// Loader
const loader = document.getElementById("loader");
const loaderPage = document.getElementById("loader-page");

function timeLoader() {
    loaderTimer = setTimeout(hideLoader, 2500);
}

function hideLoader() {
    loader.style.display = "none";
    loaderPage.style.display = "none";
}

// Not currently in use
/*
function hamburgerMenu() {
    var x = document.getElementById("mobile-links");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
*/
