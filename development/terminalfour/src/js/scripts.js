
(function t4mainfunction($global) { 
    'use strict' ;
    /* Handle mobile nav and search */
    $('.header-navigation__mobile-search, .header-navigation__mobile-menu, .desktop-search').on('click', function(e) {
        console.log('click');
        
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
})(window); 