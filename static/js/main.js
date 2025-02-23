/*

[Main Script]

Project: GREENSSD - Multipurpose Technology, Hosting Business with WHMCS Template
Version: 1.7
Author : themelooks.com

*/

;(function ($) {
    "use strict";
    
    /* ------------------------------------------------------------------------- *
     * COMMON VARIABLES
     * ------------------------------------------------------------------------- */
    var $wn = $(window),
        $body = $('body');

    /* ------------------------------------------------------------------------- *
     * FAKELOADER
     * ------------------------------------------------------------------------- */
    var $preloader = $('#preloader');

    if ( $preloader.length ) {
        $preloader.fakeLoader({ spinner: 'spinner2', bgColor: false, zIndex: '9999999999' });
    }
        
    /* ------------------------------------------------------------------------- *
     * TAWK
     * ------------------------------------------------------------------------- */
    if ( typeof Tawk_API !== 'undefined' ) {
        Tawk_API = Tawk_API || {};
        Tawk_API.onLoad = function(){
            if ( $('#tawkchat-container').length ) {
                $body.addClass('isTawkMobile');
            }
        };
    }
    
    /* ------------------------------------------------------------------------- *
     * Check Data
     * ------------------------------------------------------------------------- */
    var checkData = function (data, value) {
        return typeof data === 'undefined' ? value : data;
    };

    $(function () {
        /* ------------------------------------------------------------------------- *
         * BACKGROUND IMAGE
         * ------------------------------------------------------------------------- */
        var $bgImg = $('[data-bg-img]');
        
        $bgImg.each(function () {
            var $t = $(this);

            $t.css('background-image', 'url(' + $t.data('bg-img') + ')').addClass('bg--img bg--overlay').attr('data-rjs', 2).removeAttr('data-bg-img');
        });
        
        /* ------------------------------------------------------------------------- *
         * RETINAJS
         * ------------------------------------------------------------------------- */
        retinajs();
        
        /* ------------------------------------------------------------------------- *
         * STICKYJS
         * ------------------------------------------------------------------------- */
        var $sticky = $('[data-sticky]');
        
        $sticky.each(function () {
            $(this).sticky({
                zIndex: 999
            });
        });
        
        /* ------------------------------------------------------------------------- *
         * MAGNIFIC POPUP
         * ------------------------------------------------------------------------- */
        var $popupVideo = $('[data-popup="video"]');
        
        if ( $popupVideo.length ) {
            $popupVideo.magnificPopup({
                type: 'iframe'
            });
        }
        
        /* ------------------------------------------------------------------------- *
         * FORM VALIDATION
         * ------------------------------------------------------------------------- */
        var $formValidation = $('[data-form-validation] form');
        
        $formValidation.each(function () {
            var $t = $(this);
            
            $t.validate({
                errorPlacement: function () {
                    return true;
                }
            });
        });
        
        /* ------------------------------------------------------------------------- *
         * COUNTER UP
         * ------------------------------------------------------------------------- */
        var $counterUp = $('[data-counter-up="numbers"]');
            
        if ( $counterUp.length ) {
            $counterUp.counterUp({
                delay: 10,
                time: 1000
            });
        }
        
        /* -------------------------------------------------------------------------*
         * COUNTDOWN
         * -------------------------------------------------------------------------*/
        var $countDown = $('[data-countdown]');
            
        $countDown.each(function () {
            var $t = $(this);
            
            $t.countdown($t.data('countdown'), function(e) {
                $(this).html( '<ul>' + e.strftime('<li><strong>%D</strong><span>Days</span></li><li><strong>%H</strong><span>Hours</span></li><li><strong>%M</strong><span>Minutes</span></li><li><strong>%S</strong><span>Seconds</span></li>') + '</ul>' );
            });
        });
        
        /* ------------------------------------------------------------------------- *
         * OWL CAROUSEL
         * ------------------------------------------------------------------------- */
        var $owlCarousel = $('.owl-carousel');
        
        $owlCarousel.each(function () {
            var $t = $(this);
            
            $t.owlCarousel({
                items: checkData( $t.data('owl-items'), 1 ),
                margin: checkData( $t.data('owl-margin'), 0 ),
                loop: checkData( $t.data('owl-loop'), true ),
                smartSpeed: 1200,
                autoplaySpeed: 800,
                autoplay: checkData( $t.data('owl-autoplay'), true ),
                mouseDrag: checkData( $t.data('owl-drag'), true ),
                nav: checkData( $t.data('owl-nav'), false ),
                navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
                dots: checkData( $t.data('owl-dots'), false ),
                responsive: checkData( $t.data('owl-responsive'), {} )
            });
        });
        
        /* ------------------------------------------------------------------------- *
         * HEADER SECTION
         * ------------------------------------------------------------------------- */
        var $header = $('#header'),
            $headerTopbar = $header.find('.header--topbar'),
            $headerLogo = $header.find('.header--topbar-logo'),
            $headerNavbarWrapper = $header.find('.header--navbar-wrapper'),
            headerNavbarWrapperHalf = false;

        if ( $headerTopbar.length ) {
            $headerTopbar.css('height', $headerLogo.outerHeight());
        }

        if ( $headerNavbarWrapper.length ) {
            $header.css('padding-bottom', ($headerNavbarWrapper.outerHeight() / 2) );
            headerNavbarWrapperHalf = true;
        }
        
        /* ------------------------------------------------------------------------- *
         * PAGE HEADER SECTION
         * ------------------------------------------------------------------------- */
        var $pageHeader = $('#pageHeader');

        if ( headerNavbarWrapperHalf ) {
            $pageHeader.css('padding-top', ( parseInt( $pageHeader.css('padding-top'), 10 ) + ($headerNavbarWrapper.outerHeight() / 2) ) );
        }
        
        /* ------------------------------------------------------------------------- *
         * BANNER SECTION
         * ------------------------------------------------------------------------- */
        var $banner = $('#banner'),
            $bannerItem = $banner.find('.banner--item');

        if ( headerNavbarWrapperHalf ) {
            $bannerItem.css('padding-top', ( parseInt( $bannerItem.css('padding-top'), 10 ) + ($headerNavbarWrapper.outerHeight() / 2) ) );
        }

        /* ------------------------------------------------------------------------- *
         * PRICING SECTION
         * ------------------------------------------------------------------------- */
        var $pricingNavSwitch = $('.pricing--nav-switch'),
            $pricingNavSwitchList = $pricingNavSwitch.find('li'),
            $pricingNavSwitchActive = $pricingNavSwitch.find('li.active'),
            $pricingNavSwitchBg = $pricingNavSwitch.find('.item--bg');

        if ( $pricingNavSwitch.length ) {
            $pricingNavSwitchBg.css({
                'left': $pricingNavSwitchActive.position().left,
                'width': $pricingNavSwitchActive.outerWidth()
            });

            $pricingNavSwitchList.on('click', function () {
                var $t = $(this);

                $pricingNavSwitchBg.css({
                    'left': $t.position().left,
                    'width': $t.outerWidth()
                });
            });
        }

        /* ------------------------------------------------------------------------- *
         * PRICING DETAILS SECTION
         * ------------------------------------------------------------------------- */
        var $pricingDetails = $('#pricingDetails'),
            $pricingDetailsHeader = $pricingDetails.find('.pricing--header'),
            $pricingDetailsPrice = $pricingDetails.find('.pricing--price'),
            pricingDetailsHeaderH = 0,
            pricingDetailsPriceH = 0;

        $pricingDetailsHeader.each(function (i) {
            var $t = $(this);

            pricingDetailsHeaderH = $t.outerHeight() > pricingDetailsHeaderH ? $t.outerHeight() : pricingDetailsHeaderH;

            if ( $pricingDetailsHeader.length === (i + 1) ) {
                $pricingDetailsHeader.css('height', pricingDetailsHeaderH);
            }
        });

        $pricingDetailsPrice.each(function (i) {
            var $t = $(this);

            pricingDetailsPriceH = $t.outerHeight() > pricingDetailsPriceH ? $t.outerHeight() : pricingDetailsPriceH;

            if ( $pricingDetailsPrice.length === (i + 1) ) {
                $pricingDetailsPrice.css('min-height', pricingDetailsPriceH);
            }
        });

        /* ------------------------------------------------------------------------- *
         * VPS PRICING SECTION
         * ------------------------------------------------------------------------- */
        var $vpsPricing = $('#vpsPricing'),
            vpsPricingObj = {};
        
        vpsPricingObj.$slider = $vpsPricing.find('.vps-pricing--slider');
        vpsPricingObj.$putValue = $vpsPricing.find('[data-put-value]');
        vpsPricingObj.$putHref = $vpsPricing.find('[data-put-href]');

        vpsPricingObj.slider = function (res) {
            vpsPricingObj.slider.value = 1;
            vpsPricingObj.slider.max = res.length - 1;
            
            vpsPricingObj.slider.changeValue = function (e, ui) {
                vpsPricingObj.slider.value = $.isEmptyObject( ui ) ? vpsPricingObj.slider.value : ui.value;
                
                vpsPricingObj.$putValue.each(function () {
                    var $t = $(this);
                    
                    $t.text( res[ vpsPricingObj.slider.value ][ $t.data('put-value') ] );
                });
                
                vpsPricingObj.$putHref.each(function () {
                    var $t = $(this);
                    
                    $t.attr( 'href', res[ vpsPricingObj.slider.value ][ vpsPricingObj.$putHref.data('put-href') ] );
                });

                var indx = typeof ui.value === 'undefined' ? vpsPricingObj.slider.value : ui.value;
                vpsPricingObj.$plansListItem.eq( indx ).addClass('active').siblings('li').removeClass('active');
            };
            
            vpsPricingObj.$slider.slider({
                animate: 'fast',
                range: 'min',
                min: 0,
                max: vpsPricingObj.slider.max,
                value: vpsPricingObj.slider.value,
                step: 1,
                create: function (e, ui) {
                    vpsPricingObj.$plansList = $('<ul class="vps-pricing--plans nav nav-justified"></ul>');
                    $(e.target).append( vpsPricingObj.$plansList );

                    $.each(res, function (i, value) {
                        vpsPricingObj.$plansList.append('<li>' + value.title + '</li>');
                    });
                    vpsPricingObj.$plansListItem = vpsPricingObj.$plansList.children('li');

                    vpsPricingObj.slider.changeValue(e, ui);
                },
                slide: vpsPricingObj.slider.changeValue
            });
        };
        
        if ( $vpsPricing.length ) {
            $.getJSON('json/vps-plans.json', vpsPricingObj.slider);
        }

        vpsPricingObj.$pricingFeatureHeader = $vpsPricing.find('.vps-pricing--feature .pricing--price');
        vpsPricingObj.$pricingFeatureHeaderH = 0;

        vpsPricingObj.$pricingFeatureHeader.each(function (i) {
            var $t = $(this);

            vpsPricingObj.$pricingFeatureHeaderH = vpsPricingObj.$pricingFeatureHeaderH > $t.outerHeight() ? vpsPricingObj.$pricingFeatureHeaderH : $t.outerHeight();

            if ( vpsPricingObj.$pricingFeatureHeader.length === (i + 1) ) {
                vpsPricingObj.$pricingFeatureHeader.css('height', vpsPricingObj.$pricingFeatureHeaderH);
            }
        });

        /* ------------------------------------------------------------------------- *
         * PRODUCT RATING
         * ------------------------------------------------------------------------- */
        var $productRatingSelect = $('#productRatingSelect');
        
        if ( $productRatingSelect.length ) {
            $productRatingSelect.barrating({
                theme: 'fontawesome-stars-o',
                hoverState: false
            });
        }

        /* ------------------------------------------------------------------------- *
         * CHECKOUT SECTION
         * ------------------------------------------------------------------------- */
        var $checkout = $('#checkout');
        
        $checkout.on('click', '.checkout--info-toggle', function (e) {
            e.preventDefault();

            var $t = $(this);

            $t.parent('p').siblings('.checkout--info-form').slideToggle();
        });
        
        /* -------------------------------------------------------------------------*
         * MAP
         * -------------------------------------------------------------------------*/
        var $map = $('#map'),
            setMap = function () {
                var map = new google.maps.Map($map[0], {
                    center: {lat: $map.data('map-latitude'), lng: $map.data('map-longitude')},
                    zoom: $map.data('map-zoom'),
                    scrollwheel: false,
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
                });
                
                if ( typeof $map.data('map-marker') !== 'undefined' ) {
                    var data = $map.data('map-marker'),
                        i = 0;

                    for ( i; i < data.length; i++ ) {
                        new google.maps.Marker({
                            position: {lat: data[i][0], lng: data[i][1]},
                            map: map,
                            animation: google.maps.Animation.DROP,
                            draggable: true
                        });
                    }
                }
            };
        
        if ( $map.length ) {
            $map.css('height', 400);
            
            setMap();
        }
        
        /* ------------------------------------------------------------------------- *
         * CONTACT SECTION
         * ------------------------------------------------------------------------- */
        var $contact = $('#contact'),
            $contactForm = $contact.find('.contact--form');

        if ( $contactForm.length ) {
            $contactForm.css('height', $contactForm.find('form').outerHeight() / 2);
        }

        var $contactStatus = $contact.find('.contact--form-status'),
            contactFormAjax = function (el) {
                var $el = $(el),
                    formURL = $el.attr('action'),
                    formData = $el.serialize();
                    
                $.post(formURL, formData, function (res) {
                    $contactStatus.show().html(res).delay(3000).fadeOut('show');
                });
            };
        
        if ( $contactForm.length ) {
            $contactForm.find('form').validate({
                errorPlacement: function () {
                    return true;
                },
                submitHandler: contactFormAjax
            });
        }

        /* ------------------------------------------------------------------------- *
         * FOOTER SECTION
         * ------------------------------------------------------------------------- */
        var $footerTitle = $('.footer--title'),
            $footerTitleLogo = $footerTitle.children('.logo');

        if ( $footerTitleLogo.length ) {
            $footerTitle.css( 'height', $footerTitleLogo.outerHeight() );
        }

        /* ------------------------------------------------------------------------- *
         * BACK TO TOP BUTTON
         * ------------------------------------------------------------------------- */
        var $backToTop = $('#backToTop');

        $backToTop.on('click', 'a', function (e) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: 0
            }, 800);
        });

        /* ------------------------------------------------------------------------- *
         * COLOR SWITCHER
         * ------------------------------------------------------------------------- */
        if ( typeof $.cColorSwitcher !== "undefined" ) {
            $.cColorSwitcher({
                'switcherTitle': 'Main Colors:',
                'switcherColors': [{
                    bgColor: '#82b440',
                    filepath: 'css/colors/theme-color-1.css'
                }, {
                    bgColor: '#ff5252',
                    filepath: 'css/colors/theme-color-2.css'
                }, {
                    bgColor: '#ff9600',
                    filepath: 'css/colors/theme-color-3.css'
                }, {
                    bgColor: '#e91e63',
                    filepath: 'css/colors/theme-color-4.css'
                }, {
                    bgColor: '#00BCD4',
                    filepath: 'css/colors/theme-color-5.css'
                }, {
                    bgColor: '#FC5143',
                    filepath: 'css/colors/theme-color-6.css'
                }, {
                    bgColor: '#00B249',
                    filepath: 'css/colors/theme-color-7.css'
                }, {
                    bgColor: '#D48B91',
                    filepath: 'css/colors/theme-color-8.css'
                }, {
                    bgColor: '#8CBEB2',
                    filepath: 'css/colors/theme-color-9.css'
                }, {
                    bgColor: '#119ee6',
                    filepath: 'css/colors/theme-color-10.css'
                }],
                'switcherTarget': $('#changeColorScheme')
            });
        }
    });
    
    $wn.on('load', function () {
        /* ------------------------------------------------------------------------- *
         * BODY SCROLLING
         * ------------------------------------------------------------------------- */
        var isBodyScrolling = function () {
            if ( $wn.scrollTop() > 1 ) {
                $body.addClass('isScrolling');
            } else {
                $body.removeClass('isScrolling');
            }
        };

        isBodyScrolling();
        $wn.on('scroll', isBodyScrolling);

        /* ------------------------------------------------------------------------- *
         * ADJUST ROW
         * ------------------------------------------------------------------------- */
        var $adjustRow = $('.AdjustRow');
        
        if ( $adjustRow.length ) {
            $adjustRow.isotope({layoutMode: 'fitRows'});
        }
        
        /* ------------------------------------------------------------------------- *
         * MASONRY ROW
         * ------------------------------------------------------------------------- */
        var $masonryRow = $('.MasonryRow');
        
        if ( $masonryRow.length ) {
            $masonryRow.isotope();
        }

        /* ------------------------------------------------------------------------- *
         * FEATRUES SECTION
         * ------------------------------------------------------------------------- */
        var $features = $('#features'),
            $featuresVideo = $features.find('.feature--video');

        if ( $featuresVideo.length ) {
            $featuresVideo.css( 'min-height', $featuresVideo.siblings('.feature--items').outerHeight() );
        }
        
        /* ------------------------------------------------------------------------- *
         * PORTFOLIO SECTION
         * ------------------------------------------------------------------------- */
        var $portfolio = $('#portfolio'),
            $portfolioFilterNav = $portfolio.find('.portfolio--filter-nav'),
            $portfolioFilterItems = $portfolio.find('.portfolio--items');

        if ( $portfolioFilterItems.length ) {
            $portfolioFilterItems.isotope({
                animationEngine: 'best-available',
                itemSelector: '.portfolio--item'
            });
        }

        $portfolioFilterNav.on('click', 'a', function (e) {
            e.preventDefault();

            var $t = $(this),
                f = $t.attr('href'),
                s = (f !== '*') ? '[data-cat~="'+ f +'"]' : f;

            $portfolioFilterItems.isotope({
                filter: s
            });
            
            $t.parent('li').addClass('active').siblings().removeClass('active');
        });
    });
    
})(jQuery);
