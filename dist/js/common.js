$(function(){var e=$(".humberger-icon, .humberger-icon>span"),t=($(window).scrollTop(),$(window).width()),n=($(window).height(),$("body").has("#home"));$("img").on("contextmenu",function(){return!1}),document.ondragstart=function(){return!1};var i=800,o=2e3;$(window).on("load resize",function(){window.matchMedia("(max-width: 768px)").matches&&$(".nav").removeClass("fade")}),n?($(".outline01").addClass("top-line").delay(1e3).addClass("right-line"),$(".outline02").addClass("bottom-line").delay(1e3).addClass("left-line"),$(".fade").delay(2300).each(function(e){$(this).delay(e*i).animate({opacity:"1"},o)})):$(".fade").each(function(e){$(this).delay(e*i).animate({opacity:"1"},o)}),$("nav a").on("click",function(t){href=$(this).attr("href"),t.preventDefault(),e.hasClass("is-open")&&($(".nav").animate({top:"-100%"},500),e.removeClass("is-open")),n&&($(".outline01").removeClass("right-line").delay(1e3).removeClass("top-line"),$(".outline02").removeClass("left-line").delay(1e3).removeClass("bottom-line"),$(".fade").delay(1500).fadeOut(1e3,function(){location.href=href})),$("html, body").stop().animate({scrollTop:"0"},"swing"),href.indexOf("index.html")!==-1?$("body").fadeOut(1e3,function(){location.href=href}):$(".fade, .none, #contents, #footer").fadeOut(1e3,function(){location.href=href})}),$.fn.fadeinsTgt=function(e){if(this.length){var t=this,n=!1,i=$.extend({heightRatio:.5,topPoint:0,delayTime:.3,setVar:{},completeVar:{}},e),o=function(){TweenMax.set(t,i.setVar),a()},a=function(){$(window).scrollTop()+$(window).height()>t.offset().top+t.height()*i.heightRatio&&(n=!0,TweenMax.staggerTo(t,1,i.completeVar,i.delayTime))};$(window).on("scroll",function(){return!n&&void setTimeout(function(){a()},i.delayTime)}),o()}};var a=!0;$(".m-gallery, .j-gallery").each(function(){for(var e=a?6:5,t=Math.ceil($(this).find(".thumbnail").length/e),n=0;n<t;n++)$(this).find(".thumbnail").slice(n*e,(n+1)*e).fadeinsTgt({heightRatio:.1,setVar:a?{opacity:0,y:30}:{opacity:0},completeVar:{opacity:1,y:0},delayTime:.3})}),$("#contents").each(function(){for(var e=a?2:1,t=Math.ceil($(this).find(".none").length/e),n=0;n<t;n++)$(this).find(".none").slice(n*e,(n+1)*e).fadeinsTgt({heightRatio:.1,setVar:a?{opacity:0}:{opacity:0},completeVar:{opacity:1},delayTime:.7})});var l=function(e){for(var t=function(e){for(var t,n,i,o,a=e.childNodes,l=a.length,r=[],s=0;s<l;s++)t=a[s],1===t.nodeType&&(n=t.children[0],i=n.getAttribute("data-size").split("x"),o={src:n.getAttribute("href"),w:parseInt(i[0],10),h:parseInt(i[1],10)},t.children.length>1&&(o.title=t.children[1].innerHTML),n.children.length>0&&(o.msrc=n.children[0].getAttribute("src")),o.el=t,r.push(o));return r},n=function e(t,n){return t&&(n(t)?t:e(t.parentNode,n))},i=function(e){e=e||window.event,e.preventDefault?e.preventDefault():e.returnValue=!1;var t=e.target||e.srcElement,i=n(t,function(e){return e.tagName&&"FIGURE"===e.tagName.toUpperCase()});if(i){for(var o,l=i.parentNode,r=i.parentNode.childNodes,s=r.length,d=0,c=0;c<s;c++)if(1===r[c].nodeType){if(r[c]===i){o=d;break}d++}return o>=0&&a(o,l),!1}},o=function(){var e=window.location.hash.substring(1),t={};if(e.length<5)return t;for(var n=e.split("&"),i=0;i<n.length;i++)if(n[i]){var o=n[i].split("=");o.length<2||(t[o[0]]=o[1])}return t.gid&&(t.gid=parseInt(t.gid,10)),t.hasOwnProperty("pid")?(t.pid=parseInt(t.pid,10),t):t},a=function(e,n,i){var o,a,l,r=document.querySelectorAll(".pswp")[0];l=t(n),a={index:e,preload:[1,3],hideAnimationDuration:1200,showHideOpacity:!0,pinchToClose:!0,closeOnVerticalDrag:!0,closeOnScroll:!1,galleryUID:n.getAttribute("data-pswp-uid"),getThumbBoundsFn:function(e){var t=l[e].el.getElementsByTagName("img")[0],n=window.pageYOffset||document.documentElement.scrollTop,i=t.getBoundingClientRect();return{x:i.left,y:i.top+n,w:i.width}}},i&&(a.showAnimationDuration=0),o=new PhotoSwipe(r,PhotoSwipeUI_Default,l,a),o.init()},l=document.querySelectorAll(e),r=0,s=l.length;r<s;r++)l[r].setAttribute("data-pswp-uid",r+1),l[r].onclick=i;var d=o();d.pid>0&&d.gid>0&&a(d.pid-1,l[d.gid-1],!0)};l(".m-gallery"),$(".humberger-icon").on("click",function(){$(this).hasClass("is-open")?(e.removeClass("is-open").addClass("close"),$(".nav").animate({top:"-100%"},500)):(e.removeClass("close").addClass("is-open"),$(".nav").animate({top:"0"},500))}),$(window).on("resize",function(){t<=798?e.hasClass("is-open")&&(e.removeClass("is-open").addClass("close"),e.children().addClass("close"),$(".nav").removeAttr("style")):($(".nav").removeAttr("style").css({display:"block"}),e.removeClass("is-open").addClass("close"),e.children().addClass("close"))}),$("#works").each(function(){$(".thumbnail").hover(function(){$(this).find("img").css({opacity:"0.6"}),$(this).find(".caption").css({bottom:"0"})},function(){$(this).find("img, .caption").removeAttr("style")})})});