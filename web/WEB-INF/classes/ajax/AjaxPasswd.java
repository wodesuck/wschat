package ajax;

import com.google.gson.Gson;
import dao.MySqlConnection;
import dao.SqlUserDao;
import dao.User;
import dao.UserDao;
import org.apache.commons.codec.digest.DigestUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/a/passwd")
public class AjaxPasswd extends HttpServlet {
    class Ret {
        int err;
        String msg;

        public Ret(int err, String msg) {
            this.err = err;
            this.msg = msg;
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();

        String password = request.getParameter("password");
        String oldPassword = request.getParameter("oldpassword");
        if (password == null || oldPassword == null) {
            gson.toJson(new Ret(-10, "wrong parameters"), out);
            return;
        }

        UserDao userDao = new SqlUserDao(new MySqlConnection("wschat"));
        User user = null;
        String username = null;
        HttpSession session = request.getSession(false);
        if (session != null) {
            username = (String) session.getAttribute("username");
        }
        if (username != null) {
            user = userDao.find(username);
        }
        if (user == null) {
            gson.toJson(new Ret(-1, "not login"), out);
            return;
        }

        if (!user.getPassword().equals(DigestUtils.md5Hex(oldPassword + User.SALT))) {
            gson.toJson(new Ret(-2, "wrong password"), out);
            return;
        }

        user.setPassword(DigestUtils.md5Hex(password + User.SALT));
        if (!userDao.update(user)) {
            gson.toJson(new Ret(-3, "update failed"), out);
            return;
        }

        gson.toJson(new Ret(0, "success"), out);
    }
}
