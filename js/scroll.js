$(document).ready(function () {
    var scrollLink = $('.scroll');

    //Smooth scrolling
    scrollLink.click(function (e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });
});


var but = document.querySelectorAll("#remove a");

var len = but.length;


for (var i = 0; i < len; i++ ) {
    but[i].addEventListener('click', function () {
        var rem = but[i].parentElement.parentElement.parentElement.parentElement;
        rem.remove();
        var but = document.querySelectorAll("#remove a");
        len = len-1;
    });
}

