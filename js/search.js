$("#search-input").change(function () {
    localStorage.setItem("value", event.target.value);
    window.location.pathname = "/all-product.html";
});
