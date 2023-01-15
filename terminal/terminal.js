var elem = document.documentElement;
var fullscreen = false;
var prompt = document.getElementById("prompt");
var log = [];
var commands = [];
var dir = "root:/";
var head = ">";
prompt.textContent = "‎‎‎‎‎>";
document.getElementById("input").addEventListener("keydown", function (event) {
    // Number 13 = "Enter" key
    if (event.key == "Enter") {
        execute();
    }
    //else can be used to view text while typing wo enter
    else {

    }
});

function execute() {
    log.push(dir + head + "&nbsp;" + document.getElementById("input").value);
    //takes log, gets lastest entry from log.push and sorts into array seperated by spaces
    commands = log[log.length - 1].substring(1).toLowerCase().split(" ");

    if (commands[0].includes("clear")) {
        log = [];
        document.getElementById("log").textContent = log;
        document.getElementById("displaybox").innerHTML = "";
    }
    else if(commands[0].includes("ls")){
        push("version");
        push("location");
        push("/directory1");
    }
    else if(commands[0].includes("cd") && commands[1] != null){
        push("NOT IMPLEMENTED");

    }
    else if(commands[0].includes("login") && commands[1] != null){
        if(commands[1] === "lukas" || commands[1] === "admin"){
            push("p:")
        }

    }
    else if(commands[0].includes("version")){
        push("Version: 3.0");
    }
    else if (commands[0].includes("location")) {
        getLocation();
    }
    else if (commands[0].includes("rdr") && commands[1] != null) {
        if (commands[1].substring(0, 7).includes("http://")) {
            window.location.href = commands[1];
        }
        else {
            window.location.href = "https://" + commands[1];
        }
        //window.location.replace(command.substring(5));
    }
    else if (commands[0].includes("for") && commands[1] != null) {
        if (commands[1].substring(0, 7).includes("http://")) {
            document.getElementById("displaybox").innerHTML = "<iframe frameBorder='0' src=" + commands[1] + "></iframe>";
        }
        else if (commands[1].substring(0, 8).includes("https://")) {
            document.getElementById("displaybox").innerHTML = "<iframe frameBorder='0' src=" + commands[1] + "></iframe>";
        }
        else {
            document.getElementById("displaybox").innerHTML = "<iframe frameBorder='0' src=https://www." + commands[1] + "></iframe>";
        }

    }
    else if (commands[0].includes("search") && commands[1] != null) {
        var query = "";
        //google
        if (commands[1].includes("google") || commands[1].substring(0, 1) === "g" && commands[2] != null) {
            if (commands[1].substring(1).includes(".i") && commands[2] != null) {
                if (commands[2].includes("for") && commands[3] != null) {
                    for (let i = 3; i < commands.length; i++) {
                        query += commands[i] + "%20";
                    }
                    query = query.substring(0, query.length - 3);
                    // window.location.href = "https://www.google.com/search?tbm=isch&q=" + query;
                    window.open("https://www.google.com/search?tbm=isch&q=" + query, "_blank");
                }
            }
            else if (commands[2] != null) {
                if (!commands[1].includes(".") && commands[2].includes("for") && commands[3] != null) {
                    for (var i = 3; i < commands.length; i++) {
                        query += commands[i] + "%20";
                    }
                    query = query.substring(0, query.length - 3);
                    // window.location.href = "https://www.google.com/search?q=" + query;
                    window.open("https://www.google.com/search?q=" + query, "_blank");
                }
            }

        }


        //bing
        else if (commands[1].includes("bing") || commands[1].substring(0, 1) === "b" && commands[2] != null) {
            if (commands[1].substring(1).includes(".i") && commands[2] != null) {
                if (commands[2].includes("for") && commands[3] != null) {
                    for (let i = 3; i < commands.length; i++) {
                        query += commands[i] + "%20";
                    }
                    query = query.substring(0, query.length - 3);
                    document.getElementById("displaybox").innerHTML = "<iframe frameBorder='0' src=https://www.bing.com/images/search?q=" + query + "></iframe>";
                    //window.location.href = "https://www.bing.com/images/search?q=" + query;
                }
            }
            if (commands[2] != null) {
                if (!commands[1].includes(".") && commands[2].includes("for") && commands[3] != null) {
                    for (var i = 3; i < commands.length; i++) {
                        query += commands[i] + "%20";
                    }
                    query = query.substring(0, query.length - 3);
                    document.getElementById("displaybox").innerHTML = "<iframe frameBorder='0' src=https://www.bing.com/search?q=" + query + "></iframe>";
                    //window.location.href = "https://www.bing.com/search?q=" + query;
                }
            }
        }

        //urbandictionary
        else if (commands[1].includes("ud") || commands[1].includes("urban") && commands[2] != null) {
            if (commands[2] === "for" && commands[3] != null) {
                for (var i = 3; i < commands.length; i++) {
                    query += commands[i] + "%20";
                }
                query = query.substring(0, query.length - 3);
                document.getElementById("displaybox").innerHTML = "<iframe frameBorder='0' src=https://www.urbandictionary.com/define.php?term=" + query + "></iframe>";
            }
        }

        //no engine
        else {
            if (commands[1].includes("for") && commands[2] != null) {
                for (let i = 2; i < commands.length; i++) {
                    query += commands[i] + "%20";
                }
                query = query.substring(0, query.length - 3);
                // window.location.href = "https://www.google.com/search?q=" + query;
                window.open("https://www.google.com/search?q=" + query, "_blank");
            }
        }
    }
    else if (commands[0].includes("print")) {
        window.print();
    }
    else if (commands[0].includes("win") && commands[1] != null) {
        if (commands[1].includes("close")) {
            document.getElementById("displaybox").innerHTML = "";
        }
    }
    else if (commands[0].includes("script") && commands[1] != null) {
        var script = "";
        for (let i = 1; i < commands.length; i++) {
            script += commands[i] + " ";
        }
        script = script.slice(0, -1);
        try {
            eval(script);
        }
        catch (e) {
            if (e instanceof SyntaxError) {
                push("SyntaxError: " + e.message);
                update();
                document.getElementById("input").value = "script " + script;
                console.log("script syntax error");
                return;
            }
            push("Error: " + e.message);
            update();
            document.getElementById("input").value = "script " + script;
            console.log("script unknown error");
            return;
        }

    }
    else if (commands[0].includes("rel")) {
        location.reload();
    }
    else if (commands[0].includes("nato") && commands[1] != null) {
        var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var number = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Niner"];
        var phonetic = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf",
            "Hotel", "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa",
            "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray", "Yankee", "Zulu"];
        //-1 because of "nato" command
        var line = "";
        for (let i = 1; i < commands.length; i++) {
            for (let j = 0; j < commands[i].length; j++) {
                if (!isNaN(commands[i].substring(j, j + 1))) {
                    line += number[commands[i].substring(j, j + 1)] + " ";
                }
                else line += phonetic[alphabet.indexOf(commands[i].substring(j, j + 1))] + " ";
            }
            push(line);
            line = "";
        }

    }
    else if (commands[0].includes("o") && commands[1] != null) {
        let base = "https://www.ozpaker.org/";
        window.location.href = base += commands[1];
    }
    else if (commands[0].includes("gen")) {
        let command = "";
        for (let i = log.length - 1 - 1; i >= 0; i--) {
            if (log[i].substring(0, 1) == ">") {
                command = log[i].substring(1).toLowerCase();

                console.log("log" + command);
                let base = "https://www.ozpaker.org/terminal?c=>"
                let urlc = "";
                let array = command.toLowerCase().split(" ");
                for (let i = 0; i < array.length; i++) {
                    console.log(urlc);
                    urlc += array[i] + "+";

                }
                urlc = urlc.substring(0, urlc.length - 1);

                push(base + urlc);

                break;
            }
            if (i == 0 && command == "") {
                push("no command found: no url generated");
            }
        }


    }
    else if (commands[0].includes("test")) {
        push("Output working: test successful");
    }
    else if (commands[0].includes("help")) {
        push("url queries (?c=)...............begin each command with '>'");
        push("&nbsp;&nbsp;&nbsp;example......................ozpaker.org/terminal?c=>help>get location");
        push("&nbsp;");
        push("script..........................allows for terminal-based scripting")
        push('&nbsp;&nbsp;&nbsp;com("command")...............com() allows scripts to execute terminal commands');
        push('&nbsp;&nbsp;&nbsp;example......................for(i=0;i<3;i++) com("get version")');
        push("&nbsp;");
        push("clear...........................clear the console");
        push("forward.........................open link in console window");
        push("location........................fetches latitude and longitude for current location");
        push("version.........................get the current terminal version");
        push("nato [text].....................converts word and numbers into the nato phonetic alphabet")
        push("print...........................opens a print dialogue for terminal");
        push("rdr [url].......................redirect terminal to another url");
        push("reload..........................reload the page");
        push("search [engine] for [query].....searches query on google if engine is blank");
        push("&nbsp;&nbsp;&nbsp;google/g");
        push("&nbsp;&nbsp;&nbsp;bing/b");
        push("&nbsp;&nbsp;&nbsp;urbandictionary/ud");
        push("&nbsp;&nbsp;&nbsp;add .images/.i to search for images");
        push("test............................tests output system");
        push("view log........................prints the raw array of command and output data");
        push("window close....................closes window panel");
        push("o [app].........................launches ozpaker.org web apps by their name");
    }



    //updates displayed history and resets input
    update();
    document.getElementById("input").value = "";
    console.log("command executed");
}

