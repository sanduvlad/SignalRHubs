var htmlChatList = $("#usersList");
var htmlMessageBox = $("#messageTextBox");
var htmlMessageHistory = $("#messagesHistory");

var ChatList;

var connection = new signalR.HubConnectionBuilder().withUrl("/ChatWithMe").build();

var currentChatingUser;

var thisUserName;

connection.start().catch(function (err) {
    return console.error(err.toString());
}).then(function () { Loaded(); });

connection.on("UpdateUsersList", function (_users) {
    ChatList = _users;
    console.log(_users);
    var htmlChat = document.getElementById("usersList");

    while (htmlChat.firstChild) {
        htmlChat.removeChild(htmlChat.firstChild);
    }

    for (var i = 0; i < _users.length; i++) {
        //htmlChatList.add(new para)
        var user = document.createElement("p");
        var attribute = document.createAttribute("id");
        var text = document.createTextNode(_users[i]);
        user.appendChild(text);
        attribute.value = "user_" + _users[i];
        user.setAttributeNode(attribute);
        attribute = document.createAttribute("onclick");
        attribute.value = "HtmlUserClicked(" + "'" + _users[i] + "')";
        user.setAttributeNode(attribute);
        htmlChatList.append(user);
    }
});

connection.on("MessageReceivedFrom", function (senderUsername, message) {
    currentChatingUser = senderUsername;
    HtmlUserClicked(senderUsername);
    var tempDiv = document.createElement("div");
    var tempDiv2 = document.createElement("div");
    var htmlMsg = document.createElement("p");

    var attr = document.createAttribute("style");
    attr.value = "float:left;";
    htmlMsg.setAttributeNode(attr);

    var text = document.createTextNode(message);
    htmlMsg.appendChild(text);

    attr = document.createAttribute("style");
    attr.value = "width:100%;float:left;";
    tempDiv2.setAttributeNode(attr);

    attr = document.createAttribute("class");
    attr.value = "temDiv";
    tempDiv.setAttributeNode(attr);

    attr = document.createAttribute("class");
    attr.value = "temDiv2";
    tempDiv2.setAttributeNode(attr);


    attr = document.createAttribute("class");
    attr.value = "pp";
    htmlMsg.setAttributeNode(attr);

    tempDiv2.appendChild(htmlMsg);
    tempDiv.appendChild(tempDiv2);

    htmlMessageHistory.append(tempDiv);

    ScrollMessagesToBotton();

});

function HtmlUserClicked(username) {
    console.log(username);

    currentChatingUser = username;

    $("#user_" + username).addClass("selecteUserToChat");
    $("p:not(#user_" + username + ")").removeClass("selecteUserToChat");
}

function Loaded() {
    
    var username = window.prompt("Enter a username", "IonPopescu123");
    connection.invoke("LogInAs", username);
    thisUserName = username;
}


function ScrollMessagesToBotton() {
    $("#messagesHistory").scrollTop($("#messagesHistory").height());
}

function SendMessageButtonEvent() {
    var text = htmlMessageBox.val();

    var tempDiv = document.createElement("div");
    var tempDiv2 = document.createElement("div");
    var htmlMsg = document.createElement("p");

    var attr = document.createAttribute("style");
    attr.value = "float:right;";
    htmlMsg.setAttributeNode(attr);
    
    var textNode = document.createTextNode(htmlMessageBox.val());
    htmlMsg.appendChild(textNode);

    attr = document.createAttribute("style");
    attr.value = "width:100%;float:right;";
    tempDiv2.setAttributeNode(attr);
    
    attr = document.createAttribute("class");
    attr.value = "temDiv";
    tempDiv.setAttributeNode(attr);

    attr = document.createAttribute("class");
    attr.value = "temDiv2";
    tempDiv2.setAttributeNode(attr);


    attr = document.createAttribute("class");
    attr.value = "pp";
    htmlMsg.setAttributeNode(attr);

    tempDiv2.appendChild(htmlMsg);
    tempDiv.appendChild(tempDiv2);

    htmlMessageHistory.append(tempDiv);


    htmlMessageBox.val("");

    connection.invoke("SendMessageTo", thisUserName, currentChatingUser, text);

    ScrollMessagesToBotton();
    

    
}