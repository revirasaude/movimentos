(function (e) {
    "use strict";
    var n = window.Thememattic_JS || {};
    var iScrollPos = 0;
    var loadType, loadButton, loader, pageNo, loading, morePost, scrollHandling;

    function retina_blog_is_on_scrn(elem) {
        // if the element doesn't exist, abort
        if (elem.length == 0) {
            return;
        }
        var tmtwindow = jQuery(window);
        var viewport_top = tmtwindow.scrollTop();
        var viewport_height = tmtwindow.height();
        var viewport_bottom = viewport_top + viewport_height;
        var tmtelem = jQuery(elem);
        var top = tmtelem.offset().top;
        var height = tmtelem.height();
        var bottom = top + height;
        return (top >= viewport_top && top < viewport_bottom) ||
            (bottom > viewport_top && bottom <= viewport_bottom) ||
            (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom);
    }

    n.stickyMenu = function () {
        if (e(window).scrollTop() > 350) {
            e("#masthead").addClass("nav-affix");
        } else {
            e("#masthead").removeClass("nav-affix");
        }
    };
    n.mobileMenu = {
        init: function () {
            this.toggleMenu();
            this.menuMobile();
            this.menuArrow();
        },
        toggleMenu: function () {
            e('#masthead').on('click', '.toggle-menu', function (event) {
                var ethis = e('.main-navigation .menu .menu-mobile');
                if (ethis.css('display') == 'block') {
                    ethis.slideUp('300');
                } else {
                    ethis.slideDown('300');
                }
                e('.ham').toggleClass('exit');
            });
            e('#masthead .main-navigation ').on('click', '.menu-mobile a i', function (event) {
                event.preventDefault();
                var ethis = e(this),
                    eparent = ethis.closest('li'),
                    esub_menu = eparent.find('> .sub-menu');
                if (esub_menu.css('display') == 'none') {
                    esub_menu.slideDown('300');
                    ethis.addClass('active');
                } else {
                    esub_menu.slideUp('300');
                    ethis.removeClass('active');
                }
                return false;
            });
        },
        menuMobile: function () {
            if (e('.main-navigation .menu > ul').length) {
                var ethis = e('.main-navigation .menu > ul'),
                    eparent = ethis.closest('.main-navigation'),
                    pointbreak = eparent.data('epointbreak'),
                    window_width = window.innerWidth;
                if (typeof pointbreak == 'undefined') {
                    pointbreak = 991;
                }
                if (pointbreak >= window_width) {
                    ethis.addClass('menu-mobile').removeClass('menu-desktop');
                    e('.main-navigation .toggle-menu').css('display', 'block');
                } else {
                    ethis.addClass('menu-desktop').removeClass('menu-mobile').css('display', '');
                    e('.main-navigation .toggle-menu').css('display', '');
                }
            }
        },
        menuArrow: function () {
            if (e('#masthead .main-navigation div.menu > ul').length) {
                e('#masthead .main-navigation div.menu > ul .sub-menu').parent('li').find('> a').append('<i class="icon-arrow-down icons">');
            }
        }
    };
    n.RetinaSearch = function () {
        e('.icon-search').on('click', function (event) {
            e('body').toggleClass('reveal-search');
        });
        e('.close-popup').on('click', function (event) {
            e('body').removeClass('reveal-search');
        });
    };
    n.DataBackground = function () {
        var pageSection = e(".data-bg");
        pageSection.each(function (indx) {
            if (e(this).attr("data-background")) {
                e(this).css("background-image", "url(" + e(this).data("background") + ")");
            }
        });
        e('.bg-image').each(function () {
            var src = e(this).children('img').attr('src');
            e(this).css('background-image', 'url(' + src + ')').children('img').hide();
        });
    };
    n.SlickCarousel = function () {
        e(".main-slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            autoplay: true,
            autoplaySpeed: 8000,
            infinite: true,
            dots: true,
            nextArrow: '<i class="slide-icon slide-next icon-arrow-right icons"></i>',
            prevArrow: '<i class="slide-icon slide-prev icon-arrow-left icons"></i>',
        });
        e(".gallery-columns-1, ul.wp-block-gallery.columns-1, .wp-block-gallery.columns-1 .blocks-gallery-grid").each(function () {
            e(this).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                autoplay: true,
                autoplaySpeed: 8000,
                infinite: true,
                dots: false,
                nextArrow: '<i class="slide-icon slide-next icon-arrow-right icons"></i>',
                prevArrow: '<i class="slide-icon slide-prev icon-arrow-left icons"></i>',
            });
        });
    };
    n.Thememattic_preloader = function () {
        e(window).load(function () {
            e("body").addClass("page-loaded");
        });
    };
    n.MagnificPopup = function () {
        e('.widget .gallery, .entry-content .gallery, .wp-block-gallery').each(function () {
            e(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                },
                zoom: {
                    enabled: true,
                    duration: 300,
                    opener: function (element) {
                        return element.find('img');
                    }
                }
            });
        });
    };
    n.show_hide_scroll_top = function () {
        if (e(window).scrollTop() > e(window).height() / 2) {
            e("#scroll-up").fadeIn(300);
        } else {
            e("#scroll-up").fadeOut(300);
        }
    };
    n.scroll_up = function () {
        e("#scroll-up").on("click", function () {
            e("html, body").animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    };
    n.thememattic_matchheight = function () {
        e('.widget-area').theiaStickySidebar({
            additionalMarginTop: 30
        });
    };
    n.nav_tab = function () {
        e('.tab-trigger').on('click', function () {
            e([e(this).parent()[0], e(e(this).data('href'))[0]]).addClass('active').siblings('.active').removeClass('active');
        });
    };
    n.setLoadPostDefaults = function () {
        if (e('.load-more-posts').length > 0) {
            loadButton = e('.load-more-posts');
            loader = e('.load-more-posts .ajax-loader');
            loadType = loadButton.attr('data-load-type');
            pageNo = 2;
            loading = false;
            morePost = true;
            scrollHandling = {
                allow: true,
                reallow: function () {
                    scrollHandling.allow = true;
                },
                delay: 400
            };
        }
    };
    n.fetchPostsOnScroll = function () {
        if ( !e('.load-more-posts').hasClass('tmt-no-post') && !e('.load-more-posts').hasClass('tmt-post-loding') && e('.load-more-posts').hasClass('scroll') && retina_blog_is_on_scrn('.load-more-posts')) {

            e('.load-more-posts').addClass('tmt-post-loding');
            n.ShowPostsAjax();

        }
    };
    n.fetchPostsOnClick = function () {
        if (e('.load-more-posts').length > 0 && 'click' === loadType) {
            e('.load-more-posts a').on('click', function (event) {
                event.preventDefault();
                n.ShowPostsAjax(loadType);
            });
        }
    };
    n.ShowPostsAjax = function (loadType) {
        e.ajax({
            type: 'GET',
            url: retinaVal.ajaxurl,
            data: {
                action: 'retina_blog_load_more',
                nonce: retinaVal.nonce,
                page: pageNo,
                post_type: retinaVal.post_type,
                search: retinaVal.search,
                cat: retinaVal.cat,
                taxonomy: retinaVal.taxonomy,
                author: retinaVal.author,
                year: retinaVal.year,
                month: retinaVal.month,
                day: retinaVal.day
            },
            dataType: 'json',
            beforeSend: function () {
                loader.addClass('ajax-loader-enabled');
            },
            success: function (response) {
                e('.load-more-posts').removeClass('tmt-post-loding');
                loader.removeClass('ajax-loader-enabled');
                if (response.success) {
                    e('.retina-posts-lists').append(response.data.content);
                    pageNo++;
                    loading = false;
                    if (!response.data.more_post) {
                        morePost = false;
                        loadButton.fadeOut();
                    }
                } else {
                    e('.load-more-posts').addClass('tmt-no-post');
                    loadButton.fadeOut();
                }
            }
        });
    };
    e(document).ready(function () {
        n.mobileMenu.init();
        n.RetinaSearch();
        n.DataBackground();
        n.SlickCarousel();
        n.Thememattic_preloader();
        n.MagnificPopup();
        n.scroll_up();
        n.thememattic_matchheight();
        n.nav_tab();
        n.setLoadPostDefaults();
        n.fetchPostsOnClick();
    });
    e(window).scroll(function () {
        n.stickyMenu();
        n.show_hide_scroll_top();
        n.fetchPostsOnScroll();
    });
    e(window).resize(function () {
        n.mobileMenu.menuMobile();
    });
})(jQuery);
