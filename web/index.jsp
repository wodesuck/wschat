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
    <h1>wschat</h1>
    <span><%=username%></span>
    <a href="logout.jsp">logout</a>
</header>
<main>
    <div id="chatlog"></div>
    <input type="text" autofocus>
    <button class="btn">发送</button>
</main>
<div>
    <ul id="participants"></ul>
</div>
<script src="js/lib.js"></script>
<script src="js/chat.js"></script>
</body>
</html>
