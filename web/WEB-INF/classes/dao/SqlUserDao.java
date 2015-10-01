package dao;

import java.sql.*;

public class SqlUserDao implements UserDao {
    private DataConnection conn;

    public SqlUserDao(DataConnection conn) {
        this.conn = conn;
    }

    @Override
    public User find(String username) {
        String sql = String.format("SELECT * FROM user WHERE username='%s'", username);
        ResultSet rs = conn.executeQuery(sql);
        try {
            if (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("id"));
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                return user;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean insert(User user) {
        if (!conn.isUnique("user", "username", user.getUsername())) {
            return false;
        }
        String sql = String.format("INSERT INTO user(username, password) VALUES('%s','%s')",
                user.getUsername(), user.getPassword());
        if (conn.executeUpdate(sql)) {
            user.setId(conn.getLastAutoId());
            return true;
        }
        return false;
    }

    @Override
    public boolean update(User user) {
        String sql = String.format("UPDATE user SET password='%s' WHERE id=%d", user.getPassword(), user.getId());
        return conn.executeUpdate(sql);
    }
}
