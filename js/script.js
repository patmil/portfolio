//Global Variables
var resolution320 = window.matchMedia('(max-width: 320px)'),
    resolution576 = window.matchMedia('(max-width: 575.98px)'),
    resolution768 = window.matchMedia('(max-width: 767.98px)'),
    resolution992 = window.matchMedia('(max-width: 991.98px)'),
    resolution1200 = window.matchMedia('(max-width: 1199.98px)'),
    orientation = window.matchMedia('(orientation: landscape)'),
    sliderPortfolio, skillsBox, foemValid;

if (resolution576.matches) {
    var offsetFront = $('#frontEnd').offset().top,
        offsetBack = $('#backEnd').offset().top,
        offsetGraphic = $('#graphic').offset().top,
        offsetTools = $('#tools').offset().top;
}

//Functions

//Add height for contener portfolio
function setHeightWorks() {
    var $portfolioWorks = $('.container-jobs').find('article');
    var arrayHeight = [];
    $portfolioWorks.each(
        function () {
            var height = $(this).height();
            arrayHeight.push(Math.ceil(height));
        }
    );
    arrayHeight.sort(function (a, b) {
        return b - a;
    });
    $('.container-jobs').css('min-height', arrayHeight[0] + 40);
    $portfolioWorks.each(
        function () {
            $(this).css('height', arrayHeight[0]);
        }
    );
    arrayHeight.splice(0, this.length);
}

//Function for slide menu
function slideMenu() {
    var menu = $('.menu-mobile');
    var posMenu = menu.offset().left;
    var widthMenu = menu.width();
    $('.nav-toggle').toggleClass('x');
    if (posMenu === 0) {
        menu.animate({
            left: posMenu - (widthMenu + 40)
        }, 'slow');
    } else {
        menu.animate({
            left: 0
        }, 'slow');
    }
}

function menuDesktop() {
    var menu = $('#desktop-menu');
    var posMenu = menu.css('transform');
    $('.nav-toggle').toggleClass('x');
    if (posMenu == 'matrix(-1, 0, 0, -1, 0, 0)') {
        menu.css('animation', 'VisibleMenu 1s forwards');
    } else {
        menu.css('animation', 'HiddenMenu 1s');
    }

}

function tooltip(elem) {
    var tooltip = $('.tooltip');
    var tooltipText = $(elem).attr('data-tooltip');
    var leftPos = $(elem).offset().left;
    var topPos = $(elem).offset().top + ($(elem).height() / 2);
    tooltip.html(tooltipText);
    tooltip.css({
        left: leftPos - (37 + $('.tooltip').width()),
        top: topPos - ($('.tooltip').height() / 2)
    });
    tooltip.css('opacity', '1');
}

//Menu element click
function menu(elem) {
    var href = $(elem).children('a').attr('href');
    var anchorOffset = $('#' + href.substring(1)).offset();
    $('html, body').animate({
        scrollTop: anchorOffset.top
    }, 'slow');
    if (resolution992.matches) {
        slideMenu();
    } else {
        menuDesktop();
    }

}

//Function hidden elemements when windows scrolled
function hiddenHeaderItems(posPageY) {
    var heightWindow = $(window).outerHeight();
    var titleHeight = $('.name').height();
    var titleOffset = $('.name').position().top;
    var startTransform;
    var degTransform;

    var widthImg = 0.4 * $('header > img').width();
    var calcOpacity = 1 - (Math.floor(posPageY / (widthImg / 10).toFixed(1)) / 10);
    var chcekOpacity = $('header').children('img').css('opacity');

    if (posPageY <= widthImg.toFixed(0)) {
        $('header').children('img').css('opacity', calcOpacity);
    } else if ((posPageY > widthImg.toFixed(0)) && (chcekOpacity !== '0')) {
        $('header').children('img').css('opacity', 0);
    }

    titleOffset = parseInt(titleOffset.toFixed(0));
    if (orientation.matches && resolution768.matches) {
        startTransform = heightWindow - (titleHeight + titleOffset);
    } else {
        startTransform = heightWindow - (2 * titleHeight + titleOffset);
    }

    if ((posPageY >= startTransform) && (posPageY <= heightWindow - titleOffset)) {
        degTransform = (posPageY - startTransform) * (90 / (2 * titleHeight));
        $('.box-name').css({
            transform: 'rotateX(' + -degTransform + 'deg)',
            opacity: 1
        });
    } else if (posPageY < startTransform) {
        $('.box-name').css('transform', 'rotateX(' + 0 + 'deg)');
    } else if (posPageY > (heightWindow - titleOffset)) {
        $('.box-name').css({
            transform: 'rotateX(' + -90 + 'deg)',
            opacity: 0
        });
    }
}

