<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>wschat - 修改密码</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/passwd.css" rel="stylesheet">
</head>
<body>
<form>
    <input type="password" name="password-old" placeholder="旧密码" autofocus>
    <input type="password" name="password" placeholder="新密码">
	<input type="password" name="password-repeat" placeholder="再次输入新密码">
    <button type="submit">修改密码</button>
    <div class="alert">
        <strong>修改失败！</strong><span id="msg"></span>
    </div>
</form>
<script src="js/lib.js"></script>
<script src="js/passwd.js"></script>
</body>
</html>
