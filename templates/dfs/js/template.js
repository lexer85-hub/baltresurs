(function ($) {
    'use strict';

    $(window).on('load', function () {
        new JCaption('img.caption');
    });

    $(function () {
        var $sliderButtons = $('.slider-but');
        var $sliderTrack = $('.slider-data');
        var sliderTimer;

        function showSlide(index) {
            $sliderButtons.removeClass('active').eq(index).addClass('active');
            $sliderTrack.stop(true).animate({ marginLeft: (-1200 * index) + 'px' });
        }

        function restartSlider() {
            window.clearInterval(sliderTimer);
            sliderTimer = window.setInterval(function () {
                var index = $sliderButtons.index($sliderButtons.filter('.active'));
                showSlide((index + 1) % $sliderButtons.length);
            }, 7000);
        }

        if ($sliderButtons.length > 1) {
            $sliderButtons.on('click', function () {
                showSlide($sliderButtons.index(this));
                restartSlider();
            });
            restartSlider();
        }

        if ($('.content-left li:last-child').hasClass('active')) {
            $('.content-left li:nth-last-child(2)').addClass('subactive');
        }

        var $callbackOpen = $('#callback-open');
        var $callbackForm = $('.callback-form');
        $callbackOpen.on('click', function () {
            var open = $callbackOpen.attr('aria-expanded') !== 'true';
            $callbackOpen.attr('aria-expanded', String(open));
            $callbackForm.stop(true, true).toggle(200);
        });
        $('#callback-close').on('click', function () {
            $callbackOpen.attr('aria-expanded', 'false').focus();
            $callbackForm.stop(true, true).hide(200);
        });
        $('#callback-open, #callback-close').on('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });

        $('.fb').fancybox({ padding: 0, margin: 0 });

        $(document).on('submit', '#contacts-form, #callback-form, .order-form-data', function (event) {
            event.preventDefault();

            var $form = $(this);
            var $status = $form.find('.static-form-message');
            if (!$status.length) {
                $status = $('<p class="static-form-message" role="status"></p>').appendTo($form);
            }
            $status.text('Это локальная копия. Отправка формы отключена.');
        });
    });
})(jQuery);
