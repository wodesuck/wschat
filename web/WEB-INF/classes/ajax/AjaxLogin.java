package ajax;

import com.google.gson.Gson;
import dao.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/a/login")
public class AjaxLogin extends HttpServlet {
    class Ret {
        int err;
        String msg;

        Ret(int err, String msg) {
            this.err = err;
            this.msg = msg;
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if (username == null || password == null) {
            gson.toJson(new Ret(-10, "wrong parameters"), out);
            return;
        }
        UserDao userDao = new SqlUserDao(new MySqlConnection("wschat"));
        User user = userDao.find(username);
        if (user == null) {
            gson.toJson(new Ret(-1, "user not found"), out);
            return;
        }
        if (!user.getPassword().equals(password)) {
            gson.toJson(new Ret(-2, "wrong password"), out);
            return;
        }
        HttpSession session = request.getSession();
        session.setAttribute("username", username);
        gson.toJson(new Ret(0, "success"), out);
    }
}
