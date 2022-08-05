"use strict"; 
var gamePiece ,notify,timer,spaceY,spaceX;
 window.onload = function ()

{
	var puzzleArea = document.getElementById('puzzlearea');
	gamePiece = puzzleArea.getElementsByTagName('div'); 

	for (var i=0; i<gamePiece.length; i++) 

	{
		gamePiece[i].className = 'puzzlepiece'; 
		gamePiece[i].style.left = (i%4*100)+'px';
		gamePiece[i].style.top = (parseInt(i/4)*100) + 'px'; 
		gamePiece[i].style.backgroundPosition= "-"+ gamePiece[i].style.left + ' ' 
        + '-' + gamePiece[i].style.top + ' '; 

		gamePiece[i].onmouseover = function(){
			if (checkMove(parseInt(this.innerHTML))){
				this.style.border = "3px solid red"; 
				this.style.color = "#006600"; 
			}

		};

		gamePiece[i].onmouseout = function(){
			this.style.border = "2px solid black"; 
			this.style.color = "#000000"; 
			// this.style.textDecoration = "none"; 
		};

		gamePiece[i].onclick = function(){

			if (checkMove(parseInt(this.innerHTML))){
				swap(this.innerHTML-1);
				if (finish()){
					win();
				}
				return;
			}
		};
	}


	var shuffle = document.getElementById('shufflebutton'); 
	spaceX = '300px'; 
	spaceY = '300px';

	shuffle.onclick = function() 
	{
		for (var i=0; i<300; i++) 
		{
			var rand = parseInt(Math.random()* 100) %4;
			if (rand == 0){
				var temp = up(spaceX, spaceY); 
				if ( temp != -1){
					swap(temp);
				}
			}

			if (rand == 1){
				var temp = down(spaceX, spaceY);
				if ( temp != -1){
					swap(temp);
				}
			}
			if (rand == 2){
				var temp = left(spaceX, spaceY);
				if ( temp != -1){
					swap(temp);
				}
			}
			if (rand == 3){
				var temp = right(spaceX, spaceY);
				if (temp != -1){
					swap(temp);
				}
			}
		}
	};

};


function swap(position){
    var temp = gamePiece[position].style.top;
    gamePiece[position].style.top = spaceY;
    spaceY = temp;

    var temp = gamePiece[position].style.left;
    gamePiece[position].style.left = spaceX;
    spaceX = temp;
}


function checkMove(position){
    if(left(spaceX,spaceY)==(position-1)){
        return true;
    } if(right(spaceX,spaceY)==(position-1)){
        return true;
    } if(up(spaceX,spaceY)==(position-1)){
        return true;
    } if(down(spaceX,spaceY)==(position-1)){
        return true;
    }
}


function left(x, y){
	var cordX = parseInt(x);
	var cordY = parseInt(y);
	if (cordX > 0){
		for (var i = 0; i < gamePiece.length; i++) {
			if (parseInt(gamePiece[i].style.left) + 100 == cordX && parseInt(gamePiece[i].style.top) == cordY){
				return i;
			} 
		}
	}else return -1;
}

function right(x,y){
    var cordX = parseInt(x);
    var cordY = parseInt(y);
    if(cordX <300){
        for (var i=0; i<gamePiece.length; i++){
            if(parseInt(gamePiece[i].style.left)-100 == cordX&& parseInt(gamePiece[i].style.top)==cordY ){
                return i;
            }
        }
    }else return -1;
}

function up(x,y){
    var cordX = parseInt(x);
    var cordY = parseInt(y);
    if(cordX>0){
        for(var i=0; i<gamePiece.length; i++){
            if(parseInt(gamePiece[i].style.top)+100 == cordY && parseInt(gamePiece[i].style.left)==cordX){
                return i;
            }
        }
    }else return -1;

}

function down(x,y){
    var cordX = parseInt(x);
    var cordY = parseInt(y);

    if(cordX<300){
        for(var i=0; i<gamePiece.length; i++){
            if(parseInt(gamePiece[i].style.top)-100==cordY && parseInt(gamePiece[i].style.left)==cordX){
                return i ;
            }
        }
    }else return -1;
}


