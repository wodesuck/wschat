package ajax;

        import com.google.gson.Gson;
        import dao.*;
        import org.apache.commons.codec.digest.DigestUtils;

        import javax.servlet.ServletException;
        import javax.servlet.annotation.WebServlet;
        import javax.servlet.http.HttpServlet;
        import javax.servlet.http.HttpServletRequest;
        import javax.servlet.http.HttpServletResponse;
        import javax.servlet.http.HttpSession;
        import java.io.IOException;
        import java.io.PrintWriter;

@WebServlet("/a/register")
public class AjaxRegister extends HttpServlet {
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
        response.setCharacterEncoding("utf-8");
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
        User user = new User();
        user.setUsername(username);
        user.setPassword(DigestUtils.md5Hex(password + User.SALT));
        if (!userDao.insert(user)) {
            gson.toJson(new Ret(-1, "user exists"), out);
            return;
        }
        HttpSession session = request.getSession();
        session.setAttribute("username", username);
        gson.toJson(new Ret(0, "success"), out);
    }
}
