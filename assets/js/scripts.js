$(document).ready(function(){
	/*============================================
	Page Preloader
	==============================================*/
	
	$(window).load(function(){
		$('#page-loader').fadeOut(500,function(){
			loadGmap();
		});
	});	
	
	/*============================================
	Navigation Functions
	==============================================*/
	if ($(window).scrollTop()< 10){
		$('#main-nav').removeClass('scrolled');
	}
	else{
		$('#main-nav').addClass('scrolled');    
	}

	$(window).scroll(function(){
		if ($(window).scrollTop()< 10){
			$('#main-nav').removeClass('scrolled');
		}
		else{
			$('#main-nav').addClass('scrolled');    
		}
	});
	
	$('a.scrollto').click(function(e){
		e.preventDefault();
		var target =$(this).attr('href');
		$('html, body').stop().animate({scrollTop: $(target).offset().top}, 1600, 'easeInOutExpo',
			function(){window.location.hash =target;});
			
		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
	});
	
	/*============================================
	Tabs
	==============================================*/	
	
	$('.toggle-tabs').click(function(e){
		e.preventDefault()
		
		if($(this).is('.active')){return;}
		$(this).tab('show');
		
		$(this).siblings('.toggle-tabs').removeClass('active');
		$(this).addClass('active');
	})
	
	$('.toggle-tabs').on('shown.bs.tab', function (e) {
	  $('.tab-content').addClass('fadeOut');
	  
	  setTimeout(function(){
		$('.tab-content').removeClass('fadeOut');
	  },200)
	})
	
	/*============================================
	Skills
	==============================================*/	
	$('#skills').waypoint(function(){
		$('.chart').each(function(){
		$(this).easyPieChart({
				size:200,
				animate: 2000,
				lineCap:'butt',
				scaleColor: false,
				trackColor: 'transparent',
				barColor: $('.main-color').css('color'),
				lineWidth: 5,
				easing:'easeOutQuad'
			});
		});
	},{offset:'80%'});
	/*============================================
	Filter gallery
	==============================================*/
	
	$('.gallery-count').each(function(){
	
		var filter = $(this).parent('.btn').attr('data-filter');
		$(this).text($('.gallery-item'+filter).length);
	
	});
	
	$('#filter-works .btn').click(function(e){
		e.preventDefault();
		
		$('#filter-works .btn').removeClass('active');
		$(this).addClass('active');

		var category = $(this).attr('data-filter');

		$('.gallery-item').addClass('filtered');
		$('.gallery-item').each(function(){
			if($(this).is(category)){
				$(this).removeClass('filtered');
			}
		});
			
		$('#gallery-container').addClass('anim-out');
			
		setTimeout(function(){
			$('.gallery-item').show();
			$('.gallery-item.filtered').hide();
			$('#gallery-container').removeClass('anim-out');
		},450);
		
		scrollSpyRefresh();
		waypointsRefresh();
	});
	
	/*============================================
	gallery Viewer
	==============================================*/
	
	$('#gallery-viewer').addClass('add-slider');
	
	$('.gallery-item').click(function(e){
	
		e.preventDefault();
		
		loadgallery($(this));
	
		$('#gallery-viewer').modal({backdrop:false});

		
	})
	
	/*Prevent Navbar movement*/
	$('#gallery-viewer').on('show.bs.modal',function(){
		$('#main-nav').width($('#main-nav').width());
		
	});
	
	$('#gallery-viewer').on('hidden.bs.modal',function(){
		$('#main-nav').width('auto');
	});
	
	
	/*gallery navigation*/
	$('.gallery-nav .next-gallery').click(function(){
		var $newgallery = $('.gallery-item.active').next('.gallery-item');
		$('#gallery-viewer .container').fadeOut(500,function(){loadgallery($newgallery);});
	});
	
	$('.gallery-nav .previous-gallery').click(function(){
		var $newgallery = $('.gallery-item.active').prev('.gallery-item');
		$('#gallery-viewer .container').fadeOut(500,function(){loadgallery($newgallery);});
	});
	
	function loadgallery($gallery){
	
		$('.gallery-item').removeClass('active');
		$gallery.addClass('active');
		
		var galleryLink = $gallery.attr('href').replace(/[#?]/g, '');
		
		window.location.hash = '?'+galleryLink;
		
		$('#gallery-viewer-content').load(galleryLink,function(){
			$('#gallery-viewer .container').fadeIn(500);
			afterLoadFn();
		});
		
	}
	
	function afterLoadFn(){
	
		$('#gallery-viewer').scrollTop(0);
		
		/*Show-Hide Nav butttons*/
		if($('.gallery-item.active').index()==0){$('#gallery-viewer .previous-gallery').addClass('hidden');}
		else{$('#gallery-viewer .previous-gallery').removeClass('hidden');}
	
		if($('.gallery-item.active').index()== ($('.gallery-item').length -1)){$('#gallery-viewer .next-gallery').addClass('hidden');}
		else{$('#gallery-viewer .next-gallery').removeClass('hidden');}
	
		$('.gallery-slider').flexslider({
			animation:'slide',
			slideshowSpeed: 4000,
			useCSS: true,
			directionNav: false, 
			pauseOnAction: false, 
			pauseOnHover: true,
			smoothHeight: false
		});
		
		//
		// Videos not used yet
		//
		//$('.video-container').fitVids();
	}
	
	/*Close gallery Modal*/
	
	$('#gallery-viewer').on('hidden.bs.modal',function(){
		$('#gallery-viewer-content').empty();
		$('#gallery-viewer .container').fadeOut();
	});
	
	$('#gallery-viewer').on('hide.bs.modal',function(){
		window.location.hash = 'portfolio';
	});
	
	/*Open gallery by url*/
	var reg = /^[#]+[?]/;

	if(reg.test(window.location.hash)){
		var $gallery = $('.gallery-item[href="'+window.location.hash+'"]');
		$gallery.trigger('click');
	}
	
	/*============================================
	Tweets
	==============================================*/
	$('#twitter-slider').flexslider({
		slideshowSpeed: 5000,
		useCSS: true,
		directionNav: false, 
		pauseOnAction: false, 
		pauseOnHover: true,
		smoothHeight: false
	});
	
	/*============================================
	Twitter
	==============================================
	var maxTweets = $('#twitter-slider').data('max-tweets'),
		widgetID = $('#twitter-slider').data('widget-id');
	
	twitterFetcher.fetch(widgetID, 'twitter-slider', maxTweets, true, false, true, '', false, handleTweets, false);

	function handleTweets(tweets){
	
		var x = tweets.length,
			n = 0,
			tweetsHtml = '<ul class="slides">';
			
		while(n < x) {
			tweetsHtml += '<li>' + tweets[n] + '</li>';
			n++;
		}
		
		tweetsHtml += '</ul>';
		$('#twitter-slider').html(tweetsHtml);
	
		$('#twitter-slider').flexslider({
			slideshowSpeed: 5000,
			useCSS: true,
			directionNav: false, 
			pauseOnAction: false, 
			pauseOnHover: true,
			smoothHeight: false
		});
	}
	*/

	/*============================================
	Testimonials
	==============================================*/
	$('#testimonials-slider').flexslider({
		slideshow: false,
		animationSpeed: 0,
		useCSS: true,
		directionNav: false, 
		controlNav: false, 
		pauseOnAction: false, 
		pauseOnHover: true,
		smoothHeight: false
	});
	
	$('.testimonial-controls .previous').click(function(){
		$('#testimonials-slider').flexslider('previous');
	});
	
	$('.testimonial-controls .next').click(function(){
		$('#testimonials-slider').flexslider('next');
	});

	/*============================================
	Map
	==============================================*/
	function loadGmap(){
	
		if($('#gmap').length){
		
			var map;
			var mapstyles = [ { "stylers": [ { "saturation": -100 } ] } ];
			
			var infoWindow = new google.maps.InfoWindow;
			
			var mapLatLng = new google.maps.LatLng(mapPos.lat, mapPos.lng);

			var mapOptions = {
				zoom: mapPoint.zoom,
				center: mapLatLng,
				zoomControl : true,
				panControl : false,
				streetViewControl : false,
				mapTypeControl: false,
				overviewMapControl: false,
				scrollwheel: false,
				styles: mapstyles
			}
			
			map = new google.maps.Map(document.getElementById("gmap"), mapOptions);
			

			var markerLatLng = new google.maps.LatLng(mapPoint.lat, mapPoint.lng);

			var marker = new google.maps.Marker({
				position: markerLatLng, 
				map: map, 
				title:mapPoint.linkText,
				icon: mapPoint.icon
			});
			
			var mapLink = 'https://www.google.com/maps/preview?ll='+mapPoint.lat+','+mapPoint.lng+'&z=14&q='+mapPoint.mapAddress;

			var html = '<div class="infowin">'
					+ mapPoint.infoText
					+ '<a href="'+mapLink+'" target="_blank">'+mapPoint.linkText+'</a>'
					+ '</div>';

			google.maps.event.addListener(marker, 'mouseover', function() {
				infoWindow.setContent(html);
				infoWindow.open(map, marker);
			});

			google.maps.event.addListener(marker, 'click', function() {
				window.open(mapLink,'_blank');
			});
			
		}
	}
	
	/*============================================
	Placeholder Detection
	==============================================*/
	if (!Modernizr.input.placeholder) {
		$('#contact-form').addClass('no-placeholder');
	}
	
	/*============================================
	Tooltips
	==============================================*/
	$("[data-toggle='tooltip']").tooltip({container: 'body'});
	
	/*============================================
	Waypoints Animations
	==============================================*/
	$(window).load(function(){
		
		$('.scrollimation').waypoint(function(){
			$(this).addClass('in');
		},{offset:'95%'});
		
	});
	
	/*============================================
	Refresh scrollSpy function
	==============================================*/
	function scrollSpyRefresh(){
		setTimeout(function(){
			$('body').scrollspy('refresh');
		},1000);
	}
	
	/*============================================
	Refresh waypoints function
	==============================================*/
	function waypointsRefresh(){
		setTimeout(function(){
			$.waypoints('refresh');
		},1000);
	}
});