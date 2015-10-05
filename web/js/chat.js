var pop = {
    count: {},
    list: [],
    load: function () {
        $.get("a/participants", {}, function (res) {
            if (res.err != 0) {
                pop.load();
                return;
            }
            pop.count = {};
            res.result.forEach(function (user) {
                if (!pop.count.hasOwnProperty(user)) pop.count[user] = 0;
                pop.count[user]++;
            });
            pop.list = Object.getOwnPropertyNames(pop.count).sort();
            pop.list.sort();
            var par = $("#participants");
            par.innerHTML = "";
            pop.list.forEach(function (user) {
                var e = document.createElement("li");
                e.innerHTML = user;
                par.appendChild(e).show(100);
            });
        }, pop.load);
    },
    add: function (user) {
        if (!pop.count.hasOwnProperty(user)) {
            pop.count[user] = 1;
            pop.list.push(user);
            pop.list.sort();
            var pos = pop.list.indexOf(user);
            var e = document.createElement("li");
            e.innerHTML = user;
            var par = $("#participants");
            par.insertBefore(e, par.childNodes[pos]).show(100);
        } else {
            pop.count[user]++;
        }
    },
    remove: function (user) {
        pop.count[user]--;
        if (pop.count[user] == 0) {
            delete pop.count[user];
            var pos = pop.list.indexOf(user);
            pop.list.splice(pos, 1);
            var e = $("#participants").childNodes[pos];
            e.hide(100, function () {
                e.parentNode.removeChild(e);
            });
        }
    }
};

var chat = {
    connect: function () {
        var wsurl = "ws" + /:.*\//.exec(location) + "wschat";
        chat.ws = new WebSocket(wsurl);
        chat.ws.onopen = pop.load;
        chat.ws.onmessage = chat.recv;
    },
    recv: function (message) {
        message = JSON.parse(message.data);
        if (message.type == 1) {
            pop.add(message.sender);
        } else if (message.type == 2) {
            pop.remove(message.sender);
        } else if (message.type == 3) {
            var e = document.createElement("p");
            e.appendChild(document.createElement("strong"));
            e.childNodes[0].innerHTML = message.sender + ": ";
            e.innerHTML += message.msg;
            $("#chatlog").appendChild(e).show(100);
        }
    },
    send: function (message) {
        chat.ws.send(JSON.stringify({type: 3, msg: message}));
    }
};

$.ready(function () {
    chat.connect();
    $(".btn").addEventListener("click", function (e) {
        e.preventDefault();
        chat.send($("input").value);
        $("input").value = "";
        $("input").focus();
    });
});