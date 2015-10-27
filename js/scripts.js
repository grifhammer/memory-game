$(document).ready(function(){

    var howManyPerRow = 4;
    var howManyPerCol = 1;
    var inputGameSize = prompt('Enter number of cards to play with.\nMust be greater than 3 and less than 29.');
    if(inputGameSize < 29 && inputGameSize > 3 ){
        howManyPerCol = calcNumPerCol(inputGameSize,howManyPerRow);
    } else {
        while(!(inputGameSize < 29 && inputGameSize > 3)){
            inputGameSize = prompt('enter a valid game size >3 & <29');
        }
        howManyPerCol = calcNumPerCol(inputGameSize, howManyPerRow);
    }

  
	var gridSize = inputGameSize;
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
            pic: 'img/default/monsters-'+x+'.png',
            makeHTML: function(){
                var html = '<div class ="mg_tile mg_tile-' + this.tile + '">';
                html += '<div class="mg_tile-inner unmatched">';
                html += '<div class="mg_tile-outside"></div>';
                html += '<div class="mg_tile-inside" card="'+this.cardValue+'" id="mg-tile-'+this.tile+'">';
                html += '<img src="' + this.pic +'"></div>';
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

	for(i = 0; i<gridSize; i++){
		var html = cards[i].makeHTML()
        $(html).appendTo($('.mg_contents'));
    }

    $('.mg_tile').css('height', ((1/howManyPerCol)*100)+'%')
    $('.mg_tile').css('width', ((1/howManyPerRow)*100)+'%')


	var numClicks = 0;

    $('.mg_tile').click(function(){

    	// Determines if there are two unmatched cards showing
    	// 		if so hide them
    	unmatchedFlippedTiles = $('.mg_tile-inner.unmatched.flipped')
        if(unmatchedFlippedTiles.length == 2){
            unmatchedFlippedTiles.removeClass('flipped');
            numClicks += 2;
        }

        //Displays tile clicked on
    	$(this).find('.mg_tile-inner').addClass('flipped');
        
        var flippedTiles = $('.mg_tile-inner.flipped');
        var unmatchedFlippedTiles = $('.mg_tile-inner.unmatched.flipped')

 		// Checks for match 
        if(unmatchedFlippedTiles.length == 2){
            var cardVals = [];
            $(unmatchedFlippedTiles.find('.mg_tile-inside')).each(function(){
                cardVals.push($(this).attr('card'));
            });
            if(cardVals[0] == cardVals[1]){
                $('.mg_tile-inner.flipped.unmatched').addClass('match')
                $('.mg_tile-inner.flipped').removeClass('unmatched')
                numClicks+=2;
            }
            if($('.unmatched').length == 0){
                alert('You Won! (In ' + numClicks + ' clicks!)\nMost required should be '+Math.floor(gridSize*5/3)+'.');
            }
        }
        
        
    });
});

function calcNumPerCol(gameSize,howManyPerRow){
    var howManyPerCol = 0;
    if(gameSize%howManyPerRow){
        howManyPerCol+=1;
    }
    howManyPerCol += Math.floor(gameSize / howManyPerRow);
    return howManyPerCol;
}