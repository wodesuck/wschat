<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    request.setCharacterEncoding("utf-8");
    String username = (String) session.getAttribute("username");
    if (username == null) {
        response.sendRedirect("login.jsp");
        return;
    }
%>
<!DOCTYPE html>
<html>
<head>
    <title>wschat</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/chat.css" rel="stylesheet">
</head>
<body>
<header>
    <div class="header-container">
        <h1 class="left">wschat</h1>
        <hgroup class="right">
            <span><%=username%></span>
            <a href="passwd.jsp">修改密码</a>
            <a href="logout.jsp">登出</a>
        </hgroup>
        <div class="clear"></div>
    </div>
</header>
<main class="left">
    <div id="chatlog"></div>
    <form>
        <div class="input-container"><input type="text" autofocus></div>
        <button type="submit">发送</button>
    </form>
</main>
<div id="sidebar" class="right">
    <h2>在线用户</h2>
    <ul></ul>
</div>
<script src="js/lib.js"></script>
<script src="js/chat.js"></script>
</body>
</html>