function com(command) {
    document.getElementById("input").value = command;
    execute();
}





//URL query string
if (window.location.search) {
    var params = new URLSearchParams(window.location.search);
    var urlCommands = params.get("c").split(">");
    urlCommands.shift();
    console.log(urlCommands);
    for (let i = 0; i < urlCommands.length; i++) {
        document.getElementById("input").value = urlCommands[i];
        execute();
    }
}

//restore focus to input line
document.getElementById("body").addEventListener("focusout", function (event) {
    document.getElementById("input").focus();
});



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition);
    } else {
        push("GEOLOCATION IS NOT SUPPORTED BY CLIENT");
    }
}

function savePosition(position) {
    push("Latitude: " + position.coords.latitude);
    push("Longitude: " + position.coords.longitude);
    update();
}

//command and update functions
function push(value) {
    log.push(value);
}
function update() {
    document.getElementById("log").innerHTML = "";
    for (var i = 0; i < log.length; i++) {
        if (log[i].substring(0, 1) == ">") {
            logList = "<li><span>" + log[i] + "</span></li>";
        }
        else logList = "<li>" + log[i] + "</li>";
        document.getElementById("log").innerHTML += logList;
    }
    //document.getElementById("log").textContent = log;
}

//fullscreen controls
function fullscreenControl() {
    if (fullscreen == false) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
            fullscreen = true;
            document.getElementById("fullscreen").innerText = "fullscreen_exit";
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
            fullscreen = true;
            document.getElementById("fullscreen").innerText = "fullscreen_exit";
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
            fullscreen = true;
            document.getElementById("fullscreen").innerText = "fullscreen_exit";
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
            fullscreen = true;
            document.getElementById("fullscreen").innerText = "fullscreen_exit";
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            fullscreen = false;
            document.getElementById("fullscreen").innerText = "fullscreen";
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
            fullscreen = false;
            document.getElementById("fullscreen").innerText = "fullscreen";
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
            fullscreen = false;
            document.getElementById("fullscreen").innerText = "fullscreen";
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
            fullscreen = false;
            document.getElementById("fullscreen").innerText = "fullscreen";
        }
    }
}
window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    alert("Error: " + errorMsg);
    return false;
}