//Constructor
//Form
function ValidForm() {
    this.$input = $('input, textarea'),
        this.nameReg = /^[\sa-ząćźżęśłóńA-ZĄĆŹŻĘŚŁÓŃ0-9&._-]{1,}$/i,
        this.emailReg = /^[a-z0-9]+[\w\d.-]+@[\w\d-]+\.+[a-z0-9.]{2,}$/i,
        this.htmlReg = /<(?:.|\s)*?>/g,
        this.nameStatus,
        this.emailStatus,
        this.subjectStatus,
        this.messageStatus,
        this.validInput = function (elem) {
            switch ($(elem).attr('name')) {
                case 'name':
                    this.nameArea(elem);
                    break;
                case 'email':
                    this.emailArea(elem);
                    break;
                case 'subject':
                    this.textArea(elem);
                    break;
                case 'message':
                    this.textArea(elem);
                    break;
            }
        },
        this.nameArea = function (elem) {
            var val = elem.value;
            if (this.nameReg.test(val) && val != '') {
                if ($(elem).attr('class') == 'valid invalid') {
                    $(elem).removeClass('invalid');
                } else {
                    $(elem).addClass('valid');
                }
                this.nameStatus = true;
            } else if (val == '') {
                $(elem).removeClass();
                this.nameStatus = false;
            } else {
                $(elem).addClass('invalid');
                this.nameStatus = false;
            }
        },
        this.emailArea = function (elem) {
            var val = elem.value;
            if (this.emailReg.test(val) && val != '') {
                if ($(elem).attr('class') == 'invalid') {
                    $(elem).removeClass('invalid');
                    $(elem).addClass('valid');
                } else if ($(elem).attr('class') == 'valid invalid') {
                    $(elem).removeClass('invalid');
                } else {
                    $(elem).addClass('valid');
                }
                this.emailStatus = true;
            } else if (val == '') {
                $(elem).removeClass();
                this.emailStatus = false;
            } else {
                $(elem).addClass('invalid');
                this.emailStatus = false;
            }
        },
        this.textArea = function (elem) {
            var val = elem.value;
            var xss;
            if (val != '') {
                xss = val.replace(this.htmlReg, '');
                $(elem).val(xss);
                $(elem).addClass('valid');
                if ($(elem).attr('name') == 'subject') {
                    this.subjectStatus = true;
                } else if ($(elem).attr('name') == 'message') {
                    this.messageStatus = true;
                }
            } else if (val == '') {
                $(elem).removeClass();
                if ($(elem).attr('name') == 'subject') {
                    this.subjectStatus = false;
                } else if ($(elem).attr('name') == 'message') {
                    this.messageStatus = false;
                }
            }
        },
        this.activeButton = function () {
            if (this.nameStatus && this.emailStatus && this.subjectStatus) {
                $('button').removeAttr('disabled');
            }
        },
        this.sendForm = function () {
            var self = this;
            var dataToSend = {
                'name': $('input[name="name"]').val(),
                'email': $('input[name="email"]').val(),
                'subject': $('input[name="subject"]').val(),
                'message': $('textarea[name="message"]').val()
            };
            if (this.nameStatus && this.emailStatus && this.subjectStatus && this.messageStatus) {
                $.ajax({
                    url: '/send.php',
                    method: 'post',
                    dataType: 'json',
                    data: dataToSend,
                    success: function (ret) {
                        if (ret.status == 'ok') {
                            $('.action').addClass('sendOk').html('Wiadomość wysłana :)');
                        } else if (ret.status == 'error') {
                            $('.action').addClass('sendErr').html('Błąd spróbuj ponownie :(');
                        }
                    },
                    error: function (error) {
                        console.error('Wystąpił błąd z połączeniem');
                    },
                    complete: function () {
                        $('button').prop('disabled', true);
                        $('input, textarea').val('').removeClass();
                        setTimeout(function () {
                            $('.action').html('');
                            $('.action').removeClass('sendOk');
                            $('.action').removeClass('sendErr');
                        }, 2000);
                    }
                });
            }
        }
}
//About-me
function AboutMe() {
    this.$contener = $('.about-me'),
        this.moreText = this.$contener.find('p').not(':first-of-type'),
        this.body = $('html, body'),
        this.offsetDesc,
        this.displayImg = this.$contener.children('img').css('display'),
        this.windowHeight = $(window).outerHeight(),
        this.bgFixed = function (posPageY) {
            if (posPageY >= this.windowHeight) {
                this.$contener.addClass('bgFix');
            } else {
                this.$contener.removeClass('bgFix');
            }
        },
        this.myPhoto = function (posPageY) {
            if (posPageY > 240) {
                $('.about-me img').css('transform', 'scale(1,1)');
                if (orientation.matches && resolution768.matches) {
                    this.$contener.children('p').animate({
                        opacity: 1
                    }, 'slow');
                } else {
                    this.$contener.children('p').delay(300).animate({
                        opacity: 1
                    }, 'slow');
                }
            }
        },
        this.topDesc = function () {
            if (this.displayImg !== 'none') {
                this.offsetDesc = $('.about-me').children('img').offset().top;
            } else {
                this.offsetDesc = $('.about-me').offset().top;
            }

            this.body.animate({
                scrollTop: this.offsetDesc
            }, 500, 'linear');
        },
        this.moreAboutMe = function (elem) {
            if (elem.textContent === 'Więcej...') {
                this.moreText.css({
                    height: 'auto',
                    padding: '10px',
                    visibility: 'visible'
                });
                elem.textContent = 'Mniej...';
                this.$contener.css('backgroundAttachment', 'fixed');
            } else {
                this.moreText.css({
                    visibility: 'hidden',
                    height: '0',
                    padding: '0'
                });
                elem.textContent = 'Więcej...';
                this.$contener.css('backgroundAttachment', '');
                this.topDesc();
            }
        }
}

