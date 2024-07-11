
$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};
	$('body').removeClass('loaded');

	$("body").addClass("loaded");


	// Mob nav
	$(".header__toggle").click(function(){
    // $(".header__mobnav").slideToggle();
    $(".header__mobnav").toggleClass("active");
    $(this).toggleClass("active");
  });
  // Mob nav end

  // QUiz
  $(".vetka-1").click(function(){
  	$(".sel-wrap-1").show().siblings().hide();
  	$(".lastbtn").attr("name", "sendForm1");
  });
  $(".vetka-2").click(function(){
  	$(".sel-wrap-2").show().siblings().hide();
  	$(".lastbtn").attr("name", "sendForm2");
  });
  $(".vetka-3").click(function(){
  	$(".sel-wrap-3").show().siblings().hide();
  	$(".lastbtn").attr("name", "sendForm3");
  });
  $(".vetka-4").click(function(){
  	$(".sel-wrap-4").show().siblings().hide();
  	$(".lastbtn").attr("name", "sendForm44");
  });
  // Quiz end

  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if (scroll > 100) {
        $(".header").addClass("scrolled");
    } else {
        $(".header").removeClass("scrolled");
    }
  });

  $(".service__tab").on('click', function(){
  	const thisId = $(this).attr('data-id');
  	$(this).addClass('active').siblings('.service__tab').removeClass('active');
  	$(".service__infoboxitem_"+thisId).addClass('active').siblings('.service__infoboxitem').removeClass('active')
  });

	// var $slickElement = $('.banner__box');
	var $slickElement2 = $('.banner__sliderbox');

	// $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
 //    var i = (currentSlide ? currentSlide : 0) + 1;
 //    $(".banner__number b").text(i);
 //    $(".banner__number span").text(slick.slideCount);
	// });

	// $slickElement.slick({
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	dots: false,
	// 	infinite: true,
	// 	arrows: true,
	// 	fade: true,
 //  	cssEase: 'linear',
	// 	prevArrow:"<button type='button' class='slick-prev pull-left'><img src='img/prev.svg'></button>",
 //    nextArrow:"<button type='button' class='slick-next pull-right'><img src='img/next.svg'></button>"
	// });

	// var banners = ['.banner__round_1', '.banner__round_2', '.banner__round_3'];
  // var currentIndex = 0;
  
  // function showNextBanner() {
  //     var currentBanner = banners[currentIndex];
  //     $(currentBanner).addClass('visible');
  //     setTimeout(function() {
  //         $(currentBanner).removeClass('visible');
  //         currentIndex = (currentIndex + 1) % banners.length;
  //         showNextBanner();
  //     }, 2000);
  // }
  
  // showNextBanner();

	// $slickElement2.slick({
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	dots: false,
	// 	infinite: true,
	// 	arrows: true,
	// 	fade: true,
  // 	cssEase: 'linear',
	// 	prevArrow:".pull-left",
  //   nextArrow:".pull-right"
	// });

	// Object block
	$(".object__tab").click(function(){
		$(".object__tabs").toggleClass("active");
		var currId = $(this).attr("data-id");
		$(this).addClass("active").siblings(".object__tab").removeClass("active");
		$(".object__slider_"+currId).addClass("active").siblings(".object__slider").removeClass("active");
		$(".object__slider_"+currId).slick({
  	slidesToScroll: 1,
  	slidesToShow: 1,
  	dots: false,
  	arrows: true,
  	nextArrow: $('.next'+currId),
  });
	});
	//Object block end


	var number = 0;
	var isValid;
	var $element = $(".quiz__item").find("input, select, textarea");
	var btnPrev = $(".quiz__back");
	var btnNext = $('.quiz__next');
	var activeSlede = [];

	var numberOfQuestion = $('.quiz__ques').length;
	$(".progress__amount").text(numberOfQuestion);
	var progBarStep = 100 / (+numberOfQuestion);
	var progBarStep = progBarStep.toFixed(0);

	$(".progress__line span").css({
		'width': progBarStep + '%'
	});

	for(var i = 0; i< numberOfQuestion; i++){
	  activeSlede[i] = false;
	}

	$element.on('change input', function (e) {
	  var value = $(this).val().trim();
	  isValid = value !== "";
	  btnActive(!isValid);
	  $(".text-subbtn").hide();
	});

	$(".quiz__textinput").keyup(function(){
		var value = $(this).val().trim();
		isValid = value !== "";
	  btnActive(!isValid);
	});

	function btnActive(isValid) {
	  if(number === 0){
	    btnPrev.prop('disabled', 'false');
	    btnNext.prop('disabled', isValid);
	  }else{
	    btnPrev.prop('disabled', false);
	    if(activeSlede[number] === true || isValid === false){
	      btnNext.prop('disabled', false);
	    }else{
	      btnNext.prop('disabled', true);
	    }
	  }
	}

	$(".quiz__next").click(function(){

		activeSlede[number] = true;
		++number;
		$(".progress__curr").text(number+1);
		$(".quiz__ques").fadeOut();
    $(".quiz__ques").eq(number).fadeIn(1000);
    btnActive(!isValid);
    if(activeSlede[number] === true){
      btnNext.prop('disabled', false);
    }else{
      btnNext.prop('disabled', true);
    }

    if(number > 0){
			$(".progress__line span").css({
				'width': (number+1)*progBarStep + '%'
			});
			$(".progress__label b").text((number)*progBarStep);
		}
		if(number > numberOfQuestion-2){
			$(".quiz__nav").hide();
		}

		var offsetTopVal = $(".quiz__main").offset().top;
		$('html, body').animate({scrollTop: offsetTopVal - 50},500);
	});

	var divMouseDown;

	$(".one__click input[type=radio]").not(".lastinp").on("change", function(){
		$(this).closest(".quiz__item").addClass("checked").siblings(".quiz__item").removeClass("checked");
		
		divMouseDown = setTimeout(function() {
	    $(".quiz__next").click();
	  }, 700);
	});

	$(".quiz__squarenext").click(function(){
		divMouseDown = setTimeout(function() {
	    $(".quiz__next").click();
	  }, 700);
	});

	$(".lastinp").on("change", function(){
		divMouseDown = setTimeout(function() {
	    $(".quiz__right, .quiz__main").fadeOut();
			$(".quiz__last").fadeIn(1000);
	  }, 700);
	});

	$(".lastques").on("click", function(){
		divMouseDown = setTimeout(function() {
	    $(".quiz__right, .quiz__main").fadeOut();
			$(".quiz__last").fadeIn(1000);
	  }, 700);
	});

	$(".quiz__socialel").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".messenger").val($(this).find("span").text());
	});

	$(".anchor").on("click", function(event) {
    event.preventDefault();
    var id = $(this).attr('href')
      , top = $(id).offset().top;
    $('body,html').animate({
        scrollTop: top - 70
    }, 1000);
    // scroll.scrollTo(id);

    $(".header__mobnav").toggleClass("active");

    $(".header__toggle").toggleClass("active");
  });

  // $('form').submit(function(e) {
  //   var $form = $(this);
  //   $.ajax({
  //     type: $form.attr('method'),
  //     url: $form.attr('action'),
  //     data: $form.serialize(),
  //     beforeSend: function() {
  //     	$(".preloaderr").show();
  //     },
  //   }).done(function() {
  //     location = 'thanks.html';
  //   }).fail(function() {
  //     console.log('fail');
  //   });
  //   e.preventDefault(); 
  // });

  $("#number-slider").slider({
      animate: "slow",
      range: "min", 
      min: 0,   
      value: 100,
      max: 1000,
      slide : function(event, ui) {    
        $("#send-result-polzunok").val(ui.value);
        $(".text-subbtn").hide();
      }
  });

  $("#send-result-polzunok").val($("#number-slider").slider("value"));

  var crdVal;
  $("#send-result-polzunok").on('keyup', function(event) {
    crdVal = $('#send-result-polzunok').val().trim();

    if(parseInt(crdVal) > 1000){
      $('#send-result-polzunok').val(1000);
    }

    if (this.value.match(/[^0-9]/g)) {
      this.value = this.value.replace(/[^0-9]/g, '');
    }
    $( "#number-slider" ).slider( "value", $(this).val() );
  });

  $("#send-result-polzunok").on("change , input", function(){
    if(crdVal === ''){
      $('#send-result-polzunok').val();
    }
  });

  $("#no").on('change input', function() {
    if($(this).prop('checked')){
      $( "#number-slider" ).slider( "value", 0 );
      $( "#number-slider" ).slider( "disable" );
      $("#send-result-polzunok").val("0").attr({'disabled':'disabled'});
    }else{
      $( "#number-slider" ).slider( "enable" );
      $("#send-result-polzunok").removeAttr('disabled');
    }
  });

  $( "#number-slider" ).slider({
    change: function( event, ui ) {
    btnNext.prop('disabled', false); }
  });

  var windWidth = $(window).width();

  if(windWidth > 767){
  	// Service block
		$(".service__item").click(function(){
			// var currId = $(this).attr("data-id");
			// $(this).addClass("active").siblings(".service__item").removeClass("active");
			// $(".service__right.active").addClass("front");
			// $(".service__right").removeClass("active");
			// $(".service__right_"+currId).addClass("back");
			// $(".service__right_"+currId).addClass("active");
		});
		//Service block end
  }

  if(windWidth < 768){

  	// $(".service__right").not(".service__right_2").hide();

  	// $(".service__item").removeClass("active");
  	// $(".service__right").hide();

  	$(".service__item").click(function(){
			// var currId = $(this).attr("data-id");
			//$(this).addClass("active").siblings(".service__item").removeClass("active");
			// $(this).toggleClass("active");
			// $(this).toggleClass("active");
			// $(".service__right.active").addClass("front");
			// $(".service__right").slideToggle("active");
			// $(".service__right_"+currId).addClass("back");
			// $(".service__right").toggleClass("active");
			// $(".service__right_"+currId).slideToggle();
		});

  	// $(".service__right_1").appendTo(".service__item_1");
  	// $(".service__right_2").appendTo(".service__item_2");
  	// $(".service__right_3").appendTo(".service__item_3");
  	// $(".service__right_4").appendTo(".service__item_4");
  	// $(".service__right_5").appendTo(".service__item_5");

  	// $(".service__btn img").each(function(){
  	// 	$(this).attr("src", "img/mob-more-white.png");
  	// });

  	$(".object__tabs").children().not(".active").hide();
  	$(".object__tabs").click(function(){
  		$(this).children().not(".active").slideToggle();
  	});

  	$(".object__title").each(function(){
  		var thisBox = $(this).siblings(".object__block").find(".object__number");
  		$(this).insertBefore(thisBox);
  	});

  	$(".object__btn").each(function(){
  		var thisClosest = $(this).siblings(".object__block").find(".object__text");
  		$(this).insertAfter(thisClosest);
  	});

  	$(".object__size").each(function(){
  		$(this).prependTo($(this).siblings(".object__mobslide"));
  	});

  	$(".creator__image").insertAfter(".creator .title");

  	$(".exper__sota").each(function(){
  		$(this).attr("src", "img/mob-sota-2.png");
  	});

  	$(".footer__soc").appendTo(".footer__box");
  	$(".footer__nav").appendTo(".footer__box");
  	$(".footer__rights").appendTo(".footer__box");

  	$(".footer__sota").each(function(){
  		$(this).attr("src", "img/mob-footer-sota.png");
  	});

  }

  if($('.object__slider_1').hasClass('active')){
  	$(".object__slider_1").slick({
	  	slidesToScroll: 1,
	  	slidesToShow: 1,
	  	dots: false,
	  	arrows: true,
	  	nextArrow: $('.next1'),
	  });
  } else{
  	$(".object__slider_2").slick({
	  	slidesToScroll: 1,
	  	slidesToShow: 1,
	  	dots: false,
	  	arrows: true,
	  	nextArrow: $('.next1'),
	  });
  }

	  

  // try {

	//   var wow = new WOW(
	//     {
	//       boxClass:     'wow',
	//       animateClass: 'animated',
	//       offset:       100,
	//       mobile:       true,
	//       live:         true,
	//       callback: function(box) {
	//         var $box = $(box);
	//         $box.on('animationend webkitAnimationEnd oAnimationEnd', function () {
	//             $(this).css({
	//               'opacity': '1'
	//             });
	//         });    
	//       },
	//       scrollContainer: null,
	//       resetAnimation: true,
	//     }
	//   );
	//   wow.init();

	// } catch (err) {

	//   console.log("Go next!");

	// }

	// try {

	// 	if($(".locoyes").hasClass("active")){
	// 		var scroll = new LocomotiveScroll({
	// 	    el: document.querySelector('[data-scroll-container]'),
	// 	    smooth: true,
	// 	    multiplier: 0.4,
	// 		});
	// 	}

	// } catch (err) {

	//   console.log("Go next!");

	// }


});

// window.addEventListener('load',function(){
//   document.querySelector('body').classList.add("loaded")  
// });