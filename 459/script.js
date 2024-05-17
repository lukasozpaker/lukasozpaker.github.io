alert("Version 2");

const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 300;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

function drawGraph(ls) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  if(ls[0] == "OUT OF RANGE"){
    ctx.moveTo(0, canvas.height - 0);
  }
  ctx.moveTo(0, canvas.height - ls[0] * 10);
  for (let i = 1; i < ls.length; i++) {
    if(ls[i] == "OUT OF RANGE"){
      ctx.lineTo(i * 10, canvas.height - 0);
    }
    ctx.lineTo(i * 10, canvas.height - ls[i] * 10);
  }
  ctx.stroke();
}