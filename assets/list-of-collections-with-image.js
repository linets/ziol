document.addEventListener('DOMContentLoaded', function () {
    var swipers = document.querySelectorAll('.mySwiper');

    function initSwiper() {
        swipers.forEach(function (swiperElement) {
            var slidesToShow;
            var spaceBetweens;

            if (window.innerWidth >= 1024) {
                slidesToShow = 4;
                spaceBetweens = 26;
            } else if (window.innerWidth >= 840) {
                slidesToShow = 3;
                spaceBetweens = 20;
            } else {
                slidesToShow = 2;
                spaceBetweens = 19;
            }

            if (swiperElement.swiper) {
                swiperElement.swiper.destroy(true, true);
            }

            new Swiper(swiperElement, {
                spaceBetween: spaceBetweens,
                slidesPerView: slidesToShow,
                navigation: {
                    nextEl: swiperElement.querySelector('.swiper-button-next'),
                    prevEl: swiperElement.querySelector('.swiper-button-prev'),
                },
            });
        });
    }

    initSwiper();

    window.addEventListener('resize', function () {
        initSwiper();
    });
});
