$(function () {
    headerEvt();
    $(this).find('.nice-select').niceSelect(); // selectbox
    fileUpload(); // fileupload
    uiDropdown('header .my-menu');
    $(this).find('.datepicker').datepicker();
    modalToggle(); // modal
    classToggle();
    allChecker();
});

$(window).on('load', function(){
    xScroll('.x-scroll');
    xScroll('.m-scroll');
});

function headerEvt() {
    // pc
    $('#gnb a.dep1').mouseenter(function(){
        $('header').addClass('open');
    });
    $('header').mouseleave(function(){
        $('header').removeClass('open');
    });

    // mobile
    $('header .btn-menu-all').click(function(){
        var nav = $('#gnb');
        if ($(this).hasClass('open')){
            nav.removeClass('m-open');
            $('header .header-dim').removeClass('m-open');
            setTimeout(function(){
                nav.hide();
                $('header .header-dim').remove();
            }, 320);
            $(this).removeClass('open');
        } else {
            nav.before('<div class="header-dim">&nbsp;</div>');
            nav.show();
            setTimeout(function(){
                nav.addClass('m-open');
                $('header .header-dim').addClass('m-open');
            }, 50);
            $(this).addClass('open');
        }
    });

    // mobile gnb toggle
    $('#gnb .btn-depth-more').click(function(){
        var btn = $(this);
        var dep2 = btn.siblings('ul.depth2');
        var allBtn = $('#gnb .btn-depth-more');
        var allDep2 = $('#gnb ul.depth2');

        if (btn.hasClass('open')){
            dep2.slideUp();
            btn.removeClass('open');
        } else {
            allBtn.removeClass('open');
            allDep2.slideUp();
            btn.addClass('open');
            dep2.slideDown();
        }
    });
}

// totop
function toTop(obj) {
    var $btn = $(obj);

    $btn.click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop : 0
        }, 400);
        return false;
    });
}

// iscroll outerwidth
function calcWidth(target) {
    var $target = $(target);

    $target.each(function(){
        var child = $(this).children(),
            width = 0;

        child.each(function(){
            width += $(this).outerWidth(true);
        });
        $(this).css('width', width);
    });
}

// iscroll
function xScroll(obj) {
    var $obj = $(obj),
        tabs = $obj.find('.tabs');

    if ( $(obj).length <= 0 ) {
        return
    } else {
        $(window).resize(function(){
            calcWidth(tabs);
        });
        calcWidth(tabs);
        new IScroll(obj , {
            scrollX : true,
            scrollY : false,
            mouseWheel : false,
            autoCenterScroll : true,
            bounce : true
        });
    }
}

function xScroll2(obj) {
    var $obj = $(obj),
        tabs = $obj.find('.ranking-lists');

    if ( $(obj).length <= 0 ) {
        return
    } else {
        $(window).resize(function(){
            calcWidth(tabs);
        });
        calcWidth(tabs);
        new IScroll(obj , {
            scrollX : true,
            scrollY : false,
            mouseWheel : false,
            autoCenterScroll : true,
            bounce : true
        });
    }
}

// accordion
function accordion() {
    var wrap = $('.ui-accordion'),
        list = wrap.find('li'),
        title = wrap.find('.accord-title'),
        toggle = title.find('.btn-toggle');

    if(wrap.length <= 0) return;

    // ????????? ??????
    list.each(function(){
        var $btn = $(this).find('.accord-title .btn-toggle'),
            $content = $(this).find('.accord-cont'),
            id = $(this).index();

        $btn.attr({
            'id' : 'accord-toggle' + id,
            'aria-controls' : 'accord-cont' + id
        });
        $content.attr({
            'id' : 'accord-cont' + id,
            'role' : 'region',
            'aria-labelledby' : 'accord-toggle' + id
        })
    });

    toggle.click(function(){
        var li = $(this).parent('.accord-title').parent('li'),
            cont = $(this).parent('.accord-title').siblings('.accord-cont'),
            blind = $(this).find('.blind');

        if (li.hasClass('open')) {
            $(this).attr('aria-expanded', 'false');
            cont.slideUp();
            li.removeClass('open');
            blind.text('????????????');
        } else {
            $(this).attr('aria-expanded', 'true');
            cont.slideDown();
            li.addClass('open');
            blind.text('??????');
        }
    });
}

// data sorting
function dataSorting() {
    var tab = '[data-type="sortingTab"]',
        $tab = $(tab),
        btn = $tab.find('a');

    var listWrap = '[data-type="sortingTarget"]',
        $wrap = $(listWrap),
        listAll = $wrap.find('li');

    if($tab.length <= 0) return;

    btn.click(function(e){
        var num = $(this).data('category-num'),
            $target = $('[data-category-id='+num+']');

        e.preventDefault();
        $(this).parent('li').siblings().removeClass('active');
        $(this).parent('li').addClass('active');
        listAll.hide();

        var empty = '<li class="empty"><p class="nodata">???????????? ????????????.</p></li>',
            uls = $wrap.find('.lists');

        if (num === 'all') {
            uls.find('li.empty').remove();
            listAll.show();
        } else {
            if ($target.length <= 0) {
                uls.find('li.empty').remove();
                uls.append(empty);
            } else {
                uls.find('li.empty').remove();
                $target.show();
            }
        }
    });
}

