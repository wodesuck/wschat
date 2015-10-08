function register() {
    $(".alert").hide(100);
    var username = $("input[type='text']").value;
    var password = $("input[name='password']").value;
	var passwordrepeat = $("input[name='passwordrepeat']").value;
	if(username == "" || password == ""){
		$("#msg").innerHTML = " 账号密码不能为空" ;
		$(".alert").show(100);
	}else if(password != passwordrepeat){
		$("#msg").innerHTML = " 密码不一致" ;
		$(".alert").show(100);
	}else {
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
}

$.ready(function () {
    $(".alert").hide();
    $("button").addEventListener("click", function(e) {
        e.preventDefault();
        register();
    });
});
