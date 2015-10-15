function toggle(theElement){
    var theElement = document.getElementById(theElement);
    
    //Show the element or hide it
    // if ( theElement.style.display != 'block' ) {
    //     theElement.style.display = 'block';
    // }else{
    //     theElement.style.display = 'none';
    // }

    //Hide all elements, then show the one we clicked on
    var elementsToHide = document.getElementsByClassName('mg_tile-inside');
    for(i=0; i<elementsToHide.length; i++){
        elementsToHide[i].style.display = 'none';
    }

    //Show the element or hide it
        theElement.style.display = 'block';


}