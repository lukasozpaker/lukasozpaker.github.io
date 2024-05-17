alert("Version 1");

const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 300;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

function drawGraph(ls) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - ls[0] * 10);
  for (let i = 1; i < ls.length; i++) {
    ctx.lineTo(i * 10, canvas.height - ls[i] * 10);
  }
  ctx.stroke();
}