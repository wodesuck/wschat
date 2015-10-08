<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>wschat - 注册</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/register.css" rel="stylesheet">
</head>
<body>
<form>
    <input type="text"  placeholder="用户名" autofocus>
    <input type="password" name="password" placeholder="密码">
	<input type="password" name="passwordrepeat" placeholder="再次输入密码">
    <button type="submit">注册</button>
    <a href="login.jsp">已有帐号？登录</a>
    <div class="alert">
        <strong>注册失败!</strong><span id="msg"></span>
    </div>
</form>
<script src="js/lib.js"></script>
<script src="js/register.js"></script>
</body>
</html>
