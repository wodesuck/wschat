function passwd() {
    $(".alert").hide(100);
    var oldpassword = $("input[name='oldpassword']").value;
    var password = $("input[name='newpassword']").value;
    var passwordrepeat = $("input[name='newpasswordrepeat']").value;
    if (oldpassword == "" || password == "") {
        $("#msg").innerHTML = " 密码不能为空 ";
        if (oldpassword == "") {
            $("input[name='oldpassword']").focus();
        } else {
            $("input[name='newpassword']").focus();
        }
        $(".alert").show(100);
    } else if (password != passwordrepeat) {
        $("#msg").innerHTML = " 两次密码不一致 ";
        $("input[name='newpassword']").value = "";
        $("input[name='newpasswordrepeat']").value = "";
        $("input[name='newpassword']").focus();
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
                    $("input[name='oldpassword']").value = "";
                    $("input[name='oldpassword']").focus();
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
