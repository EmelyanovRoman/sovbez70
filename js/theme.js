"use strict"

// class for check sliders change 
class ClassWatcher {

	constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
		this.targetNode = targetNode
		this.classToWatch = classToWatch
		this.classAddedCallback = classAddedCallback
		this.classRemovedCallback = classRemovedCallback
		this.observer = null
		this.lastClassState = targetNode.classList.contains(this.classToWatch)

		this.init()
	}

	init() {
		this.observer = new MutationObserver(this.mutationCallback)
		this.observe()
	}

	observe() {
		this.observer.observe(this.targetNode, { attributes: true })
	}

	disconnect() {
		this.observer.disconnect()
	}

	mutationCallback = mutationsList => {
		for (let mutation of mutationsList) {
			if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
				let currentClassState = mutation.target.classList.contains(this.classToWatch)
				if (this.lastClassState !== currentClassState) {
					this.lastClassState = currentClassState
					if (currentClassState) {
						this.classAddedCallback()
					}
					else {
						this.classRemovedCallback()
					}
				}
			}
		}
	}
};

function resize() {
	var win = $(window).width();
	$(window).on('resize', function () {
		var win = $(this);
		if (win.width() > 990) $('.modal .row').addClass('valign-wrapper')
		else $('.modal .row').removeClass('valign-wrapper')
	});
};

// Animation slider, check active class

function scaleSlider() {
	let order = true;

	function workOnClassAdd() {
		if (order) {
			$('ul.slides li.active .opacity').addClass('scale-slider');
			order = false;
		} else {
			$('ul.slides li .opacity.scale-slider').removeClass('scale-slider');
			order = true;
		}
	}

	function workOnClassRemoval() {
		if (!order) {
			$('ul.slides li .opacity.scale-slider').removeClass('scale-slider');
			order = true;
		} else {
			$('ul.slides li.active .opacity').addClass('scale-slider');
			order = false;
		}
	}

	let ul = document.getElementById('slides');
	let slides = ul.getElementsByTagName('li');
	let classWatchers = [];

	for (let i = 0; i < slides.length; i++) {
		classWatchers.push(new ClassWatcher(slides[i], 'active', workOnClassAdd, workOnClassRemoval));
	};
};

// Sticky header 

function stickyHeader() {
	if ($('.theme-main-header').length) {
		var sticky = $('.theme-main-header'),
			nav_margin = $('.theme-main-menu.navbar'),
			scroll = $(window).scrollTop();

		if (scroll >= 100) {
			sticky.addClass('fixed');
			nav_margin.addClass('fixed');
		}
		else {
			sticky.removeClass('fixed');
			nav_margin.removeClass('fixed');
		}

	};
}

function smoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
}


$(document).ready(function () {
	smoothScroll();
	resize();
	scaleSlider();
	$('.slider').slider({
		fullscreen: true,
		indicator: true,
		interval: 22000,
	}).height(700);
	$('.modal').modal();
	$('.sidenav').sidenav();
	$('.parallax').parallax();
});

