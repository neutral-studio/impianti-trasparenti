(function () {
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if (page === "") {
        page = "impianti";
    }

    console.log("Pagina Corrente > " + page);

    document.getElementById(page).classList.add("kt-menu__item--active");
})();