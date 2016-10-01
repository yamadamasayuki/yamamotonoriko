$(function(){
	var humbergerElm = $('.humberger-icon, .humberger-icon>span');
	// $(document).ready(function(){
	// 	var ref = document.referrer.indexOf('index.html');
	// 	if(ref !== -1){
	// 		$('.nav, #arrowWrap').removeClass('none');
	// 		console.log('success')
	// 	} else {
	// 		console.log('bad')
	// 	}
	// });

	$("img").on("contextmenu",function(){
		return false;
	});
	document.ondragstart = function(){
		return false
	};
	$(document).ready(function(){
	  var delaySpeed = 1500,
	      fadeSpeed = 3000;
		if (window.matchMedia( '(max-width: 768px)' ).matches) {
			$('.nav').removeClass('none');
		}
		$('.none').each(function(i){
	    $(this).delay(i*(delaySpeed)).fadeIn(fadeSpeed);
	  });
	});

	$('nav a').on('click', function(e){
		var scrollTop = $(window).scrollTop();
				href = $(this).attr('href');
	  e.preventDefault();

		if(humbergerElm.hasClass('is-open')){
			$('.nav').animate({top:'-100%'}, 500);
			humbergerElm.removeClass('is-open');
		}

	  $('html, body').animate({scrollTop:'0'}, 'swing');

		if(href.indexOf('index.html') !== -1){
			$('.none, .nav, #arrowWrap').fadeOut(1000, function(){
		    location.href = href;
		  });
		} else {
			$('.none').fadeOut(1000, function(){
		    location.href = href;
		  });
		}
	});

	$('.humberger-icon').on('click', function(){
		if(!$(this).hasClass('is-open')){
			humbergerElm.removeClass('close').addClass('is-open');
			$('.nav').animate({top:'0'}, 500);
		} else{
			humbergerElm.removeClass('is-open').addClass('close');
			$('.nav').animate({top:'-100%'}, 500);
		}
	});

	$(window).on('resize', function(){
		var screenWidth = $(window).width();
		if(screenWidth <= 798){
			$('.nav').animate({top:'-100%'}, 500);
			if(humbergerElm.hasClass('is-open')){
				humbergerElm.removeClass('is-open');
			} else {
				return false
			}
		}
	});


});
