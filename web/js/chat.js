var participants = {
    count: {},
    list: [],
    load: function () {
        $.get("a/participants", {}, function (res) {
            if (res.err == 0) {
                with (participants) {
                    count = {};
                    res.result.forEach(function (user) {
                        if (!count.hasOwnProperty(user)) count[user] = 0;
                        count[user]++;
                    });
                    list = [];
                    for (var user in count) list.push(user);
                    list.sort();
                    var par = $("#participants");
                    par.innerHTML = "";
                    list.forEach(function (user) {
                        var e = document.createElement("li");
                        e.className = "show hide";
                        e.innerHTML = user;
                        par.appendChild(e).classList.remove("hide");
                    });
                }
            }
        });
    },
    add: function (user) {
        if (!this.count.hasOwnProperty(user)) {
            this.count[user] = 1;
            this.list.push(user);
            this.list.sort();
            var pos = this.list.indexOf(user);
            var e = document.createElement("li");
            e.className = "show hide";
            e.innerHTML = user;
            var par = $("#participants");
            par.insertBefore(e, par.childNodes[pos]).classList.remove("hide");
        } else {
            this.count[user]++;
        }
    },
    remove: function (user) {
        this.count[user]--;
        if (this.count[user] == 0) {
            delete this.count[user];
            var pos = this.list.indexOf(user);
            this.list.splice(pos, 1);
            var par = $("#participants");
            var e = par.childNodes[pos];
            e.addEventListener("transitionend", function () {
                par.removeChild(e);
            });
            e.classList.add("hide");
        }
    }
};

var chat = {
    connect: function () {
        var wsurl = "ws" + /:.*\//.exec(location) + "wschat";
        this.ws = new WebSocket(wsurl);
        this.ws.onopen = participants.load;
        this.ws.onmessage = this.recv;
    },
    recv: function (message) {
        message = JSON.parse(message.data);
        if (message.type == 1) {
            participants.add(message.sender);
        } else if (message.type == 2) {
            participants.remove(message.sender);
        } else if (message.type == 3) {
            var e = document.createElement("p");
            e.innerHTML = "<strong>" + message.sender + ": </strong>" + message.msg;
            $("#chatlog").appendChild(e);
        }
    },
    send: function (message) {
        this.ws.send(JSON.stringify({type: 3, msg: message}));
    }
};

$.ready(function () {
    chat.connect();
    $(".btn").addEventListener("click", function(e) {
        e.preventDefault();
        chat.send($("input").value);
        $("input").value = "";
        $("input").focus();
    });
});