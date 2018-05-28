function translateSkills(posY) {
    var $works = $('.skills-box').find('div.skill');
    $works.each(function() {
        var posJob = $(this).offset().top;
        if(posY >= (posJob - 500)){
            $(this).addClass('scal');
        }
        else if(posY < (posJob) && $(this).hasClass('scal')) {
            $(this).removeClass('scal');
        }
    });
}

function translateWorks(posY) {
    var $works = $('.works-box').find('div.job');
    $works.each(function() {
        var posJob = $(this).offset().top;
        if(posY >= (posJob - 400)){
            $(this).addClass('flip');
        }
        else if(posY < (posJob) && $(this).hasClass('flip')) {
            $(this).removeClass('flip');
        }
    });
}

function svgAnimate(posY) {
    var input = $('.contact').offset().top;
    if(posY >= input){
        $('.thank-you').show();
    }
}

function menu(elem){
    var resolution = window.matchMedia('(max-width: 578px)');
    var name = elem.children('a').attr('href');
    var offsetElem = $('#'+name.substring(1)).offset().top;
    $('body, html').animate({
        scrollTop: offsetElem
    }, 'slow');
    if(resolution.matches){
        $('.menu').fadeToggle();
        $(this).toggleClass('x');
    }
}

$(document).ready(function() {

    $('.nav-toggle').on('click', function() {
        $('.menu').fadeToggle();
        $(this).toggleClass('x');
    });

    $('.menu li').on('click', function(){
        menu($(this));
    });
    
    $('.see-work').on('click', function() {
        var offset = $('.portfolio').offset().top;
        $('body, html').animate({
            scrollTop: offset
        }, 'slow');
    });

    $(window).on('scroll', function() {
        var posY = window.pageYOffset;
        translateWorks(posY);
        translateSkills(posY);
        svgAnimate(posY);
    });
});