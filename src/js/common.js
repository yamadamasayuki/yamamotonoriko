$(function(){
	var humbergerElm = $('.humberger-icon, .humberger-icon>span');
			isHome = $('body').is('#home');
			isOtherPage = $('body').is('#family, #works, #gallery, #profile, #contact');
			$win = $(window);

	$win.on('scroll', function(){
		var scrollTop = $win.scrollTop();
		console.log(scrollTop);
	});

	$win.on('resize load scroll', function(){
		var winWidth = $win.width();
		var winHeight = $win.height();
		console.log(winWidth, winHeight);
	});

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
var delaySpeed = 800,
    fadeSpeed = 2000;

$win.on('load resize', function(){
	if (window.matchMedia( '(max-width: 768px)' ).matches) {
		$('.nav').removeClass('fade');
	}
});

$('#home').each(function(){
	$('.outline01').addClass('top-line')
								 .delay(1000).addClass('right-line');
	$('.outline02').addClass('bottom-line')
								 .delay(1000).addClass('left-line');
	$('.fade').delay(2300).each(function(i){
		$(this).delay(i*(delaySpeed)).animate({opacity:'1'}, fadeSpeed);
	});
});

$('.none').each(function(){
	$('.none').each(function(i){
		$(this).delay(i*(delaySpeed)).animate({opacity:'1'}, fadeSpeed);
	});
});



$('nav a').on('click', function(e){
			href = $(this).attr('href');
  e.preventDefault();

	if(humbergerElm.hasClass('is-open')){
		$('.nav').animate({top:'-100%'}, 500);
		humbergerElm.removeClass('is-open').addClass('close');
	}

	if(isHome) {
		$('.outline01').removeClass('right-line')
									 .delay(1000).removeClass('top-line');
		$('.outline02').removeClass('left-line')
									 .delay(1000).removeClass('bottom-line');
		$('.fade').fadeOut(2500, function(){
			location.href = href;
		});
	} else {
		$('html, body').stop().animate({scrollTop:'0'}, 'swing');
			var str = $(this).attr("href");
			if(str.match(/family|works|gallery|profile|contact/)) {
				$('.fade, .none, #contents, #footer').fadeOut(1000, function(){
					location.href = href;
				});
			} else {
				$('body').fadeOut(1000, function(){
					location.href = href;
				});
			}
	}
});

//////////////////////////////////////////////////////////////
// Gallery fadeIn
//////////////////////////////////////////////////////////////
$('.m-gallery').each(function(){
	$('.m-gallery').imagesLoaded(function(){
		$('.m-gallery').masonry({
			itemSelector: '.thumbnail',
			//columnWidth: 200,
			isFitWidth: true  //親要素の幅に合わせてカラム数を自動調整
		});
	});
	$('.m-gallery').lightGallery({
			selector: '.thumbnail a',
			mode: 'lg-fade',
			thumbnail: false,
			download: false,
			zoom: false,
			speed: 600
	});

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
			if($win.scrollTop() + $win.height() > el.offset().top + el.height()*o.heightRatio){
				isAppeared = true;
				TweenMax.staggerTo(el, 1, o.completeVar, o.delayTime);
			}
		};
		$win.on('scroll',function(){
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
	$('.m-gallery, .j-gallery').each(function(){
		//fadeinsTgt
		if(window.matchMedia( '(max-width: 1421px)' ).matches){
			var colLength = (isWide) ? 4 : 3 ;
			var howManyRow = Math.ceil($(this).find('.thumbnail').length / colLength)
				for (var i = 0; i < howManyRow ; i++) {
					$(this).find('.thumbnail').slice((i*colLength), (i+1)*colLength).fadeinsTgt({
						heightRatio : 0.1,
						setVar :  (isWide) ? {opacity : 0, y : 10} : {opacity : 0},
						completeVar : {opacity : 1, y : 0},
						delayTime : 0.3
					});
				};
		} else {
			var colLength = (isWide) ? 5 : 4 ;
			var howManyRow = Math.ceil($(this).find('.thumbnail').length / colLength)
				for (var i = 0; i < howManyRow ; i++) {
					$(this).find('.thumbnail').slice((i*colLength), (i+1)*colLength).fadeinsTgt({
						heightRatio : 0.1,
						setVar :  (isWide) ? {opacity : 0, y : 10} : {opacity : 0},
						completeVar : {opacity : 1, y : 0},
						delayTime : 0.3
					});
				};
		}
	});

	// $win.on('load scroll', function(){
	// 	$('.thumbnail').each(function(){
	// 		var ElmTop = $(this).offset().top;
	// 				showHeight = 150;
	// 		if($win.scrollTop() > (ElmTop + showHeight) - $win.height()){
	// 			$(this).animate({opacity:'1'}, 700);
	// 		}
	// 	});
	// });

});


// //////////////////////////////////////////////////////////////
// // Humberger Menu
// //////////////////////////////////////////////////////////////
$('.humberger-icon').on('click', function(){
	if(!$(this).hasClass('is-open')){
		humbergerElm.removeClass('close').addClass('is-open');
		$('.nav').animate({top:'0'}, 500);
	} else{
		$('.nav').animate({top:'-100%'}, 500);
		humbergerElm.removeClass('is-open').addClass('close');
	}
});

$win.on('load resize', function(){
	if(window.matchMedia( '(min-width: 769px)' ).matches && isHome) {
		$('.nav').css({top:'-15vh'});
		console.log('if');
	} else if(window.matchMedia( '(min-width: 769px)' ).matches && !isHome) {
		$('.nav').removeAttr('style');
		console.log('ifelse');
	} else {
		$('.nav').css({top:'-100%'});
		humbergerElm.removeClass('is-open').addClass('close');
		console.log('else');
	}
});

	if(humbergerElm.hasClass('is-open')){
		humbergerElm.removeClass('is-open').addClass('close');
		humbergerElm.children().addClass('close');
	} else {
			humbergerElm.removeClass('is-open').addClass('close');
			humbergerElm.children().addClass('close');
	}

//////////////////////////////////////////////////////////////
// Works Hover
//////////////////////////////////////////////////////////////
$('#works').each(function(){
	$('.thumbnail').hover(
		function(){
			$(this).find('img').css({opacity:'0.6'});
			$(this).find('.caption').css({bottom:'0'});
		},
		function(){
			$(this).find('img, .caption').removeAttr('style');
		}
	);
});

////////////////////////////////////////////////////////////
// おむすび
////////////////////////////////////////////////////////////
// 	var count = 0;
// 	var countup = function(){
// 	console.log(count++);
// 	var left = 35 + (count * 50 ) + 'px';
// 	console.log(left);
// 	$('.omusubi').css({left:left});
// 	}
// 　var id = setInterval(function(){
// 　　countup();
// 　　if(count > 25){　
// 　　　clearInterval(id);　//idをclearIntervalで指定している
// 　　}}, 2000);


});//Finished all
