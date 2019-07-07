var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
document.addEventListener("keydown", keyPush);
setInterval(game, 1000/10);

//variables for the obstacles
obstacleX = [];
obstacleY = [];
obstacleMovement = [];
diameter = 10;
obstacles = 2;
obstacleBuffer = 0;

//mouse-controlled movement variables (adapted to be WASD/arrow controlled)
speed = 2;
cap = 3;

//other variables
//linked because score increases only when game isn't over
xv = yv = score = 0;
change = 5;
over = 0;

var randomLocation = function(a) {
    //randomly add in circles on the sides
    if (Math.round(Math.random(0,1)) === 0)
    {
        //left right sides
        obstacleX.push(200*(Math.round(Math.random(0,1))*2-1)+200);
        obstacleY.push(Math.round(Math.random(0,400)));
        //all left/right will be +/- 1
        obstacleMovement.push((obstacleX[a]-200)/200);
    } else {
        //top bottom sides
        obstacleX.push(Math.round(Math.random(0,400)));
        obstacleY.push(200*(Math.round(Math.random(0,1))*2-1)+200);
        //all top/bottom will be +/- 2
        obstacleMovement.push((obstacleY[a]-200)/100);
    }
};

//reassign positions to circles that go off the edge
var reassign = function(a) {
    
    //randomly add in circles on the sides
    if (Math.round(Math.random(0,1)) === 0)
    {
        //left right sides
        obstacleX[a] = (200*(Math.round(Math.random(0,1))*2-1)+200);
        obstacleY[a] = (Math.random(0,400));
        //all left/right will be +/- 1
        obstacleMovement[a] = ((obstacleX[a]-200)/200);
    } else {
        //top bottom sides
        obstacleX[a] = (Math.random(0,400));
        obstacleY[a] = (200*(Math.round(Math.random(0,1))*2-1)+200);
        //all top/bottom will be +/- 2
        obstacleMovement[a] = ((obstacleY[a]-200)/100);
    }
};

//spawn some number of obstacles
for (i = 0; i < obstacles; i++)
{
    randomLocation(i);
}

function game() {
	ctx.fillStyle = "White";
    ctx.fillRect(0, 0, 400, 400);
    
    ctx.fillStyle = "MediumSpringGreen";
    ctx.fillRect(190, 190, 20, 20);
    
    //cap mx and my so that you don't go crazy fast
    if (Math.abs(xv) > cap) {
        xv = (xv/Math.abs(xv))*cap;
    }
    if (Math.abs(yv) > cap) {
        yv = (yv/Math.abs(yv))*cap;
    }
    
    //update circle locations
    for (h = 0; h < obstacles; h++)
    {
        //+ is right bottom (multiply -1)
        //- is left top (multiply -1)
        if (Math.abs(obstacleMovement[h])===1)
        {
            //all left/right will be +/- 1
            obstacleX[h] -= obstacleMovement[h]*speed;
        } else {
            //all top/bottom will be +/- 2
            obstacleY[h] -= obstacleMovement[h]*0.5*speed;
        }
        
        obstacleX[h] += 0.2*(200-obstacleX[h])/abs((200-obstacleX[h]));
        obstacleY[h] += 0.2*(200-obstacleY[h])/abs((200-obstacleY[h]));
        
        obstacleX[h] -= xv;
        obstacleY[h] -= yv;
        
        if (Math.abs(obstacleX[h]-200) > 200 || Math.abs(obstacleY[h]-200) > 200)
        {
            reassign(h);
        }
        
        if (Math.abs(obstacleX[h]-200) < 12 && Math.abs(obstacleY[h]-200) < 12)
        {
            over = 1;
        }
    }
    
    //draw/spawn 10 obstacle circles (red)
    ctx.fillStyle = "Red";
    
    if (over === 0)
    {
        for (var j = 0; j < obstacles; j++)
            {
                ctx.beginPath();
                ctx.arc(obstacleX[j], obstacleY[j], diameter, 0, 2*Math.PI);
                ctx.stroke();
            }
    }
    
    //print the score
    ctx.font = "14px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("SCORE - " + score, 10, 23);
    
    obstacleBuffer += 0.01;
    if (obstacleBuffer > 1)
    {
        obstacleBuffer = 0;
        obstacles += 1;
        randomLocation(obstacles-1);
    }
    
    //end of (game)
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
