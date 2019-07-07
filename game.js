var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
document.addEventListener("keydown", keyPush);
setInterval(game, 1000/10);

xv = yv = score = 0;
change = 5;

function game() {
	ctx.fillStyle = "green";
    ctx.fillRect(190, 190, 20, 20);
    
}
function keyPush(evt) {
	switch(evt.keyCode) {
    	//left arrow and a
        case 37: 
        	xv = 0 - change;
            yv = 0;
            break;
        case 65: 
        	xv = 0 - change;
            yv = 0;
            break;
        //up arrow and w
        case 38:
        	xv = 0;
            yv = 0 - change;
            break;
        case 87:
        	xv = 0;
            yv = 0 - change;
            break;
        //right arrow and d
        case 39:
        	xv = change;
            yv = 0;
            break;
        case 68:
        	xv = change;
            yv = 0;
            break;
        //down arrow and s
        case 40:
        	xv = 0;
            yv = change;
            break;
        case 83:
        	xv = 0;
            yv = change;
            break;
    }
}
