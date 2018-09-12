
var isDrawing = false;
var resetStartPoint = true;
var canvas = document.getElementById("drawingArea");
var ctx = canvas.getContext("2d");

var connection = new signalR.HubConnectionBuilder().withUrl("/DrawWithMe").build();


connection.on("ReceiveNewCoordinate", function (x, y) {
    ReceiveNewCoordinate(x,y);
});

connection.on("ReceiveMouseClickedEvent", function () {
    MouseClickedEventReceived();
});

connection.on("UpdateNumberOfConnections", function (conns) {
    $("#lblNumberOfSessions").text("Number of active connections: " + conns);
});

connection.on("ResetCanvasEventReceived", function () {
    ResetCanvas();
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

function ResetButtonPressed() {
    console.log("Reset button pressed");
    ResetCanvas();
    connection.invoke("ResetCanvas");
}

function ResetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}



function MouseDownEvent() {
    //console.log("MouseDownEvent");
}

function MouseUpEvent() {
    //console.log("MouseUpEvent");
    console.log(event.clientX - $("#drawingArea").offset().left);
    console.log(event.clientY - $("#drawingArea").offset().top);
}

function MouseMovedEvent() {
    MouseMovedEvent(undefined, undefined);
}

function MouseMovedEvent(x,y) {
    var drawX = 0;
    var drawY = 0;
    if (x !== undefined && y !== undefined) {
        drawX = x;
        drawY = y;
    }
    else {
        drawX = event.clientX - $("#drawingArea").offset().left;
        drawY = event.clientY - $("#drawingArea").offset().top;
    }
    if (isDrawing == true) {
        if (resetStartPoint == true) {
            resetStartPoint = false;
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
        }

        ctx.lineTo(drawX, drawY);
        ctx.stroke();

        connection.invoke("SendNewCoordinate", drawX, drawY);
    }

}

function ReceiveNewCoordinate(x,y) {
    var drawX = 0;
    var drawY = 0;
    if (x !== undefined && y !== undefined) {
        drawX = x;
        drawY = y;
    }
    else {
        drawX = event.clientX - $("#drawingArea").offset().left;
        drawY = event.clientY - $("#drawingArea").offset().top;
    }
    if (isDrawing == true) {
        if (resetStartPoint == true) {
            resetStartPoint = false;
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
        }
        
        ctx.lineTo(drawX, drawY);
        ctx.stroke();
    }
}

function MouseClickedEvent() {
    isDrawing = !isDrawing;
    resetStartPoint = isDrawing;
    console.log("Mouse Clicked!:" + isDrawing);

    connection.invoke("SendMouseClickedEvent");
}

function MouseClickedEventReceived() {
    isDrawing = !isDrawing;
    resetStartPoint = isDrawing;
    console.log("Mouse Clicked!:" + isDrawing);
}