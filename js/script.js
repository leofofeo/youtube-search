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
			displayData(data);

		}
	);
}

var displayData = function(youtubeData){
	$.each(youtubeData.items, function(i, item){
		var parsedResult = parseData(item);

		$('#results').append(parsedResult);
	});
}


var parseData = function(youtubeDataItem){
	var channelId = youtubeDataItem.snippet['channelId'];
	var channelTitle = youtubeDataItem.snippet['channelTitle'];
	var videoId = youtubeDataItem.snippet['videoId'];
	var videoTitle = youtubeDataItem.snippet['title'];	
	var videoDescription = youtubeDataItem.snippet['description'];
	var thumbnail = youtubeDataItem.snippet.thumbnails.high['url'];
	var videoDate = youtubeDataItem.snippet['publishedAt'];


	var html = '<li>' +
	'<div class="list-left">' +
	'<img src="' + thumbnail + '">' +
	'</div>' +
	'<div class="list-right">' +
	'<h3>' + videoTitle + '</h3>' +
	'<small>By <span class="channel-title">'+ channelTitle+' </span>on '+ videoDate+'</small>' +
	'<p>'+ videoDescription+' </p>' +
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>' + '';
	return html;
}