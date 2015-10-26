$(document).ready(function(){

	for(var i =0; i< 25; i++){
		var rand = Math.floor(Math.random() * 8 + 1);
		$('.mg_tile-' + rand ).appendTo($('.mg_contents'))
	}

	var numClicks = 0;

    $('.mg_tile').click(function(){

    	// Determines if there are two unmatched cards showing
    	// 		if so hide them
    	unmatchedVisibleTiles = $('.mg_tile-inside:visible.unmatched')
        if(unmatchedVisibleTiles.length == 2){
            unmatchedVisibleTiles.hide();
            numClicks +=2;
        }

        //Displays tile clicked on
    	$(this).find('.mg_tile-inside').show();
        
        var visibleTiles = $('.mg_tile-inside:visible');
        var unmatchedVisibleTiles = $('.mg_tile-inside:visible.unmatched')

 		// Checks for match 
        if(unmatchedVisibleTiles.length == 2){
        	var lastImgSrc = '';
        	var lastTile;
        	unmatchedVisibleTiles.each(function(){
        		if(lastImgSrc == $(this).find('img').attr('src')){
        			lastTile.removeClass('unmatched')
        			$(this).removeClass('unmatched')
        			lastTile.addClass('matched')
        			$(this).addClass('matched')
        			numClicks+=2;
        		}
        		lastTile = $(this);
        		lastImgSrc = $(this).find('img').attr('src')
        	});
        }
        
        if($('.unmatched').length == 0){
        	alert('You Won! (In ' + numClicks + ' clicks!)');
        }
    });
});