$(document).ready(function() {
    var scrollLink = $('.scroll');

    //Smooth scrolling
    scrollLink.click(function(e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });
})


var remove_from_cart = document.getElementById('remove');


remove_from_cart.addEventListener('click', function () {
    console.log("clicked")
});