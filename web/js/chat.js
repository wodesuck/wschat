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
            var sidebar = $("#sidebar ul");
            sidebar.innerHTML = "";
            pop.list.forEach(function (user) {
                sidebar.appendChild(createUserElement(user)).show(100);
            });
        }, pop.load);
    },
    add: function (user) {
        if (!pop.count.hasOwnProperty(user)) {
            pop.count[user] = 1;
            pop.list.push(user);
            pop.list.sort();
            var pos = pop.list.indexOf(user);
            var sidebar = $("#sidebar ul");
            sidebar.insertBefore(createUserElement(user), sidebar.childNodes[pos]).show(100);
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
            var sidebar = $("#sidebar ul");
            sidebar.childNodes[pos].hide(100, function (e) {
                sidebar.removeChild(e);
            });
        }
    }
};

var chat = {
    messages: [],
    connect: function () {
        var wsurl = "ws" + /:.*\//.exec(location) + "wschat";
        chat.ws = new WebSocket(wsurl);
        chat.ws.onopen = pop.load;
        chat.ws.onmessage = chat.recv;
    },
    recv: function (message) {
        message = JSON.parse(message.data);
        chat.messages.push(message);
        if (message.type == 1) {
            pop.add(message.sender);
        } else if (message.type == 2) {
            pop.remove(message.sender);
        } else if (message.type == 3) {
            var chatlog = $("#chatlog");
            chatlog.appendChild(createMsgElement(message)).show(100);
            chatlog.scrollTop = chatlog.scrollHeight;
        }
    },
    send: function (message) {
        chat.ws.send(JSON.stringify({type: 3, msg: message}));
    },
    fetch: function () {
        var param = {};
        if (chat.messages.length > 0) param.from = chat.messages[0].stamp;
        $.get("a/history", param, function (res) {
            if (res.err != 0) {
                chat.fetch();
                return;
            }
            var chatlog = $("#chatlog");
            var loadmore = $(".load-more");
            if (loadmore) chatlog.removeChild(loadmore);
            res.result.forEach(function (message) {
                chat.messages.unshift(message);
                if (message.type == 3) {
                    chatlog.insertBefore(createMsgElement(message), chatlog.firstChild).show(100);
                    chatlog.scrollTop = 0;
                }
            });
            chatlog.insertBefore(createLoadMoreElement(res.result.length > 0), chatlog.firstChild).show(100);
            chatlog.scrollTop = 0;
        }, chat.fetch);
    }
};

function createUserElement(user) {
    var e = document.createElement("li");
    e.innerHTML = user;
    return e;
}

function createMsgElement(message) {
    var e = document.createElement("p");
    e.appendChild(document.createElement("strong"));
    e.firstChild.innerHTML = message.sender + ": ";
    e.innerHTML += message.msg;
    return e;
}

function createLoadMoreElement(hasMore) {
    var e = document.createElement("div");
    e.className = "load-more";
    e.appendChild(document.createElement("button"));
    if (hasMore) {
        e.firstChild.innerHTML = "加载更多";
        e.firstChild.addEventListener("click", function (e) {
            e.preventDefault();
            this.parentNode.replaceChild(createProgressElement(), this);
            setTimeout(chat.fetch, 300);
        });
    } else {
        e.firstChild.innerHTML = "到顶了...";
        e.firstChild.setAttribute("disabled", "");
    }
    return e;
}

function createProgressElement() {
    var e = document.createElement("div");
    e.className = "progress-container";
    e.appendChild(document.createElement("div"));
    e.firstChild.className = "progress";
    return e;
}

$.ready(function () {
    chat.fetch();
    chat.connect();
    $("main form button").addEventListener("click", function (e) {
        e.preventDefault();
        var input = $("input");
        if (input.value.length > 0) chat.send(input.value);
        input.value = "";
        input.focus();
    });
});