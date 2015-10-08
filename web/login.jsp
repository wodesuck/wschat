<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>wschat - 登录</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/login.css" rel="stylesheet">
</head>
<body>
<form>
    <input type="text" placeholder="用户名" autofocus>
    <input type="password" placeholder="密码">
    <button type="submit">登录</button>
    <div class="alert">
        <strong>登录失败！</strong><span id="msg"></span>
    </div>
</form>
<script src="js/lib.js"></script>
<script src="js/login.js"></script>
</body>
</html>
