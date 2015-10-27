$(document).ready(function(){

    var howManyPerRowCol = 4;
	var gridSize = howManyPerRowCol * howManyPerRowCol;
	var cards = [];

    var x = 0;
	for(i = 1; i <= gridSize; i++){
		if((i%2)){
            cardValue = x;
            x++;
        }

        var theObject = {
            tile: i,
            cardValue: cardValue,
            pic: 'img/default/monsters-0'+x+'.png'
            makeHTML: function(){
                var html = '<div class ="mg_tile mg_tile-' + tile + '">';
                html += '<div class="mg_tile-inner">';
                html += '<div class="mg_tile-outside"></div>';
                html += '<div class="mg_tile-inside unmatched" card="'+cardValue+'" id="mg-tile-'+tile+'">';
                html += '<img src="' + pic +'"></div>';
                html += '</div></div>';
                return html;
            }
        };

        cards.push(theObject);
	}

	for(var i =0; i < gridSize*4; i++){
		var rand = Math.floor(Math.random() * gridSize);
		var rand2 = Math.floor(Math.random() * gridSize);
		var temp = cards[rand];
		cards[rand] = cards[rand2];
		cards[rand2] = temp;
	}

	console.log(cards);

	for(i = 1; i<=gridSize; i++){
		var html = '<div class="mg_tile mg_tile-'+ cards[i].tile +'"><div class="mg_tile-inner"><div class="mg_tile-outside"></div><div class="mg_tile-inside unmatched" card="'+cards[i].tile+'" id="mg-tile-'+cards[i].tile+'"><img src="'+cards[i].pic+'"></div></div></div>'
		$(html).appendTo('.mg_contents')
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