// file upload 
function fileUpload() {
    var obj = $('.inputfile-wrap');
    
    if (obj.length <= 0) return;

    var fileTarget = obj.find('input[type=file]');

    fileTarget.on('change', function(){
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }

        $(this).siblings('input[type=text]').val(filename);
    });
}

// class toggle
function classToggle() {
    $('[data-toggle="class-toggle"]').find('button, a').click(function(){
        var li = $(this).closest('li');
        var lis = li.siblings('li');
        var wraps = $(this).closest($('[data-toggle="class-toggle"]'));
        var toggleSelf = wraps.data('toggle-self');
        var toggleClass = wraps.data('toggle-class');
        var className = toggleClass === undefined ? 'active' : toggleClass;

        if (toggleSelf){
            if (li.hasClass(className)){
                li.removeClass(className);
            } else {
                lis.removeClass(className);
                li.addClass(className);
            }
        } else {
            lis.removeClass(className);
            li.addClass(className);
        }
    });
}

// dropdown
function uiDropdown(obj) { 
    var wrap = $(obj);
    $(obj+' .btn-toggle').on('click', function(e){
        var btn = $(this);
        var lists = btn.siblings('.lists');
        var wraps = btn.closest(obj);

        e.stopPropagation();
        e.preventDefault();
        wraps.hasClass('open') ? wraps.removeClass('open') : wraps.addClass('open');
    });
    $('html').click(function(e){
        if ( !$(e.target).is(wrap) ) {
            wrap.removeClass('open');
        }
    });
}

// tab
function uiTab() {
    var tab = '[data-evt="tab"]';
    $(document).on('click', tab + ' a', function (e) {
        e.preventDefault();

        var $this = $(this),
            id = $this.attr('href'),
            $target = $('[data-id=' + id + ']'),
            $siblings = $this.parents('li').siblings('').find('a');

        $siblings.each(function () {
            var id = $(this).attr('href');
            $(this).parents('li').removeClass('active');
            $('[data-id=' + id + ']').hide();
        });
        $this.parents('li').addClass('active');
        $target.show();

        return false;
    });

    if ( tab.length <= 0 ) return;
    $(tab).find('a').each(function(){
        var tg = $(this).attr('href');

        $('[data-id="'+tg+'"]').hide();
    });
    $(tab + ' > li:first-child a').click();
}

// input category
function categoryToggle() {
    $('[data-toggle="category-collapse"] input').on('change', function(){
        var self = $(this),
            my = self.attr('data-visible-target'),
            myArr = my? my.split(',') : [],
            targets = $('[data-collapse-num]');

        if (self.is(':checked')) {
            targets.hide();

            var target = '';
            $.each(myArr, function(index, value){
                target = '[data-collapse-num="'+value.trim()+'"]';
                $(target).show();
            });
        } else {
            return;
        }
    });

    $('[data-toggle="category-collapse"] input#cate05').click();
}

// checkbox all check
function allChecker() {
    var obj = '[data-toggle="allChk"]',
        $obj = $(obj);

    if ($obj.length <= 0) return;
    $obj.each(function(){
        var $input = $(this).find('.chk-all'),
            name = $input.attr('name');

        $input.on('change', function(){
            var $name = $(this).attr('name'),
                $wrapper = $(this).parents(obj),
                $childs = $wrapper.find('input[name='+ $name +']');
            
            if ($(this).prop("checked")) {
                $childs.prop("checked", true);
            } else {
                $childs.prop("checked", false);
            }
        });
        
        $('input[name=' + name + ']').each(function () {
            var $this = $(this);
    
            $this.on('change', function () {
                var total = $('input[name=' + name + ']').length;
                var chked = $('input[name=' + name + ']:checked').not($input).length + 1;
                if (chked == total) {
                    $input.prop("checked", true);
                } else {
                    $input.prop("checked", false);
                }
            });
        });
    });
}

// modal
function modalToggle() {
    var modalToggle = $('[data-toggle="modal"]'),
        modalClose = $('[data-toggle="modal-close"]');

    if (modalToggle.length <= 0) return;

    modalToggle.on('click', function(e){
        var modalTarget = $(this).data('target') || $(this).attr('href');
            modal = $(modalTarget);

        e.preventDefault();
        modal.removeAttr('aria-hidden');
        modal.attr('aria-modal', true);
        modal.show();
    });

    modalClose.on('click', function(){
        var modal = $(this).parents('.modal');

        modal.hide();
        modal.removeAttr('aria-modal');
        modal.attr('aria-hidden', true);
    });
}

function starrating(){
    $('.star-rating .stars').hover(function(){
        $(this).addClass('hover').prevAll('.stars').addClass('hover');
    }, function(){
        $('.star-rating .stars').removeClass('hover');
    });
    $('.star-rating .stars').click(function(){
        var my = $(this);
        var allBtn = my.siblings('.stars');

        allBtn.removeClass('on');
        my.addClass('on').prevAll('.stars').addClass('on');
    });
}