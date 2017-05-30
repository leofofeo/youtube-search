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

				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				displayData(data);

				var buttons = getButtons(prevPageToken, nextPageToken, query);
				$('#results').append(buttons);
				var nextBtn = document.getElementById('next-btn');
				var prevBtn = document.getElementById('prev-btn');
				nextBtn.addEventListener('click', function(){
					$(nextBtn).on('click', determinePagination($(nextBtn).attr('id')));	
				});

				if(prevBtn){
					prevBtn.addEventListener('click', function(){
						$(prevBtn).on('click', determinePagination($(prevBtn).attr('id')));	
					});	
				}
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

var getButtons = function(prevPageToken, nextPageToken, query){
	if(!prevPageToken){
		var btnOutput = '<div class="btn-container">' +
		'<button id="next-btn" class="pagination-btn btn btn-default" data-token="' + nextPageToken + '" data-query="'+ query +'">' +
		'Next Page </button></div>';
	} else {
		var btnOutput = '<div class="btn-container">' +
		'<button id="prev-btn" class="pagination-btn btn btn-default" data-token="' + prevPageToken + '" data-query="'+ query +'">' +
		'Previous Page </button>' + 
		'<button id="next-btn" class="pagination-btn btn btn-default" data-token="' + nextPageToken + '" data-query="'+ query +'">' +
		'Next Page </button></div>';
	}

	return btnOutput;
}


var nextPage = function(){
	alert('next page!');
}

var previousPage = function(){}


var determinePagination =  function(btnId){
	if(btnId === 'next-btn'){
		nextPage();
	} else {
		previousPage();
	}
}