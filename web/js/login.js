function login() {
    $(".alert").hide(100);
    var username = $("input[type='text']").value;
    var password = $("input[type='password']").value;
    $.post("a/login", {username: username, password: password}, function (res) {
        if (res.err == 0) {
            window.location = "index.jsp";
        } else {
            if (res.err == -1) {
                $("#msg").innerHTML = "用户不存在";
                $("input[type='text']").value = "";
                $("input[type='text']").focus();
            } else if (res.err == -2) {
                $("#msg").innerHTML = "密码错误";
                $("input[type='password']").value = "";
                $("input[type='password']").focus();
            } else {
                $("#msg").innerHTML = "未知错误";
            }
            $(".alert").show(100);
        }
    })
}

$.ready(function () {
    $(".alert").hide();
    $(".btn").addEventListener("click", function(e) {
        e.preventDefault();
        login();
    });
});
