const canvas = $("#canvas")[0];
const ctx = canvas.getContext("2d");

var widthclientX = canvas.clientWidth;
var widthclientY = canvas.clientHeight;
var width = (canvas.width = 500);
var height = (canvas.height = 500);

var differenceX = width - widthclientX;
var differenceY = height - widthclientY;
$(window).resize(() => {
  widthclientX = canvas.clientWidth;
  widthclientY = canvas.clientHeight;
  differenceX = width - widthclientX;
  differenceY = height - widthclientY;
});
var currentBallX = 250;
var currentBallY = 250;

// Dragabble Ball Code
var dragable = false;

$("#canvas").bind("mouseup touchend", (e) => {
  dragable = false;
});
$("#canvas").bind("mousedown", (e) => {
  if (
    e.offsetX < currentBallX + 40 &&
    e.offsetX > currentBallX - 40 &&
    e.offsetY > currentBallY - 40 &&
    e.offsetY < currentBallY + 40
  ) {
    dragable = true;
  } else {
    dragable = false;
  }
  //   console.log(e.offsetX, e.offsetY);
});
$("#canvas").on("touchstart", (e) => {
  var bcr = e.target.getBoundingClientRect();
  var x = e.targetTouches[0].clientX - bcr.x;
  var y = e.targetTouches[0].clientY - bcr.y;
  console.log(x, y);
  var xPrecentage = (x * 100) / widthclientX;
  var yPrecentage = (y * 100) / widthclientY;
  if (
    x < currentBallX - (differenceX * xPrecentage) / 100 + 20 &&
    x > currentBallX - (differenceX * xPrecentage) / 100 - 20 &&
    y > currentBallY - (differenceY * yPrecentage) / 100 - 20 &&
    y < currentBallY - (differenceY * yPrecentage) / 100 + 20
  ) {
    console.log("true");
    dragable = true;
  } else {
    console.log("false");
    dragable = false;
  }
});
$("#canvas").on("touchmove", (e) => {
  var bcr = e.target.getBoundingClientRect();
  var x = e.targetTouches[0].clientX - bcr.x;
  var y = e.targetTouches[0].clientY - bcr.y;
  var xPrecentage = (x * 100) / widthclientX;
  var yPrecentage = (y * 100) / widthclientY;
  if (dragable) {
    currentBallX = x + (differenceX * xPrecentage) / 100;
    currentBallY = y + (differenceY * yPrecentage) / 100;
  }
});
$("#canvas").bind("mouseout", (e) => {
  dragable = false;
});
$("#canvas").bind("mousemove", (e) => {
  if (dragable) {
    currentBallX = e.offsetX;
    currentBallY = e.offsetY;
  }
});

function animate() {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.arc(currentBallX, currentBallY, 40, 0, 2 * 3.14);
  ctx.stroke();
  ctx.fill();
  requestAnimationFrame(animate);
}
animate();