//Skills
function SkillsViewer() {
    this.$skills = $('.skills').find('.containerSkills'),
        this.idClickSkill,
        this.$technology = $('.technology'),
        this.checkSkill = function (elem, offsetElem) {
            var self = this;
            this.idClickSkill = $(elem).attr('id');
            this.$skills.each(
                function () {
                    if ($(this).css('display') !== 'none') {
                        if ($(this).prev().attr('id') !== self.idClickSkill) {
                            self.slideSkill($(this).prev());
                        }
                    }
                }
            );
            this.slideSkill(elem);
            $('html, body').stop().animate({
                scrollTop: offsetElem
            }, 500, 'swing');
        },
        this.slideSkill = function (elem) {
            $(elem).children('span:not(.block)').toggle();
            if (!resolution576.matches) {
                if ($(elem).parent().children('.containerSkills').css('display') == 'none') {
                    $(elem).parent().children('.containerSkills').css('display', 'flex');
                } else {
                    $(elem).parent().children('.containerSkills').css('display', 'none');
                }
            } else {
                $(elem).parent().children('.containerSkills').toggle();
            }
        },
        this.skillLarge = function () {
            this.$technology.each(function (index) {
                $(this).children('h4').css({
                    left: index * 25 + '%',
                    zIndex: 4
                }).removeClass('z-depth-1');
            });
            this.$technology.eq(0).children('h4').addClass('activeSkill');
            this.$technology.eq(0).children('div.containerSkills').css('opacity', 1);
        },
        this.checkActiveLS = function (elem) {
            this.idClickSkill = $(elem).attr('id');
            var self = this;
            var classClickSkill = $(elem).attr('class');

            if (classClickSkill !== 'activeSkill') {
                this.$technology.each(function () {
                    var chClass = $(this).children('h4').attr('class');
                    if (chClass === 'activeSkill') {
                        $(this).children('h4').removeClass('activeSkill');
                        $(this).children('div.containerSkills').animate({
                            opacity: 0
                        }, 'slow');
                    }
                });
                this.changeActiveLS(elem);
            }
        },
        this.changeActiveLS = function (elem) {
            $(elem).addClass('activeSkill');
            $(elem).next().delay(300).animate({
                opacity: 1
            }, 'slow');
        }

}

//Slider portfolio
function SlideWorks() {
    this.$contener = $('.container-jobs'),
        this.$works = this.$contener.find('article'),
        this.width = this.$contener.width(),
        this.n_jobs = this.$works.length,
        this.posFirst = parseInt((this.width * 0.1).toFixed(1)),
        this.destFirst = function () {
            var self = this;
            this.$works.each(function (index) {
                $(this).css('left', self.posFirst + (index * self.width));
            });
        },
        this.starts = function (e) {
            if (e.type === 'swipeleft') {
                this.$works.css({
                    transformOrigin: '0% 50%',
                    transform: 'rotateY(15deg)'
                });
                setTimeout(this.nextJobs(), 300);
            } else {
                this.$works.css({
                    transformOrigin: '100% 50%',
                    transform: 'rotateY(-15deg)'
                });
                setTimeout(this.prevJobs(), 300);
            }
        },
        this.nextJobs = function () {
            var self = this;
            if (this.$works.eq(this.n_jobs - 1).offset().left === this.posFirst) {
                this.$works.eq(this.n_jobs - 1).css('left', '-250px');
                setTimeout(function () {
                    self.$works.eq(self.n_jobs - 1).css('left', self.posFirst);
                }, 300);
            } else {
                this.$works.delay(300).each(function () {
                    var leftNow = parseInt($(this).css('left'));
                    $(this).css('left', leftNow - self.width);
                });
            }
            this.changeTransform();
        },
        this.prevJobs = function () {
            var self = this;
            if (this.$works.eq(0).offset().left === this.posFirst) {
                this.$works.eq(0).css('left', '250px');
                setTimeout(function () {
                    self.$works.eq(0).css('left', self.posFirst);
                }, 300);
            } else {
                this.$works.each(function () {
                    var leftNow = parseInt($(this).css('left'));
                    $(this).css('left', leftNow + self.width);
                });
            }
            this.changeTransform();
        },
        this.changeTransform = function () {
            var self = this;
            setTimeout(function () {
                self.$works.css('transform', 'rotateY(0deg)');
            }, 800);
        },
        this.rotateLargeViewer = function (posY) {
            if (posY >= $('.skills').offset().top) {
                this.$works.each(function (index) {
                    $(this).delay(index * 100).animate({
                        textIndent: 0
                    }, {
                        step: function (fx) {
                            $(this).css('transform', 'rotateY(0)');
                        },
                        duration: 'slow'
                    }, 'linear');
                });
                $('.thumbnail-page').css('opacity', 1);
            }
        }
}

//Called constructor and function
sliderPortfolio = new SlideWorks();
skillsBox = new SkillsViewer();
about = new AboutMe();
formValid = new ValidForm();


$(document).ready(function () {

    if (resolution768.matches) {
        setHeightWorks();
        sliderPortfolio.destFirst();
    } else {
        skillsBox.skillLarge();
    }

    //Events

    //Menu slide
    $('.nav-toggle').on('click', function () {
        if (resolution992.matches) {
            slideMenu();
        } else {
            menuDesktop();
        }

    });

    //Show more in about me
    $('.more').on('click', function () {
        about.moreAboutMe(this);
    });

    //Button for skill show
    $('#frontEnd').on('click', function () {
        if (!resolution768.matches) {
            skillsBox.checkActiveLS(this);
        } else {
            skillsBox.checkSkill(this, offsetFront);
        }
    });
    $('#backEnd').on('click', function () {
        if (!resolution768.matches) {
            skillsBox.checkActiveLS(this);
        } else {
            skillsBox.checkSkill(this, offsetBack);
        }
    });
    $('#graphic').on('click', function () {
        if (!resolution768.matches) {
            skillsBox.checkActiveLS(this);
        } else {
            skillsBox.checkSkill(this, offsetGraphic);
        }
    });
    $('#tools').on('click', function () {
        if (!resolution768.matches) {
            skillsBox.checkActiveLS(this);
        } else {
            skillsBox.checkSkill(this, offsetTools);
        }
    });

    //Click menu mobile element
    $('.anchor-section li').on('click', function () {
        menu(this);
    });

    $('#desktop-menu li').hover(function () {
        tooltip(this);
    }, function () {
        $('.tooltip').css('opacity', '0');
        $('.tooltip').html('');
    });

    $('.toTop').on('click', function () {
        var body = $("html, body");
        body.stop().animate({
            scrollTop: 0
        }, 1000, 'swing');
    });

    //Slide portfolio
    $('.container-jobs').on('swipeleft', function (e) {
        sliderPortfolio.starts(e);
    });

    $('.container-jobs').on('swiperight', function (e) {
        sliderPortfolio.starts(e);
    });

    //Validate form
    $('input, textarea').on('focus', function () {
        $(this).on('keyup', function () {
            formValid.validInput(this);
        });
        $(this).on('mousup', function () {
            formValid.validInput(this);
        });
    });
    $('textarea').on('focus', function () {
        formValid.activeButton();
    });
    $('form').on('submit', function (e) {
        e.preventDefault();
        formValid.sendForm();
    });

    //Setings when window scrolled
    $(window).on('scroll', function () {
        var posPageY = this.pageYOffset;
        hiddenHeaderItems(posPageY);
        about.bgFixed(posPageY);
        about.myPhoto(posPageY);
        sliderPortfolio.rotateLargeViewer(posPageY);
    });
});

//When window is ready
$(window).ready(function () {
    $('.loading').animate({
        opacity: 0
    }, '300');
    setTimeout(function () {
        $('.loading').css('display', 'none');
    }, 300);

    //Change orietation window
    $(window).on('orientationchange', function () {
        $('.loading').css({
            opacity: 1,
            display: 'block'
        });
        setTimeout(function () {
            location.reload();
        }, 100);
    });
});