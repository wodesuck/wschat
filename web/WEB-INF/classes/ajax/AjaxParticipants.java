package ajax;

import com.google.gson.Gson;
import wsapp.WsChat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;

@WebServlet("/a/participants")
public class AjaxParticipants extends HttpServlet {
    class Ret {
        int ret;
        String msg;
        Collection<String> result;

        public Ret(int ret, String msg, Collection<String> result) {
            this.ret = ret;
            this.msg = msg;
            this.result = result;
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        gson.toJson(new Ret(0, "success", WsChat.getParticipants()), out);
    }
}
