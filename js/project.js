$(document).ready(function(){
	$('.header-layout').hide().fadeIn(1000);
	$('.project-content').hide().fadeIn(1500);

	$('#back').on('click', function(){
		$('body').fadeOut(1000, function(){
			window.location.href = 'index.html';
		});
	});
});