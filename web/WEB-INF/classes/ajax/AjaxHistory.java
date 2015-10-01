package ajax;

import com.google.gson.Gson;
import dao.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/a/history")
public class AjaxHistory extends HttpServlet {
    class Ret {
        int err;
        String msg;
        List<Message> result;

        public Ret(int err, String msg, List<Message> result) {
            this.err = err;
            this.msg = msg;
            this.result = result;
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        int num = 10;
        int from = -1;
        try {
            num = Integer.parseInt(request.getParameter("num"));
            from = Integer.parseInt(request.getParameter("from"));
        } catch (NumberFormatException ignored) {

        }
        MessageDao messageDao = new SqlMessageDao(new MySqlConnection("wschat"));
        List<Message> messages;
        if (from == -1) {
            messages = messageDao.get(num);
        } else {
            messages = messageDao.get(num, from);
        }

        Gson gson = new Gson();
        gson.toJson(new Ret(0, "success", messages), out);
    }
}
