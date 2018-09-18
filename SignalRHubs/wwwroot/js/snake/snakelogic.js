var connection = new signalR.HubConnectionBuilder().withUrl("/SnakeGameSSS").build();

connection.start().catch(function (err) {
    return console.error(err.toString());
});

var playerSnakes;
var playArea = document.getElementById("playArea");

//keyboard events
$(document).keydown(function (e) {
    switch (e.which) {
        case 37: // left
            MoveTo(-1, 0);
            break;

        case 38: // up
            MoveTo(0, -1);
            break;

        case 39: // right
            MoveTo(1, 0);
            break;

        case 40: // down
            MoveTo(0, 1);
            break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});


function MoveTo (xAxis, yAxis) {
    connection.invoke("Move", xAxis, yAxis);
}

connection.on("UpdateSnakesPosition", function (snakes) {
    console.log(snakes);
    playerSnakes = snakes;

    var color = "black";

    while (playArea.firstChild) {
        playArea.removeChild(playArea.firstChild);
    }

    for (var i = 0; i < playerSnakes.length; i++) {
        for (var j = 0; j < playerSnakes[i].snakeTail.length; j++) {
            var div = document.createElement("div");
            var attr = document.createAttribute("style");
            var marginLeft = playerSnakes[i].snakeTail[j].x * 10;
            var marginTop = playerSnakes[i].snakeTail[j].y * 10;

            attr.value = "position:absolute;width:10px;height:10px;background-color:" + color + ";margin-left:" + marginLeft + "px;margin-top:" + marginTop + "px";

            div.setAttributeNode(attr);
            
            playArea.appendChild(div);
        }
    }
})