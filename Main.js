console.log("begin");

canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.left = "0px";
canvas.style.top = "0px";
canvas.style.background = "rgba(220, 221, 225,1.0)";

canvas.addEventListener('mousemove',moveMouseCanvas , false);
var mouse_pos = [0,0];
function moveMouseCanvas(event){
  mouse_pos = [event.x, event.y];
}

var ctx = canvas.getContext("2d");

var selection_node = "";
var frame = new openBlueprintFrame();


function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }