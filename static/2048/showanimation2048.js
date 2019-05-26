


function showNumberWithAnimation( i , j , randNumber ){

    var numberCell = $('#number-cell-' + i + "-" + j );

    numberCell.css('background-color',getNumberBackgroundColor( randNumber ) );
    numberCell.css('color',getNumberColor( randNumber ) );
    numberCell.text( getNumberText( randNumber ) );
    if(this.isAutoStyle==true){
        numberCell.css('font-size',0.2*cellSideLength );
    }else{
        numberCell.css('font-size',0.4*cellSideLength );
    }
    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top:getPosTop( i , j ),
        left:getPosLeft( i , j )
    },200);
}

function showMoveAnimation( fromx , fromy , tox, toy ){

    var numberCell = $('#number-cell-' + fromx + '-' + fromy );
    numberCell.animate({
        top:getPosTop( tox , toy ),
        left:getPosLeft( tox , toy )
    },200);
}

function updateScore( score ){
    $('#score').text( score );
}
