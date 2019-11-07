$('.owl-home').owlCarousel({
    loop:false,
    margin:0,
    nav:false,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    animateIn: 'fadeInLeft',
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

$('.owl-office').owlCarousel({
    loop:false,
    margin:0,
    nav:false,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    animateIn: 'fadeInLeft',
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

$('.owl-news').owlCarousel({
    loop:false,
    margin:30,
    nav:false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            stagePadding: 0
        },
        768:{
            items: 2,
            stagePadding: 0
        },
        992:{
            items:3,
        }
    }
});