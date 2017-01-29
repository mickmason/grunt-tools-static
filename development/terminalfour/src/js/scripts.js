(function t4mainfunction($global) { 
    'use strict' ;
    
    /* Lightbox modal - Ekko-lightbox */
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        console.log('click '+event.target);
        $(this).ekkoLightbox({}); 
    }); 
    
    
    /* Handle mobile nav and search */
    $('.header-navigation__mobile-search, .header-navigation__mobile-menu, .desktop-search').on('click', function(e) {
        
        e.preventDefault();    
        var $self = $(this); 
        
        var $other = $('.header-navigation__mobile-search, .header-navigation__mobile-menu').not($self);
        console.log($other);
        var $target = $('#'+$self.attr('data-target')); 
        if ($self.hasClass('desktop-search')) {
            
             
            if ($self.hasClass('active')) {
                $target.slideUp({duration: 300, easing: 'swing', complete: function(){
                        $self.removeClass('active') ;

                }});
            
            } else {
                 $target.slideDown({duration: 300, easing: 'swing', complete: function() {
                    $self.addClass('active');
                }});
            }
        }
        if ($self.hasClass('active')) {
            $target.slideUp({duration: 300, easing: 'swing', complete: function(){
                    $self.removeClass('active') ;
                
            }});
            
        } else if ($other.hasClass('active')) {
             
            var $otherTarget = $('#'+$other.attr('data-target')) ;
            console.log($otherTarget);
            $otherTarget.slideUp({ duration: 300, easing: 'swing', complete: function() {   
                $other.removeClass('active');
                $target.slideDown({duration: 300, easing: 'swing', complete: function() {
                    $self.addClass('active');
                }});
            }});
        } else {
            $target.slideDown({duration: 300, easing: 'swing', complete: function() {
                $self.addClass('active'); 
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
    if ($('.hero-text')) {
        console.log('there is a hero text element');
        if (window.outerWidth > 768) {
            var $heroText = $('.hero-text');
            var x = ($heroText.attr('data-posx')) ? $heroText.attr('data-posx') : 50 ;
            var y = ($heroText.attr('data-posy')) ? $heroText.attr('data-posy') : 50;
            var align = ($heroText.attr('data-align')) ? $heroText.attr('data-align') : "centre";

            $heroText.css({left: x+'%', top: y+'%', textAlign: align});
            $($global).on('resize', function() {
                $heroText.css({left: x+'%', top: y+'%', textAlign: align});
            });
        } 

    }
    

})(window); 