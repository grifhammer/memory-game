$(document).ready(function(){

	for(var i =0; i< 20; i++){
		var rand = Math.floor(Math.random() * 8 + 1);
		$('.mg_tile-' + rand ).appendTo($('.mg_contents'))
	}

	var numMoves = 0;

    $('.mg_tile').click(function(){


    	unmatchedVisibleTiles = $('.mg_tile-inside:visible.unmatched')
        if(unmatchedVisibleTiles.length == 2){
            unmatchedVisibleTiles.hide();
            numMoves +=2;
        }
    	$(this).find('.mg_tile-inside').show();
        
        var visibleTiles = $('.mg_tile-inside:visible');
        //needs to be changed to not hide matched 
        var unmatchedVisibleTiles = $('.mg_tile-inside:visible.unmatched')
        if(unmatchedVisibleTiles.length == 2){
        	var lastImgSrc = '';
        	var lastTile;
        	unmatchedVisibleTiles.each(function(){
        		if(lastImgSrc == $(this).find('img').attr('src')){
        			lastTile.removeClass('unmatched')
        			$(this).removeClass('unmatched')
        			lastTile.addClass('matched')
        			$(this).addClass('matched')
        			numMoves+=2;
        		}
        		lastTile = $(this);
        		lastImgSrc = $(this).find('img').attr('src')
        	});
        }
        
        if($('.unmatched').length == 0){
        	alert('You Won! (In ' + numMoves + ' moves!)');
        }
    });
});