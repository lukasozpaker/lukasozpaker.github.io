var countDownDate = new Date("Mar 31, 2021 11:59:59").getTime();

      var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if(distance>0) {
            document.getElementById("demo").style.opacity = "1";
            document.getElementById("para3").style.opacity = "1";
            document.getElementById("demo").innerHTML = days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
            document.getElementById("para3").innerHTML = "NOT OUT";

        }
        

        if (distance <= 0) {
          clearInterval(x);
          document.getElementById("demo").style.opacity = "1";
          document.getElementById("para3").style.opacity = "1";
          document.getElementById("para3").style.color = "#26a69a";
          document.getElementById("para3").innerHTML = "OUT";
          document.getElementById("demo").innerHTML = "0d 0h 0m 0s"
          
        }
      }, 1000);