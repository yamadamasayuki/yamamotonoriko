$(function(){
	var humbergerElm = $('.humberger-icon, .humberger-icon>span');
	var scrollTop = $(window).scrollTop();
	var screenWidth = $(window).width();
	var screenHeight = $(window).height();
	var isHome = $('body').has('#home');

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

$(window).on('load resize', function(){
	if (window.matchMedia( '(max-width: 768px)' ).matches) {
		$('.nav').removeClass('fade');
	}
});

if(isHome){
	$('.outline01').addClass('top-line')
								 .delay(1000).addClass('right-line');
	$('.outline02').addClass('bottom-line')
								 .delay(1000).addClass('left-line');
	$('.fade').delay(2300).each(function(i){
		$(this).delay(i*(delaySpeed)).animate({opacity:'1'}, fadeSpeed);
	});
} else {
	$('.fade').each(function(i){
		$(this).delay(i*(delaySpeed)).animate({opacity:'1'}, fadeSpeed);
	});
}


$('nav a').on('click', function(e){
			href = $(this).attr('href');
  e.preventDefault();

	if(humbergerElm.hasClass('is-open')){
		$('.nav').animate({top:'-100%'}, 500);
		humbergerElm.removeClass('is-open');
	}

	if(isHome) {
		$('.outline01').removeClass('right-line')
									 .delay(1000).removeClass('top-line');
		$('.outline02').removeClass('left-line')
									 .delay(1000).removeClass('bottom-line');
		$('.fade').delay(1500).fadeOut(1000, function(){
	    location.href = href;
	  });
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
$('.m-gallery, .j-gallery').each(function(){
	//fadeinsTgt
	var colLength = (isWide) ? 6 : 5 ;
	var howManyRow = Math.ceil($(this).find('.thumbnail').length / colLength)
		for (var i = 0; i < howManyRow ; i++) {
			$(this).find('.thumbnail').slice((i*colLength), (i+1)*colLength).fadeinsTgt({
				heightRatio : 0.1,
				setVar :  (isWide) ? {opacity : 0, y : 30} : {opacity : 0},
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

// (function($){
//     $(function(){
//         $('.thumbnail a').photoSwipe();
//     });
// })(jQuery);

var initPhotoSwipeFromDOM = function( gallerySelector ) {

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            // include only element nodes
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };

            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }

        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        if(!params.hasOwnProperty('pid')) {
            return params;
        }
        params.pid = parseInt(params.pid, 10);
        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            index: index,

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid > 0 && hashData.gid > 0) {
        openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
    }
};

// PhotoSwipeを起動する
initPhotoSwipeFromDOM( '.m-gallery' ) ;

//////////////////////////////////////////////////////////////
// Humberger Menu
//////////////////////////////////////////////////////////////
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
	if(screenWidth <= 798){
		if(humbergerElm.hasClass('is-open')){
			humbergerElm.removeClass('is-open').addClass('close');
			humbergerElm.children().addClass('close');
			$('.nav').removeAttr('style');
		}
	} else {
		$('.nav').removeAttr('style').css({display:'block'});
		humbergerElm.removeClass('is-open').addClass('close');
		humbergerElm.children().addClass('close');
	}
});

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



});//Finished all
