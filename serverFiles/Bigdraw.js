//const canvas = document.getElementById("canvas");
let socket = io();
let canvas;
let drawColor = "black"
let drawSize = 2;
let elt = document.getElementById('cDiv');
function setup() {
createCanvas(5000, 2000);
	canvas = select('#defaultCanvas0')
	background('white');
	canvas.parent(elt);
}


function changeColor(color) {
	drawColor = color.style.background;
}
function clearCanvas() {
	background('white');
}

function draw(){
	//
	

	if(mouseIsPressed){
		//ellipse(mouseX,mouseY,300,300)
		noStroke();
		stroke(drawColor);
		strokeWeight(drawSize);
		line(mouseX, mouseY, pmouseX, pmouseY);
		var data = {x:mouseX, y:mouseY, color:drawColor, size:drawSize, px:pmouseX, py: pmouseY};
		socket.emit('mouseDraw', data)
  	}

}
//var data = {x:event.clientX - canvas.offsetLeft, y:event.clientY - canvas.offsetTop, color:drawColor, size:drawSize};
//socket.emit('mouseDraw', data)
socket.on("serverDraw", function (data){
	noStroke();
	stroke(data.color);
	strokeWeight(data.size);
	line(data.x, data.y, data.px, data.py);
})

socket.on("clearedLCanvas", function (data){
	clear();
	background('white');
})

/*
socket.on("savedCanvas", function (b64){
	var img = loadImage(b64);
	img.loadPixels();
})
*/
socket.on("savedCanvasByArray", function (data){
	noStroke();
	for (let i=0; i<data.length; i++) {
		stroke(data[i].color);
		strokeWeight(data[i].size);
		line(data[i].x, data[i].y, data[i].px, data[i].py);
	}
})

$(document).ready(function(){ 
    $.get("/userInfo",function(data){
        //console.log("ttttt1")
        if (data.name)
            $("#usrsName").html(data.name );
    });

   

});  