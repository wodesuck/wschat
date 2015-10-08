function passwd() {
    $(".alert").hide(100);
    var oldpassword = $("input[name='password-old']").value;
    var password = $("input[name='password']").value;
    var passwordRepeat = $("input[name='password-repeat']").value;
    if (oldpassword == "" || password == "") {
        $("#msg").innerHTML = " 密码不能为空 ";
        if (oldpassword == "") {
            $("input[name='password-old']").focus();
        } else {
            $("input[name='password']").focus();
        }
        $(".alert").show(100);
    } else if (password != passwordRepeat) {
        $("#msg").innerHTML = " 两次密码不一致 ";
        $("input[name='password']").value = "";
        $("input[name='password-repeat']").value = "";
        $("input[name='password']").focus();
        $(".alert").show(100);
    } else {
        $.post("a/passwd", {oldpassword: oldpassword, password: password}, function (res) {
            if (res.err == 0) {
                location = /.*\//.exec(location);
            } else {
                if (res.err == -1) {
                    $("#msg").innerHTML = "请先登录";
                } else if (res.err == -2) {
                    $("#msg").innerHTML = "旧密码错误";
                    $("input[name='password-old']").value = "";
                    $("input[name='password-old']").focus();
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
        passwd();
    });
});
