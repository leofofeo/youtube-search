//JS and jQuery for RQ
$('document').ready(function(){
	console.log('document ready');

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
	}

});


$('#search-form').submit(function(e){
	e.preventDefault();
	searchYouTube();
});


var searchYouTube = function(){
	$('#results').html('');
	$('#buttons').html('');
	var query = $('#query').val();

	$.get(
		'https://www.googleapis.com/youtube/v3/search', {
		part: 'snippet, id',
		q: query,
		type: 'video',
		key: 'AIzaSyB-WogP-SMI3M6WKTijzpWmpRvZAbWg6Xg'},
		function(data){
			console.log('from internal get()');
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;
			console.log(data);

		}
	);
}