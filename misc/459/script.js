alert("Version 7");

var sound1 = new Audio('https://ozpaker.org/misc/459/sound1.mp3');
var sound2 = new Audio('https://ozpaker.org/misc/459/sound2.mp3');
var sound3 = new Audio('https://ozpaker.org/misc/459/sound3.mp3');

const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 300;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

function drawGraph(ls) {
    var sensor = document.getElementById("ron").checked;
    if(!sensor){
      document.getElementById("tof").innerHTML = "Distance (ToF): OFF"
      ls.pop();
      ls.push(0);
      return;
    }
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

function func(distance){
    var sensor = document.getElementById("ron").checked;
    if(!sensor){
      return;
    }
    // var thres = document.getElementsByName("distance")[0].value;
    var thres = document.getElementById("in").value;
    console.log(thres);
    console.log(distance);

    distance = Number(distance);
    thres = Number(thres);


    if(distance > thres){
      // check the selector for the sound
      var e = document.getElementById("sound");
      var sound = 0;
      sound = e.options[e.selectedIndex].value;
      if(sound == 0){
        if(!sound3.playing){
          sound3.play();
        }
      }
      else if(sound == 1){
        if(!sound2.playing){
          sound2.play();
        }
      }
      else if(sound == 2){
        if(!sound1.playing){
          sound1.play();
        }
      }
    }
  
  }


const title = document.createElement('h3');
title.textContent = 'Time of Flight Distance (mm) over last 30s';
document.body.insertBefore(title, canvas);