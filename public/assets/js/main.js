/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch mode.
	if (browser.mobile)
		$body.addClass('is-touch');

	// Scrolly links.
	$('.scrolly').scrolly({
		speed: 2000
	});

	// Dropdowns.
	$('#nav > ul').dropotron({
		alignment: 'right',
		hideDelay: 350
	});

	// Nav.

	// Title Bar.
	$(
			'<div id="titleBar">' +
			'<a href="#navPanel" class="toggle"></a>' +
			'<span class="title">' + $('#logo').html() + $('#site-title').html() + '</span>' +
			'</div>'
		)
		.appendTo($body);

	// Panel.
	$(
			'<div id="navPanel">' +
			'<nav>' +
			$('#nav').navList() +
			'</nav>' +
			'</div>'
		)
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'left',
			target: $body,
			visibleClass: 'navPanel-visible'
		});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
	if (browser.name == 'ie' ||
		browser.mobile) {

		$.fn._parallax = function () {

			return $(this);

		};

	} else {

		$.fn._parallax = function () {

			$(this).each(function () {

				var $this = $(this),
					on, off;

				on = function () {

					$this
						.css('background-position', 'center 0px');

					$window
						.on('scroll._parallax', function () {

							var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

							$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

						});

				};

				off = function () {

					$this
						.css('background-position', '');

					$window
						.off('scroll._parallax');

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

			return $(this);

		};

		$window
			.on('load resize', function () {
				$window.trigger('scroll');
			});

	}

	// Spotlights.
	var $spotlights = $('.spotlight');

	$spotlights
		._parallax()
		.each(function () {

			var $this = $(this),
				on, off;

			on = function () {

				var top, bottom, mode;

				// Use main <img>'s src as this spotlight's background.
				$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

				// Side-specific scrollex tweaks.
				if ($this.hasClass('top')) {

					mode = 'top';
					top = '-20%';
					bottom = 0;

				} else if ($this.hasClass('bottom')) {

					mode = 'bottom-only';
					top = 0;
					bottom = '20%';

				} else {

					mode = 'middle';
					top = 0;
					bottom = 0;

				}

				// Add scrollex.
				$this.scrollex({
					mode: mode,
					top: top,
					bottom: bottom,
					initialize: function (t) {
						$this.addClass('inactive');
					},
					terminate: function (t) {
						$this.removeClass('inactive');
					},
					enter: function (t) {
						$this.removeClass('inactive');
					},

					// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

					//leave:	function(t) { $this.addClass('inactive'); },

				});

			};

			off = function () {

				// Clear spotlight's background.
				$this.css('background-image', '');

				// Remove scrollex.
				$this.unscrollex();

			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

	// Wrappers.
	var $wrappers = $('.wrapper');

	$wrappers
		.each(function () {

			var $this = $(this),
				on, off;

			on = function () {

				$this.scrollex({
					top: 250,
					bottom: 0,
					initialize: function (t) {
						$this.addClass('inactive');
					},
					terminate: function (t) {
						$this.removeClass('inactive');
					},
					enter: function (t) {
						$this.removeClass('inactive');
					},

					// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

					//leave:	function(t) { $this.addClass('inactive'); },

				});

			};

			off = function () {
				$this.unscrollex();
			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

	// Banner.
	var $banner = $('#banner');

	$banner
		._parallax();
		$("#a-search").click(function(ev){
			ev.preventDefault();
			$("input[name=search]").focus();
		});
})(jQuery);

function sticky_relocate() {
	var viewportWidth = $(window).width();
	var as = 0;
	as = $(".left-side-bar").find("a").length;
	if (viewportWidth > 1024 && as > 0) {
		var window_top = $(window).scrollTop();
		var footer_top = $("#footer").offset().top;
		var div_top = $('#sticky-anchor').offset().top;
		var div_height = $(".left-side-bar").height();
		var padding = 20; // tweak here or get from margins etc
		if (window_top + div_height > footer_top - padding) {
			$('.left-side-bar').css({
				top: '-70px'
			})
		} else if (window_top > div_top) {
			$('.left-side-bar').addClass('stick');
			$('.left-side-bar').css({
				top: '62px'
			});
			$(".post-content").addClass("off-3");
		} else {
			$('.left-side-bar').css({
				top: '0'
			});
			$('.left-side-bar').removeClass('stick');
			$(".post-content").removeClass("off-3");
		}
	}
}
function paginacion(pageTotal, items, limit, pageCurrent, paginationElement) {
	items.each(function () {
		$(this).hide()
	});
	var pagination ="";
	paginationElement.html("");
	pageCurrent = parseInt(pageCurrent.substr(5,pageCurrent.length));
	if (pageCurrent == 1) {
		var prev = '<li><i class="fas fa-angle-left" style="padding:0 0.5rem;"></i></li>';
		var first = '<li><i class="fas fa-angle-double-left" style="padding:0 0.5rem;"></i></li>';
		var next = '<li><a href="#page' + (pageCurrent + 1) + '"><i class="fas fa-angle-right" style="padding: 0 0.5rem;"></i></a></li>';
		var last = '<li><a href="#page' + pageTotal.toString() + '"><i class="fas fa-angle-double-right" style="padding: 0 0.5rem;"></i></a></li>';

	} else if (pageCurrent == pageTotal) {
		var prev = '<li><a href="#page' + (pageCurrent - 1) + '"><i class="fas fa-angle-left" style="padding:0 0.5rem;"></i></a></li>';
		var next = '<li><i class="fas fa-angle-right" style="padding:0 0.5rem;"></i></li>';
		var last = '<li><i class="fas fa-angle-double-right" style="padding:0 0.5rem;"></i></li>';
		var first = '<li><a href="#page1"><i class="fas fa-angle-double-left" style="padding:0 0.5rem;"></i></a></li>';
	} else {
		var prev = '<li><a href="#page' + (pageCurrent - 1) + '"><i class="fas fa-angle-left" style="padding:0 0.5rem;"></i></a></li>';
		var next = '<li><a href="#page' + (pageCurrent + 1) + '"><i class="fas fa-angle-right" style="padding:0 0.5rem;"></i></a></li>';
		var first = '<li><a href="#page1"><i class="fas fa-angle-double-left" style="padding:0 0.5rem;"></i></a></li>';
		var last = '<li><a href="#page' + pageTotal.toString() + '"><i class="fas fa-angle-double-right" style="padding:0 0.5rem;"></i></a></li>';
	}
	pagination = first + prev;
	var firstPage = 0;
	for (i = firstPage + 1; i <= pageTotal; i++) {
		var margin = 'style="margin-left: 0.5rem;"'
		if (i > firstPage + limit) {
			break;
		}
		if (i == 1) {
			margin = ''
		}
		// If you are on the current page, do not link
		if (i == pageCurrent) {
			pagination = pagination + '<li class="active cyan darken-2 grey-text text-lighten-5" ' + margin + '>' + i + '</li>';
		} else {
			// Otherwise, add a link to the page
			pagination = pagination + '<li class="waves-effect grey lighten-5 cyan-text text-darken-2" ' + margin + '><a href="#page' + i + '">' + i + '</a></li>';
		}
	}
	pagination = pagination + next + last;
	paginationElement.append(pagination);
	$(".page"+pageCurrent).show();
	$("#pagination-list > li > a").click(function(ev){
		ev.preventDefault;
	});
}

function scrollspyile(menu) {
	var lastId,
		menu = $(".left-side-bar"),
		offset_header = $("#header").height(),
		wrapper_padding = parseInt($(".wrapper").css('padding-top'));
	// All list items
	menuItems = menu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function () {
			var item = $($(this).attr("href"));
			if (item.length) {
				return item;
			}
		});
	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function (e) {
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top;
		$('html, body').animate({
			scrollTop: offsetTop - offset_header
		}, 300);
		e.preventDefault();

	});

	// Bind to scroll
	$(window).scroll(function () {
		// Get container scroll position
		var fromTop = $(this).scrollTop();
		// Get id of current scroll item
		var cur = scrollItems[0];
		cur = scrollItems.map(function () {
			if ($(this).offset().top < (fromTop + 85))
				return this;
		});
		// Get the id of the current element
		cur = cur[cur.length - 1];

		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
				.parent().removeClass("active")
				.end().filter("[href='#" + id + "']").parent().addClass("active");
		}

	});
	
}
function fill_sidebar($postContent){
	$postContent.find("h2").each(function (index, el) {
		$("<li><a href='#" + el.id + "'>" + el.innerHTML + "</a></li>").appendTo(".left-side-bar>ul");
	});
}