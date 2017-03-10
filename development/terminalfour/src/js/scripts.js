(function t4mainfunction($global) { 
    'use strict' ;
    /*
     * Detect SVG support
     *
     */
    function supportsSvg() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
    }
    /* 
     * Lightbox modal https://github.com/ashleydw/lightbox
     * Extends Bootstrap Modal module
     * Config
     */
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox({
            onContentLoaded: function() {
                $('.modal-backdrop').addClass('ekko-lightbox');
            },
            alwaysShowClose: true 
        });
        $(this).addClass('gallery-active'); 
    });
    /* 
     * Slick slider initialization http://kenwheeler.github.io/slick/
     * The best slider pugin in the world
     */
    $('.slick-gallery').slick({ 
        mobileFirst: true,
        prevArrow: '.arrow-left-icon.dfa-icon',
        nextArrow: '.arrow-right-icon.dfa-icon',
        responsive: [ 
        {
            breakpoint: 1440,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }   
        },
        {
            breakpoint: 995,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }   
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }]
    });
    /* Discovery slider */
    $('.discovery-slider__slider').slick({
        mobileFirst: true,
         prevArrow: '.discovery-slider__controls .discovery-slider__controls_prev',
        nextArrow: '.discovery-slider__controls .discovery-slider__controls_next',
        adaptiveHeight: true
    });
    
    /*! 
     * BS Accordion http://getbootstrap.com/javascript/#collapse-example-accordion
     */ 
    if ($('.panel-group.dfa-accordion')) {
            $('.panel-collapse').on('show.bs.collapse', function() {
                
                $(this).siblings('.panel-heading').addClass('active');
            }).on('hide.bs.collapse', function() {
                $(this).siblings('.panel-heading').removeClass('active');
            });
//            $('.panel-collapse').eq(0).collapse('show'); 
    }
    /*!
     *  Desaturate/saturate images
     */
    var testEl = $('<div />');
    if (testEl.css('filter') !== "" || testEl.css('WebkitFilter') !== "") {        
         $("html").addClass('no-filter'); 
    } 
    /* Test for CSS columns */
    testEl = $('<div />');
    if (testEl.css('column-width') !== "" && testEl.css('WebkitColumnWidth') !== "" && testEl.css('MozColumnWidth') !== "") {        
        console.log("No cols "+testEl.css('column-width')); 
        $("html").addClass('no-columns'); 
    } 
    /* 
     * Flexbox text
     */
    testEl = $('<div />');
    if (testEl.css('flex') === "" || testEl.css('msFlex') === "") {
      console.log('Flex');
    } else if (testEl.css('flex') !== "" || testEl.css('msFlex') !== "") {
        console.log('Flex');
        $("html").addClass('no-flex');
    }
    
    /*! 
     * jQuery Match Height https://github.com/liabru/jquery-match-height
     */
    var matchHeightArray = 
        [
            '.landing-feature-section .dfa-card__wrap',
            '.features-row--four-col .dfa-card--widget__background', 
            '.features-row--two-col .dfa-card--widget__background', 
            '.people-feature-person', 
            '.people-feature-overlay',
            '.gallery-item .dfa-card__wrap'
        ];
    // $('.dfa-widget').matchHeight(); 
    matchHeightArray.forEach(function($this, idx, arr) { 
        $($this).matchHeight();    
    });
    
  
    /**! 
     * Michael t4 
     * Handle mobile nav and search 
     */
    $('.header-navigation__mobile-search, .header-navigation__mobile-menu, .desktop-search').on('click', function(e) {
        e.preventDefault();    
        var $self = $(this); 
        var $other = $('.header-navigation__mobile-search, .header-navigation__mobile-menu').not($self);
        var $target = $('#'+$self.attr('data-target')); 
        if ($self.hasClass('desktop-search')) {
            if ($self.hasClass('active')) {
                $target.stop().slideUp({duration: 300, easing: 'swing', complete: function(){
                        $self.removeClass('active') ;
                }});
            } else {
                 $target.stop().slideDown({duration: 300, complete: function() {
                    $self.addClass('active'); 
                }});
            }
        }
        if ($self.hasClass('active')) {
            $target.stop().slideUp({duration: 300, complete: function(){  
                    $self.removeClass('active') ;
            }});
            
        } else if ($other.hasClass('active')) {
            var $otherTarget = $('#'+$other.attr('data-target')) ;
            $otherTarget.stop().slideUp({ duration: 300, easing: 'swing', complete: function() {   
                $other.removeClass('active');
                $target.stop().slideDown({duration: 300, easing: 'swing', complete: function() {
                    $self.addClass('active');
                }});
            }});
        } else {
            $target.stop().slideDown({duration: 300, easing: 'swing', complete: function() {
                $self.addClass('active'); 
            }});               
        }
    });
    /* Show-hide quicklinks */
    $('.secondary-nav-dropdown > a').on('click', function(e) {
        e.preventDefault();
        var $this = $(this).parent('li');
        var $target = $this.find('.secondary-nav__sub'); 
        if ($this.hasClass('active')) {
            var timeout = 0;
            var durationDown = 100;
            var durationUp = 100;
            setTimeout(function() {
                $target.stop().slideUp({duration: durationUp, complete: function() {
                    $this.removeClass('active');
                }});
            }, timeout);  
        } else {
             setTimeout(function() {
                $target.stop().slideDown({duration: durationDown, complete: function() { 
                }}); 
                $this.addClass('active') ; 

            }, timeout);       
        }
    });
    /* Site-wide search handlers */
    $('#search-submit-button').on('click', function(e){
        e.preventDefault();
        $('#dfa-site-search-input').submit();
    })
    $('#dfa-site-search-input').on('focus', function(e){
        var text = $(this).attr('placeholder');
        $(this).attr('placeholder', '');
        $(this).on('blur', function(e) {
            $(this).attr('placeholder', text);
        });
    });
    
    /* Postition hero text in tablet and bigger devices  */
    if ($('.hero-text')) {
        if (window.outerWidth > 768) {
            var $heroText = $('.hero-text');
            var x = ($heroText.attr('data-posx')) ? parseInt($heroText.attr('data-posx')) : 50 ;
            var y = ($heroText.attr('data-posy')) ? parseInt($heroText.attr('data-posy')) : 30;
            var align = '';
            if (x < 50) {
                align = 'left';    
                if ($(window).outerWidth(true) > 1620) {
                    x = 40;
                }
            } else if (x > 50) {
                if ($(window).outerWidth(true) > 1620) {
                    x = 60;
                }
                align = 'right';
            } else {
                align = 'center';   
            }
            if (y > 50) {
                $heroText.parent('.hero-image-wrapper').find('.hero-scroll').css({display: 'none'});    
            }
            $heroText.css({left: x+'%', top: y+'%', textAlign: align});
            $($global).on('resize', function() {
                $heroText.css({left: x+'%', top: y+'%', textAlign: align});
            });
        } 
    }
    
    /**!
     * Feature content block show/hide
     */
    var showHideDuration = 140;
    $('.feature-bottom-opener').on('click', function(e) {
        e.stopPropagation();
        var $this = $(this);
        var $featureMore = $this.find('.feature-more');
        var $featureLess = $this.find('.feature-less');
        var $featureBody = $('.featured-content-section-body .featured-content-block');
        
        var bodyDuration = 400;
        if ($this.hasClass('active')) {
            /* Hide feature bottom */
            $featureLess.stop().fadeOut(showHideDuration, function() {
                $featureMore.fadeIn(showHideDuration, function() {
                     $this.removeClass('active');  
                     $featureBody.stop().slideUp({duration: bodyDuration});
                });    
            });
            
        } else {
             $featureMore.stop().fadeOut(showHideDuration, function() {
                $featureLess.fadeIn(showHideDuration, function() {
                    $this.addClass('active');     
                     $featureBody.stop().slideDown({duration: showHideDuration});
                });
            }); 
        }
    });
    

    /**! Misc scripts for CMS build **/
    $('.secondary-nav-dropdown').find('ul').eq(0).addClass('secondary-nav__sub');
    $('.secondary-nav-dropdown').find('li').each(function() {
        $(this).addClass('secondary-nav-link__sub-link')  ;
    });

    /**!
     * General content inner navigation
     */
    /* Show/hide inner nav in smaller resolutions max-width 991px */
    function addShowInnerNavHandler() {
       if ($(window).outerWidth(true) <= 991) {
            $('.heading--side-bar').on('click', function showHideInnerNav(e) {  
                e.preventDefault(); 
                e.stopPropagation(); 
                var $thisHeading = $(this);
                if (!$thisHeading.hasClass('active')) {
                    $thisHeading.siblings('.inner-navigation').fadeIn(200, function() {
                        $thisHeading.addClass('active');
                    });    
                } else {
                    $thisHeading.siblings('.inner-navigation').fadeOut(200, function() {
                        $thisHeading.removeClass('active');
                    });    
                }
                
            });        
       } else {
          $('.heading--side-bar').off('click');
       }
    }
    addShowInnerNavHandler();
    $(window).on('resize', addShowInnerNavHandler);
    
    /* Click handler for sidebar nav links with nested links */
    $(document).on('click', '.inner-navigation__show-more', function(e) { 
        e.preventDefault();
        e.stopPropagation();
        var $this = $(this);
        if ($this.parent('li').hasClass('active')) {
            $this.siblings('ul').stop().slideUp(200, function() {
                $this.parent('li').removeClass('active');        
            });    
        } else {
            $this.siblings('ul').eq(0).stop().slideDown({duration: 200, complete: function() {
                $this.parent('li').stop().addClass('active');        
            }});               
        }  
    });

    
})(window); 