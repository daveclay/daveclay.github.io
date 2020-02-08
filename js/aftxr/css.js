(function() {
    var vendorProperties = {
        '': {
            transitionEnd: 'transitionend',
            radialGradient: 'radial-gradient(ellipse at center, %s)'
        },
        'webkit': {
            transitionEnd: 'webkitTransitionEnd',
            radialGradient: '-webkit-radial-gradient(center, ellipse cover, %s)'
        },
        'Moz': {
            transitionEnd: 'transitionend',
            radialGradient: '-moz-radial-gradient(center, ellipse cover, %s)'
        },
        'O': {
            transitionEnd: 'oTransitionEnd',
            radialGradient: '-o-radial-gradient(center, ellipse cover, %s)'
        },
        'ms': {
            transitionEnd: 'MSTransitionEnd',
            radialGradient: '-ms-radial-gradient(center, ellipse cover, %s)'
        }
    };

    var vendor = (function () {
        var vendors = 't,webkitT,MozT,msT,OT'.split(','),
            dummyStyle = document.createElement('div').style,
            t,
            i = 0,
            l = vendors.length;

        for ( ; i < l; i++ ) {
            t = vendors[i] + 'ransform';
            if ( t in dummyStyle ) {
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }

        return false;
    })();

    function filterGradient(colors) {
    }

    function prefixTrassform(style) {
        if ( vendor === '' ) return style;
        style = style.charAt(0).toUpperCase() + style.substr(1);
        return vendor + style;
    }

    var CSSUtils = {
        prefixStyle: prefixTrassform,
        cssVendor: vendor ? '-' + vendor.toLowerCase() + '-' : '',
        transformOrigin: prefixTrassform('transformOrigin'),
        transform: prefixTrassform('transform'),
        transitionDuration: prefixTrassform('transitionDuration'),

        transitionEndEvent: (function () {
            if ( vendor === false ) return false;
            return vendorProperties[vendor].transitionEnd
        })()
    };

    window.CSSUtils = CSSUtils;
})();
