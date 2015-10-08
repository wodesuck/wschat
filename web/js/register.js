function register() {
    $(".alert").hide(100);
    var username = $("input[type='text']").value;
    var password = $("input[type='password']").value;
    $.post("a/register", {username: username, password: password}, function (res) {
        if (res.err == 0) {
            location = /.*\//.exec(location) ;
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

$.ready(function () {
    $(".alert").hide();
    $("button").addEventListener("click", function(e) {
        e.preventDefault();
        register();
    });
});
