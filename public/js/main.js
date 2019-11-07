if($(window).width() > 991) {
	$('.carousel-image').height($(window).height() - 0);
    $(window).resize(function () {
        $('.carousel-image').height($(window).height() - 0);
    });
    } else {
    $('.carousel-image').height($(window).height() - 56);
    $(window).resize(function () {
        $('.carousel-image').height($(window).height() - 56);
    });
}

$(function() {
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 100) {
            $(".navbar-desk").addClass("navbar-desk-on-scroll");
        } else {
            $(".navbar-desk").removeClass("navbar-desk-on-scroll");
        }
    });
});