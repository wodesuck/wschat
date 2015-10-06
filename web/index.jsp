<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    request.setCharacterEncoding("utf-8");
    String username = (String) session.getAttribute("username");
    if (username == null) {
        response.sendRedirect("login.jsp");
        return;
    }
%>
<html>
<head>
    <title>wschat</title>
    <link href="css/style.css" rel="stylesheet">
    <link href="css/chat.css" rel="stylesheet">
</head>
<body>
<header>
    <div id="header-container">
        <h1 class="left">wschat</h1>
        <hgroup class="right">
            <span><%=username%></span>
            <a href="logout.jsp">登出</a>
        </hgroup>
        <div class="clear"></div>
    </div>
</header>
<main class="left">
    <div id="chatlog"></div>
    <div id="input-container"><input type="text" autofocus></div>
    <button>发送</button>
</main>
<div id="sidebar" class="right">
    <ul></ul>
</div>
<script src="js/lib.js"></script>
<script src="js/chat.js"></script>
</body>
</html>
