function login() {
    $(".alert").hide(100);
    var oldpassword = $("input[name='oldpassword']").value;
    var password = $("input[name='newpassword']").value;
    $.post("a/passwd", {oldpassword: oldpassword, password: password}, function (res) {
        if (res.err == 0) {
            location = /.*\//.exec(location) ;
        } else {
            if (res.err == -1) {
                $("#msg").innerHTML = "请先登录";
                $("input[type='password']").value = "";
                $("input[type='password']").focus();
            } else if (res.err == -2) {
                $("#msg").innerHTML = "旧密码错误";
                $("input[type='password']").value = "";
                $("input[type='password']").focus();
            } else if (res.err == -3) {
				$("#msg").innerHTML = "更新失败";
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
    $("button").addEventListener("click", function(e) {
        e.preventDefault();
        login();
    });
});
