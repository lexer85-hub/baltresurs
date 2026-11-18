(function () {
    'use strict';

    var maps = window.ymaps;
    if (!maps) {
        return;
    }

    maps.ready(function () {
        document.querySelectorAll('.spb-webmaster[data-coordinates]').forEach(function (container) {
            var center = container.dataset.coordinates.split(',').map(Number);
            var fallback = container.querySelector('.static-map-link');

            try {
                var map = new maps.Map(container, {
                    center: center,
                    zoom: 16,
                    controls: ['fullscreenControl']
                });
                map.behaviors.disable('scrollZoom');
                map.geoObjects.add(new maps.Placemark(center, {
                    balloonContent: container.dataset.place
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/images/map_icon.png',
                    iconImageSize: [67, 66],
                    iconImageOffset: [0, 0]
                }));
                fallback.remove();
            } catch (error) {
                // Keep the directions link available if the map service cannot render.
                if (!container.contains(fallback)) {
                    container.append(fallback);
                }
            }
        });
    });
})();
