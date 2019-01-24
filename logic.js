var snakeDirection = "tp";
var step = 10;
var delay = 1;
var delay2 = 20;
var sw = window.innerWidth - 40;
var sh = window.innerHeight - 40;
var time = "";
var flagshowtime = true;
var counter = 0;
head = document.getElementsByClassName("snake_head")[0];

window.addEventListener("resize", function() {
    sw = window.innerWidth - 40;
    sh = window.innerHeight - 40;
})

function hardRotate(elem, deg) {
    var x = elem.attributes.x.value + "px";
    var y = elem.attributes.y.value + "px";
    elem.attributes.r.value = deg;
    elem.style.transform = 'translate(' + x + ',' + y + ') rotate(' + deg + 'deg)';
}

function rotate(elem) {
    var x = elem.attributes.x.value + "px";
    var y = elem.attributes.y.value + "px";
    var r = parseInt(elem.attributes.r.value);
    var currentDeg = r % 360;
    if (currentDeg == 0) {
        if (snakeDirection == "lt") {
            r -= 90;
            elem.setAttribute("r", r);
        }
        if (snakeDirection == "rt") {
            r += 90;
            elem.setAttribute("r", r);
        }
    } else
    if (currentDeg == 90) {
        if (snakeDirection == "tp") {
            r -= 90;
            elem.setAttribute("r", r);
        }
        if (snakeDirection == "bt") {
            r += 90;
            elem.setAttribute("r", r);
        }
    } else
    if (currentDeg == 180) {
        if (snakeDirection == "lt") {
            r += 90;
            elem.setAttribute("r", r);
        }

        if (snakeDirection == "rt") {
            r -= 90;
            elem.setAttribute("r", r);
        }

    } else
    if (currentDeg == 270) {
        if (snakeDirection == "tp") {
            r += 90;
            elem.setAttribute("r", r);
        }
        if (snakeDirection == "bt") {
            r -= 90;
            elem.setAttribute("r", r);
        }
    }
    if (currentDeg == -90) {
        if (snakeDirection == "tp") {
            r += 90;
            elem.setAttribute("r", r);
        }
        if (snakeDirection == "bt") {
            r -= 90;
            elem.setAttribute("r", r);
        }
    } else
    if (currentDeg == -180) {
        if (snakeDirection == "lt") {
            r += 90;
            elem.setAttribute("r", r);
        }

        if (snakeDirection == "rt") {
            r -= 90;
            elem.setAttribute("r", r);
        }

    } else
    if (currentDeg == -270) {
        if (snakeDirection == "tp") {
            r -= 90;
            elem.setAttribute("r", r);
        }
        if (snakeDirection == "bt") {
            r += 90;
            elem.setAttribute("r", r);
        }
    }


    r += "deg";
    elem.style.transform = 'translate(' + x + ',' + y + ') rotate(' + r + ')';
}



document.addEventListener("keydown", function(e) {
    //107- +
    //109 -
    if (e.keyCode == "37") {
        snakeDirection = "lt"
    } else
    if (e.keyCode == "38") {
        snakeDirection = "tp"
    } else
    if (e.keyCode == "39") {
        snakeDirection = "rt"
    } else
    if (e.keyCode == "40") {
        snakeDirection = "bt"
    } else
    if (e.keyCode == "107") {
        snakeDirection = "bt"
    } else
    if (e.keyCode == "109") {
        snakeDirection = "bt"
    }

})

document.addEventListener("DOMContentLoaded", function() {
    head = document.getElementsByClassName("snake_head")[0];
    pregame();


})

function SetPosition(x, y, elem) {
    var dir = elem.attributes.dir.value;
    var a = snakeDirection;
    if ((dir == "lt" && a == "rt") || (dir == "tp" && a == "bt") || (dir == "rt" && a == "lt") || (dir == "bt" && a == "tp")) {
        if (dir == "lt") {
            x = x - 2 * step;
        } else if (dir == "rt") {
            x = x + 2 * step;

        } else if (dir == "tp") {
            y = y - 2 * step;
        } else if (dir == "bt") {
            y = y + 2 * step;
        }
        snakeDirection = dir;
    }
    var nextX = x + "px";
    var nextY = y + "px";
    elem.attributes.dir.value = snakeDirection;
    var deg = elem.attributes.r.value;
    elem.style.transform = 'translate(' + nextX + ',' + nextY + ') rotate(' + deg + 'deg)';
    elem.setAttribute("x", x);
    elem.setAttribute("y", y);
}


function pregame() {
    time = performance.now();
    setTimeout(draw, delay);
    

}


function draw() {
    counter++;
    var lastX = parseInt(head.attributes.x.value)
    var lastY = parseInt(head.attributes.y.value)
    if (lastY < 20 || lastY > sh || lastX < 20 || lastX > sw) {
        if (lastY < 20) {
            lastY = 20;
        }
        if (lastY > sh) {
            lastY = sh;
        }
        if (lastX < 20) {
            lastX = 20;
        }
        if (lastX > sw) {
            lastX = sw;
        }
        if (flagshowtime != false) {
            flagshowtime = false;
        }
        SetPosition(lastX, lastY, head);
        rotate(head)
        setTimeout(draw, delay);
        return
    }
    if (snakeDirection == "lt") {
        lastX -= step;
    } else if (snakeDirection == "tp") {
        lastY -= step;
    } else if (snakeDirection == "rt") {
        lastX += step;
    } else if (snakeDirection == "bt") {
        lastY += step;
    }
    SetPosition(lastX, lastY, head);
    rotate(head)
    var currX = "";
    var currY = "";
    var currang = "";
    var prevang = "";
    var array = document.getElementsByClassName("snake_item");
    lastX = lastX;
    lastY = lastY;
    prevang = head.attributes.r.value;
    for (var i = 0; i < array.length; i++) {
        var currX = parseInt(array[i].attributes.x.value)
        var currY = parseInt(array[i].attributes.y.value)
        currang = array[i].attributes.r.value;
        SetPosition(lastX, lastY, array[i]);
        hardRotate(array[i], prevang)
        lastX = currX;
        lastY = currY;
        prevang = currang;
    }
    if(counter == 100){
        console.log(performance.now() - time);
        counter = 0;
        time = performance.now();

    }

    return setTimeout(draw, delay);

}