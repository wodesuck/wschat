function $(selector) {
    return document.querySelector(selector);
}

$.ready = function (fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

function formatParams(params) {
    return Object
        .keys(params)
        .map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        })
        .join("&");
}

$.ajax = function (options) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                if (options.success) {
                    options.success(JSON.parse(this.responseText));
                }
            } else {
                if (options.error) {
                    options.error();
                }
            }
        }
    };

    var params = "";
    if (options.data) params = formatParams(options.data);
    if (options.type == "get" || options.type == "GET") {
        request.open(options.type, options.url + "?" + params, true);
        request.send();
    } else {
        request.open(options.type, options.url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(params);
    }
};

$.get = function (url, data, success, error) {
    $.ajax({
        type: "GET",
        url: url,
        data: data,
        success: success,
        error: error
    })
};

$.post = function (url, data, success, error) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: success,
        error: error
    })
};

Element.prototype.hide = function (time, fn) {
    if (time === undefined) time = 0;
    var e = this;
    e.style.transform = "";
    setTimeout(function () {
        e.style.transitionDuration = time + "ms";
        e.style.transform = "scale(0)";
    }, 0);
    setTimeout(function () {
        e.removeAttribute("style");
        e.style.display = "none";
        if (fn) fn(e);
    }, time);
};

Element.prototype.show = function (time, fn) {
    if (time === undefined) time = 0;
    var e = this;
    e.style.display = "";
    e.style.transform = "scale(0)";
    setTimeout(function () {
        e.style.transitionDuration = time + "ms";
        e.style.transform = "";
    }, 0);
    setTimeout(function () {
        e.removeAttribute("style");
        if (fn) fn(e);
    }, time);
};
