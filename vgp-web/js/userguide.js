$(function () {
	$('#goToTop').stop(true, true).fadeOut();

	$('div.command-list a').on('click', function () {
		$('div.command-list a').removeClass('active');
		$(this).addClass('active');
		var scrolToElementId = $(this).data('scrollto');

		$("#" + scrolToElementId) && $('html, body').animate({
			scrollTop: $("#" + scrolToElementId).offset().top
		}, 2000);
	});

	$('#goToTop').on('click', function () {
		$('html, body').animate({
			scrollTop: $('body').offset().top
		}, 2000);
	});

	$(window).scroll(function () {
		if ($(this).scrollTop()) {
			$('#goToTop:hidden').stop(true, true).fadeIn();
		} else {
			$('#goToTop').stop(true, true).fadeOut();
		}
	});
});

