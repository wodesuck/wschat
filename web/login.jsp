<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>wschat - 登录</title>
    <meta charset="utf-8">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/login.css" rel="stylesheet">
</head>
<body>
<form>
    <input class="block" type="text" placeholder="用户名" autofocus>
    <input class="block" type="password" placeholder="密码">
    <button class="btn block">登录</button>
    <div class="alert show hide">
        <strong>登录失败！</strong><span id="msg"></span>
    </div>
</form>
<script src="js/lib.js"></script>
<script src="js/login.js"></script>
</body>
</html>
