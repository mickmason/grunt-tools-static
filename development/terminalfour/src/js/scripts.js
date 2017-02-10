(function t4mainfunction($global) { 
    'use strict' ;

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
    
    /*! 
     * BS Accordion http://getbootstrap.com/javascript/#collapse-example-accordion
     */ 
    if ($('.panel-group.dfa-accordion')) {
            $('.panel-collapse').on('show.bs.collapse', function() {
                $(this).siblings('.panel-heading').addClass('active');
            }).on('hide.bs.collapse', function() {
                console.log('Show '+$(this));
                $(this).siblings('.panel-heading').removeClass('active');
            });
            $('.panel-collapse').eq(0).collapse('show'); 
    }

    
    /*! 
     * jQuery Match Height https://github.com/liabru/jquery-match-height
     */
    var matchHeightArray = ['.dfa-widget', '.people-feature-person', '.people-feature-overlay'];
    $('.dfa-widget').matchHeight(); 
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
        console.log($other);
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
            console.log(x);
            if (x < 50) {
                console.log('less than 50');
                align = 'left';    
            } else if (x > 50) {
                console.log('greater than 50');
                align = 'right';
            } else {
                console.log('default');
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
    $('.feature-bottom-opener').on('click', function(e) {
        e.stopPropagation();
        var $this = $(this);
        var $featureMore = $this.find('.feature-more');
        var $featureLess = $this.find('.feature-less');
        var $featureBody = $('.featured-content-section-body .featured-content-block');
        var showHideDuration = 140;
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
/*    $('#secondary-nav-dropdown').find('ul').eq(0).addClass('secondary-nav__sub').find('li').each(function($this) {
        $this.addClass('secondary-nav__sub-link')  ;
    });*/
    
})(window); 