//JS and jQuery for RQ
$('document').ready(function(){


});


$('#query').on('focus', function(){
	$(this).animate({
		width: '100%'
		
	}, 800);
	$('#search-btn').animate({
		right:'10px'
	}, 800);
});

$('#query').on('blur', function(){
	if($('#query').val() == ''){
		$('#query').animate({
			width:'45%'
		}, 800, function(){});
		// $('#search-btn').animate({
		// 	right: '360px'
		// }, 400, function(){});
	}

});