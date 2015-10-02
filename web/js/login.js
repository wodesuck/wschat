function login() {
    $("#login-form .alert").classList.add("hide");
    var username = $("#username").value;
    var password = $("#password").value;
    $.post("a/login", {username: username, password: password}, function (res) {
        if (res.err == 0) {
            window.location = "index.jsp";
        } else {
            if (res.err == -1) {
                $("#msg").innerHTML = "用户不存在";
                $("#username").value = "";
                $("#password").value = "";
                $("#username").focus();
            } else if (res.err == -2) {
                $("#msg").innerHTML = "密码错误";
                $("#password").value = "";
                $("#password").focus();
            } else {
                $("#msg").innerHTML = "未知错误";
            }
            $("#login-form .alert").classList.remove("hide");
        }
    })
}

$.ready(function () {
    $("#login-form button").addEventListener("click", function(e) {
        e.preventDefault();
        login();
    });
});
