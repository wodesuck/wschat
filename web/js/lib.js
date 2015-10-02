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

$.ajax = function (options) {
    var request = new XMLHttpRequest();
    request.open(options.type, options.url, true);
    if (options.type == "POST" || options.type == "post") {
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }

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

    if (options.data) {
        var params = [];
        for (var p in options.data) {
            if (options.data.hasOwnProperty(p)) {
                params.push(encodeURIComponent(p) + "=" + encodeURIComponent(options.data[p]));
            }
        }
        request.send(params.join("&"));
    } else {
        request.send();
    }
};

$.get = function (url, data, success) {
    $.ajax({
        type: "GET",
        url: url,
        data: data,
        success: success
    })
};

$.post = function (url, data, success) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: success
    })
};