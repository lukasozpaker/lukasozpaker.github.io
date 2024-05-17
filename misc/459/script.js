alert("Version 3");

const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 300;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

function drawGraph(ls) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // const min = Math.min(...ls);
    const min = 0;
    const max = Math.max(...ls);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for (let i = 0; i < ls.length; i++) {
        const x = i / (ls.length - 1) * canvas.width;
        const y = (1 - (ls[i] - min) / (max - min)) * canvas.height;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.stroke();


    ctx.font = '20px Arial';
    ctx.fillText(max, canvas.width - 40, 20);
    // ctx.fillText(min, canvas.width - 40, canvas.height - 20);
    // ctx.fillText('TOF Distance (mm) over last 30s', 0, 20);

    ctx.fillText(new Date().toLocaleTimeString(), 0, 40);

}



const title = document.createElement('h1');
title.textContent = 'Time of Flight Distance (mm) over last 30s';
document.body.insertBefore(title, canvas);