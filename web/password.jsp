<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>wschat - 修改密码</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/login.css" rel="stylesheet">
</head>
<body>
<form>
    <input type="password" name="oldpassword" placeholder="旧密码" autofocus>
    <input type="password" name="newpassword" placeholder="新密码">
	<input type="password" name="newpasswordrepeat" placeholder="再次输入新密码">
    <button type="submit">修改</button>
    <div class="alert">
        <strong>修改失败！</strong><span id="msg"></span>
    </div>
</form>
<script src="js/lib.js"></script>
<script src="js/password.js"></script>
</body>
</html>
