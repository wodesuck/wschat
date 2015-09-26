<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    request.setCharacterEncoding("utf-8");
    String url = request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
%>
<html>
<head>
    <title>wschat</title>
    <script>
        window.onload = function () {
            var chatlog = document.getElementById("chatlog");
            var msg = document.getElementById("msg");
            var sendbtn = document.getElementById("sendbtn");
            var ws = new WebSocket("ws://<%=url%>/wschat");
            ws.addEventListener("message", function (message) {
                chatlog.textContent += message.data + "\n";
            });
            sendbtn.addEventListener("click", function () {
                ws.send(msg.value);
                msg.value = "";
            });
        };
    </script>
    <style>
        body {
            width: 500px;
            margin: 100px auto;
            text-align: center;
        }
        #chatlog {
            width: 400px;
            height: 200px;
            margin: 10px auto;
        }
    </style>
</head>
<body>
<textarea id="chatlog" readonly></textarea>
<input id="msg" type="text">
<button id="sendbtn" type="submit">send</button>
</body>
</html>
