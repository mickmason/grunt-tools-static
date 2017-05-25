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
    * Load SVG via AJAX
    */
    var $ajax = new XMLHttpRequest();
    $ajax.open('GET', 'style-assets/media/svg/dfa-icons.svg', true);
    /*$ajax.open("GET", "index.html", true);*/
    $ajax.onreadystatechange = loadSVGs;
    $ajax.send();
    
    function loadSVGs() {
      if ($ajax.readyState === 4) {
          if ($ajax.status === 200) {
            var responseContentType = $ajax.getResponseHeader("Content-Type"); 
            /*console.log('Response Content type is: '+responseContentType);*/
            if (responseContentType.indexOf('image/svg+xml') !== -1) {
                /*console.log('It is SVG: '+responseContentType);*/
                var div = document.createElement("div");
                div.setAttribute('class', 'dfa-icons-stack');
                div.innerHTML = $ajax.responseText;
                document.body.insertBefore(div, document.body.childNodes[0]);    
            } else {
                $('body').addClass('no-svg');
                
            }
           
          } else {
            console.log('Status is: '+$ajax.status);
          }
      }
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
    /* Twitter scroller  */
    $('.scroller-feed__slider').slick({
        accessibility: true,
        mobileFirst: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: false,
        pauseOnHover:true,
        pauseOnDotsHover: true,
        slide: '.scroller-feed__item',
        prevArrow: '.scroller-feed .discovery-slider__controls_prev',
        nextArrow: '.scroller-feed .discovery-slider__controls_next',
        adaptiveHeight: true
    });
    $('.discovery-slider__controls__pause').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('discovery-slider__controls__paused')) {
            $('.scroller-feed__slider').slick('slickPlay');
            $(this).removeClass('discovery-slider__controls__paused');
        } else {
            $('.scroller-feed__slider').slick('slickPause');
            $('.discovery-slider__controls__pause').addClass('discovery-slider__controls__paused');    
        }
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
     * jQuery Match Height https://github.com/liabru/jquery-match-height
     */
    var matchHeightArray = 
        [
            '.landing-feature-image__card__text, .landing-feature-image__card__link-icon',
            '.dfa-card--plain--icon .dfa-card__card-text, .dfa-card--plain--icon .dfa-card__icon',
            '.dfa-card--horizontal .dfa-card__wrap, .dfa-card--horizontal .dfa-card__media',
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
     */
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
        
        $("html").addClass('no-columns'); 
    } 
    /* 
     * Flexbox text
     */
    testEl = $('<div />');
    if (testEl.css('flex') === "" || testEl.css('msFlex') === "") {
    } else if (testEl.css('flex') !== "" || testEl.css('msFlex') !== "") {
        $("html").addClass('no-flex');
    }
    
    /**! 
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
    $('.secondary-nav-dropdown > a').not('.mob-secondary-nav-dropdown__anchor').on('click', function(e) {
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
    /* Main nav dropdowns in mobile - in desktop this is done with CSS :hover on main nav <li>s */
    $('.main-nav-list__dropdown').each(function() {
        var allMainNavLinks =  $('.main-nav-list > li');
        
        var $thisli = $(this);
        var $thisDropdown = $thisli.find('.main-nav__drop-down');
        var durationDown = 300;
        var durationUp = 300;
        var timeOutDuration = 80;
        /* Mobile resolutions */
        if (window.outerWidth < 992) {
            $thisli.click(function(e) {
                e.preventDefault();
                var $activeLi = $('.main-nav-list > .main-nav--hover') || undefined ;
                
                if ($thisli.hasClass('main-nav--hover')) {
                    $thisDropdown.stop().slideUp(durationUp, function() {
                        $thisli.removeClass('main-nav--hover');
                    });
                } else if ($activeLi.length) {
                    console.log('There is an active link');    
                    $activeLi.find('.main-nav__drop-down').stop().slideUp(durationUp, function() {
                        $activeLi.removeClass('main-nav--hover');
                        $thisDropdown.stop().slideDown(durationUp, function() {
                            $thisli.addClass('main-nav--hover');
                        })
                    });
                } else {
                    $thisDropdown.stop().slideDown(durationDown, function(){
                        $thisli.addClass('main-nav--hover');
                    });
                }
            });    
        } 
    });
    /* 
     * Click handler for sidebar nav links with nested links 
     * Inner Landing and General Content pages
     */
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
    if (false) {
        if (window.outerWidth > 768) {
            var $heroText = $('.hero-text');
            var x = ($heroText.attr('data-posx')) ? $heroText.attr('data-posx') : 'center';
            var y = ($heroText.attr('data-posy')) ? $heroText.attr('data-posy') : 'middle';
            var align = '';
            console.log('Hero text x is '+x);
            console.log('Hero text y is '+y);
            if (x === 'center') {
                align = 'center';    
                x = 50;
            } else if (x === 'left') {
                x = 50;
                align = 'left';
            } else if ( x === 'right') {
                align = 'right';   
                x = 0;
            }
            if (y === 'middle') {
                y = 50;
            } else if (y === 'top') {
                y = 30;
             } else if (y === 'bottom') {
                 y = 70;
             } else if (y === 'middle') {
                 y = 50;
             }

            $heroText.css({left: x+'%', top: y+'%', textAlign: align});
            $($global).on('resize', function() {
                $heroText.css({left: x+'%', top: y+'%', textAlign: align});
            });
        } 
    }
    /* Allow user to set the font size of the hero text heading */
    function heroTextSetter() {
        console.log('Hero text setter');
        if ($('.hero-text')) {
            var $heroText = $('.hero-text');
            if (window.outerWidth > 768) {
                 var fontSize = parseInt($heroText.data('font-size'));
                 if (fontSize !== 'NaN') {
                     $heroText.find('.hero-heading').css('fontSize', (fontSize / parseInt($('body').css('fontSize'))) + 'rem ');
                 }
            } else {
                $heroText.find('.hero-heading').css('fontSize', '');
            }
        }    
    }//heroTextSetter()
    heroTextSetter();
    $($global).on('resize', heroTextSetter);
    
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
                     $featureBody.stop().slideDown({duration: showHideDuration, complete: function() {
                         console.log('slide down callback');
                         $(this).css({height: 'auto'});
                     }});
                });
            }); 
        }
    });
    
    /**! 
     * Accordion/tabs content 
     */
    /* Tabs */
    $('.accordion-tabs__tab-content').eq(0).fadeIn(function() {
        $(this).addClass('active');
    });
    $('.accordion-tabs__tabs__item').on('click', function(event) {
        if ($(this).hasClass('active')) {
            return true;
        }
        var $this = $(this);
        $('.accordion-tabs__tabs__item.active').removeClass('active');
        $this.addClass('active');
        
        var duration = 220;
        $('.accordion-tabs__tab-content.active').fadeOut(duration, function() {
            $(this).removeClass('active');
            $('#'+$this.attr('rel')).fadeIn(duration, function() {                
                $(this).addClass('active');
            });
        });
    });
    /* Accordion */
    $('.accordion-tabs__panel-heading').on('click', function(event) {
        var duration = 400;
        var $this = $(this);
        
        if ($this.hasClass('active')) {
            $('.accordion-tabs__tab-content.active').slideUp(duration, function() {
                $(this).removeClass('active');
                $this.removeClass('active');
            });
            return true;
        } else {
            $('.accordion-tabs__tab-content.active').slideUp(duration, function() {
                $(this).removeClass('active');
                $('.accordion-tabs__panel-heading').removeClass('active');
            });
            
            $('#'+$this.attr('rel')).slideDown(duration, function() {
                $(this).addClass('active');
                $this.addClass('active');
            });        
        }
    });
    /**!
     * A-Z Filters
     */
    /* Each entry is wrapped in a div */
    var $allLists = $('.a-z-filters__listing__letter');
    var region;
    /* For the A-Z links - add hrefs for each letter */
    var hrefPrefix= '#a-z-letter__';
    var $thisA ;
    
    $('.a-z-listing__alphabet').find('li').each(function(idx, thisLi) {
        var $thisLi = $(thisLi);
        console.log(idx + ' ' +$thisLi.text() );
        $thisLi.addClass('a-z-listing__alphabet_letter');
        $thisLi.children('a').attr({'href': hrefPrefix + $thisLi.children('a').text()});
    })
    $('.a-z-listing__alphabet').find('ul').eq(0).addClass('a-z-listing__alphabet_letters');
    /* 
     * Checks if all of the li entries in a div are hidden 
     * $list is the UL containing a list of entries
     */
    function checkIfAllHidden($listDiv) {
        var $listItems = $listDiv.find('.a-z-filters__listing__letter-list__item');
        var countHidden = 0;
        $listItems.each(function(idx, $thisLi) {
            if ($($thisLi).hasClass('a-z__item--hidden__region') || $($thisLi).hasClass('a-z__item--hidden__text')) {
                countHidden++ ;
            }
        });
        if (countHidden === $listItems.length) {
            $listDiv.hide();
        } else {
            $listDiv.show()
        }  
        
    }// end checkIfAllHidden()
    function clearAllFilters() {
        $allLists.each(function() {
            $allLists.find('li').each(function() {
                var $thisLi = $(this);
                $thisLi.removeClass('a-z__item--hidden__text');
                $thisLi.removeClass('a-z__item--hidden__region');
            });
            $(this).show();
        });    
        $('#a-z__text-filter').val('');
        $('#travel-a-z__region-filter').val('all');
    }
    function clearAllTextFilters() {
        $allLists.each(function() {
            $allLists.find('li').each(function() {
                var $thisLi = $(this);
                $thisLi.removeClass('a-z__item--hidden__text');
                checkIfAllHidden($thisLi.parents('.a-z-filters__listing__letter'));
            });
            
        });    
    }
    /* Clear all filters - show all lis and divs which are hidden */
    $('.a-z-listing__filters__clear-all, .a-z-listing__filters__clear-all a').on('click', function(event) {
        event.preventDefault();
        clearAllFilters();
    });
    
    /* Text filter - fires on keyup */
    $('#a-z__text-filter').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        if (value === '') {
            clearAllTextFilters();
            return true;
        }
    
        /* Go through each li - do a substring search for the input text */
        $allLists.find('li').each(function() {
            var $thisLi = $(this);
            var thisText = $(this).text().toLowerCase();
            /* Show any which have been previously hidden by text filter */
            $thisLi.removeClass('a-z__item--hidden__text');
            if (thisText.indexOf(value) === -1) {
                /* If match - don't do anything if it has been previously hidden by region filter */
                if (!$($thisLi).hasClass('a-z__item--hidden__region')) {
                    $thisLi.addClass('a-z__item--hidden__text');
                }
                checkIfAllHidden($thisLi.parents('.a-z-filters__listing__letter'));
            }
            
        });
    });
    /* Region filter */
    $('#travel-a-z__region-filter').on('change', function(event) {
        event.preventDefault();
        /* Clear the text filter input */
        $('#a-z__text-filter').val('');
        var $thisSelect = $(this);
        region = $thisSelect.val();
        
        if (region === 'all') {
            /* Show all previously hidden by the region filter */
            $allLists.each(function() {
                $(this).find('li').each(function() {
                    var $thisLi = $(this);
                    if ($thisLi.hasClass('a-z__item--hidden__region')) {
                        $thisLi.removeClass('a-z__item--hidden__region');
                    }
                });
                $(this).show();
            });
            return true;
        }
        /* Iterate over each letter div */
        $allLists.each(function() {
            var hiddenCount = 0;
            var childLisLen = $(this).find('li').length;
            
            $(this).find('li').each(function() {
                var $thisLi = $(this);
                $thisLi.removeClass('a-z__item--hidden__text');
                if ($thisLi.attr('data-region') !== region) {
                    if (!$thisLi.hasClass('a-z__item--hidden__region')) {
                        $thisLi.addClass('a-z__item--hidden__region');
                    }
                    hiddenCount++;
                } else if ($thisLi.hasClass('a-z__item--hidden__region')) {
                    $thisLi.removeClass('a-z__item--hidden__region');
                }
            });
            checkIfAllHidden($(this));
            //(hiddenCount == childLisLen) ? $(this).hide() : $(this).show() ;
        });
    });
    /**! Misc scripts for CMS build **/
    $('.secondary-nav-dropdown').find('ul').eq(0).addClass('secondary-nav__sub');
    $('.secondary-nav-dropdown').find('li').each(function() {
        $(this).addClass('secondary-nav-link__sub-link');
    });
    
    /**! 
     *  Migrated and adapted scripts for country information
     *  Gets all of the .updated-dates on the page, gets the latest one and uses that as the last updated time for the information. 
     */
    //Two date utils - get the Month based of a 0 index number; Get the full name of the month based off the same
    function getMonthNumber(val) {
        var month = [];
        month["Jan"] = 0;
        month["Feb"] = 1;
        month["Mar"] = 2;
        month["Apr"] = 3;
        month["May"] = 4;
        month["Jun"] = 5;
        month["Jul"] = 6;
        month["Aug"] = 7;
        month["Sep"] = 8;
        month["Oct"] = 9;
        month["Nov"] = 10;
        month["Dec"] = 11;
        return month[val];
    }
    function getMonthName(val) {
        var month = [];
        month[0]="January";
        month[1]="February";
        month[2]="March";
        month[3]="April";
        month[4]="May";
        month[5]="June";
        month[6]="July";
        month[7]="August";
        month[8]="September";
        month[9]="October";
        month[10]="November";
        month[11]="December";
        return month[val];
    }

    if($('.country-travel-info__status').length != 0 && jQuery('body#en-lang').length != 0 && jQuery('.updated-date').length != 0) {
		var updated = [];
		$.each($('.updated-date'), function() {
			var date = $(this).text();
			date = date.split(" ");
			var month = getMonthNumber(date[2]);
			var day = date[1];
			var year = date[3];
			
			date = new Date(year, month, day, 12, 12).getTime();
			updated.push(date);
		});
		
		$.unique(updated);
		updated = Math.max.apply(Math, updated);
		
		updated = new Date(updated);
		var updated_date = updated.getDate();
		var updated_month = getMonthName(updated.getMonth());
		var updated_year = updated.getFullYear();
		
		var updated_full_date = updated_date + " " + updated_month + " " + updated_year;
		
		var today = new Date();
		var today_date = today.getDate() ;
		var today_month = getMonthName(today.getMonth());
		var today_year = today.getFullYear();
		
		var todays_full_date = today_date + " " + today_month + " " + today_year;
		
		var newDiv = "<p class='country-travel-info__datestamp' id='updated-data-travel-advice'>"
		newDiv += "<span id='still_current_title'>Still current at: </span>"
		newDiv += "<span id='still_current_value'>" + todays_full_date + "</span><br />"
		newDiv += "<span id='updated_title'>Updated: </span>"
		newDiv +=  "<span id='updated_value'>" + updated_full_date + "</span></p>";
		
          $(newDiv).insertAfter(".country-travel-info__summary");
		
	}
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
    
    
    /**
     * Handles show/hide cookies policy
     * Uses this version of https://github.com/carhartl/jquery-cookie
     **/
    if($.cookie("acceptcookies2")) {
        $('#cookieNotice').hide();

    } else{$('#cookieNotice').show();}
    //cookie notice
    $('#cookieNotice .cookies-button .btn').click(function(e) {
        e.preventDefault();
        $('#cookieNotice').slideUp(360, function() {
                $.cookie("acceptcookies2", "true", { expires: 365, path: '/' });
                //$.cookie("acceptcookies", "true", { expires: 365, path: '/' });
        });
    }); //end click   
})(window); 