$(function(){
	var humbergerElm = $('.humberger-icon, .humberger-icon>span');
	var scrollTop = $(window).scrollTop();
	var screenWidth = $(window).width();
	var screenHeight = $(window).height();
//////////////////////////////////////////////////////////////
// 写真ダウンロード・右クリック禁止
//////////////////////////////////////////////////////////////
$('img').on('contextmenu', function(){
	return false;
});
document.ondragstart = function(){
	return false
};
//////////////////////////////////////////////////////////////
// ページ遷移アニメーション
//////////////////////////////////////////////////////////////
$(document).ready(function(){
  var delaySpeed = 800,
      fadeSpeed = 2000;
	if (window.matchMedia( '(max-width: 768px)' ).matches) {
		$('.nav').removeClass('none');
	}
	$('.fade').each(function(i){
    $(this).delay(i*(delaySpeed)).animate({opacity:'1'}, fadeSpeed);
  });
});

$('nav a').on('click', function(e){
			href = $(this).attr('href');
  e.preventDefault();

	if(humbergerElm.hasClass('is-open')){
		$('.nav').stop().animate({top:'-100%'}, 500);
		humbergerElm.removeClass('is-open');
	}

  $('html, body').stop().animate({scrollTop:'0'}, 'swing');

	if(href.indexOf('index.html') !== -1){
		$('body').fadeOut(1000, function(){
	    location.href = href;
	  });
	} else {
		$('.fade, .none, #contents, #footer').fadeOut(1000, function(){
	    location.href = href;
	  });
	}
});

//////////////////////////////////////////////////////////////
// Gallery fadeIn
//////////////////////////////////////////////////////////////
$.fn.fadeinsTgt = function(options) {
	if(!this.length){return;}//対象が存在しない場合は回避
	var el = this,
	isAppeared = false,
	o = $.extend({
		heightRatio : 0.5,//tgtの6割が見えたら発動
		topPoint : 0,
		delayTime : 0.3,
		setVar : {},
		completeVar : {}
	}, options );
	var init = function(){
		TweenMax.set(el,o.setVar);
		tgtAppear();
	};
	var tgtAppear = function(){
		if($(window).scrollTop() + $(window).height() > el.offset().top + el.height()*o.heightRatio){
			isAppeared = true;
			TweenMax.staggerTo(el, 1, o.completeVar, o.delayTime);
		}
	};
	$(window).on('scroll',function(){
		if(isAppeared){
			return false;
		}
		setTimeout(function(){
			tgtAppear();
		},o.delayTime)
	});
	init();
};

var isWide = true;
$('.m-gallery').each(function(){
	//fadeinsTgt
	var colLength = (isWide) ? 5 : 4 ;
	var howManyRow = Math.ceil($(this).find('.thumbnail').length / colLength)
		for (var i = 0; i < howManyRow ; i++) {
			$(this).find('.thumbnail').slice((i*colLength), (i+1)*colLength).fadeinsTgt({
				heightRatio : 0.1,
				setVar :  (isWide) ? {opacity : 0, y : 50} : {opacity : 0},
				completeVar : {opacity : 1, y : 0},
				delayTime : 0.3
			});
		};
});

$('#contents').each(function(){
	var colLength = (isWide) ? 2 : 1 ;
	var howManyRow = Math.ceil($(this).find('.none').length / colLength)
	for (var i = 0; i < howManyRow ; i++) {
		$(this).find('.none').slice((i*colLength), (i+1)*colLength).fadeinsTgt({
			heightRatio : 0.1,
			setVar :  (isWide) ? {opacity : 0} : {opacity : 0},
			completeVar : {opacity : 1},
			delayTime : 0.7
		});
	};
});

//////////////////////////////////////////////////////////////
// Photo Swipe
//////////////////////////////////////////////////////////////

(function($){
    $(function(){
        $('.thumbnail a').photoSwipe();
    });
})(jQuery);

//////////////////////////////////////////////////////////////
// Humberger Menu
//////////////////////////////////////////////////////////////
$('.humberger-icon').on('click', function(){
	if(!$(this).hasClass('is-open')){
		humbergerElm.removeClass('close').addClass('is-open');
		$('.nav').stop().animate({top:'0'}, 500);
	} else{
		humbergerElm.removeClass('is-open').addClass('close');
		$('.nav').stop().animate({top:'-100%'}, 500);
	}
});

$(window).on('resize', function(){
	if(screenWidth <= 798){
		$('.nav').css({top:'-100%'});
		if(humbergerElm.hasClass('is-open')){
			humbergerElm.removeClass('is-open');
		}
	} else {
		$('.nav').removeAttr('style').css({display:'block'});
	}
});

//////////////////////////////////////////////////////////////
// Header Shadow
//////////////////////////////////////////////////////////////
$(window).on('load scroll', function(){
	var headerPosition = $(window).scrollTop();
	if(headerPosition >= $('main').offset().top) {
		$('header').addClass('shadow');
	} else {
		$('header').removeClass('shadow');
	}
});
//////////////////////////////////////////////////////////////
// Works Hover
//////////////////////////////////////////////////////////////
$('#works').each(function(){
	$('.thumbnail').hover(
		function(){
			$(this).find('img').css({opacity:'0.6'});
			$(this).find('p').css({bottom:'0'});
		},
		function(){
			$(this).find('img, p').removeAttr('style');
		}
	);
});



});//Finished all
