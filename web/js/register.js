function register() {
    $(".alert").hide(100);
    var username = $("input[type='text']").value;
    var password = $("input[name='password']").value;
    var passwordRepeat = $("input[name='password-repeat']").value;
    if (username == "" || password == "") {
        $("#msg").innerHTML = " 账号密码不能为空";
        if (username == "") {
            $("input[type='text']").focus();
        } else {
            $("input[name='password']").focus();
        }
        $(".alert").show(100);
    } else if (password != passwordRepeat) {
        $("#msg").innerHTML = " 密码不一致";
        $("input[name='password']").value = "";
        $("input[name='password-repeat']").value = "";
        $("input[name='password']").focus();
        $(".alert").show(100);
    } else {
        $.post("a/register", {username: username, password: password}, function (res) {
            if (res.err == 0) {
                location = /.*\//.exec(location);
            } else {
                if (res.err == -1) {
                    $("#msg").innerHTML = "用户已经被注册!";
                    $("input[type='text']").value = "";
                    $("input[type='text']").focus();
                } else {
                    $("#msg").innerHTML = "未知错误";
                }
                $(".alert").show(100);
            }
        })
    }
}

$.ready(function () {
    $(".alert").hide();
    $("button").addEventListener("click", function (e) {
        e.preventDefault();
        register();
    });
});
