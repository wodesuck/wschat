package dao;

import java.sql.*;

public class MySqlConnection implements DataConnection {
    private Connection conn;
    private String DBName = "";

    public MySqlConnection(String DBName) {
        this.DBName = DBName;
        connect();
    }

    private void connect() {
        String connectString = "jdbc:mysql://localhost:3306/" + DBName +
                "?autoReconnect=true&useUnicode=true&characterEncoding=UTF-8";
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(connectString, "user", "123456");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ResultSet executeQuery(String sqlSentence) {
        try {
            Statement stat = conn.createStatement();
            return stat.executeQuery(sqlSentence);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean isUnique(String table, String field, String value) {
        String sql = String.format("SELECT COUNT(*) as count FROM `%s` WHERE `%s`='%s'", table, field, value);
        ResultSet rs = executeQuery(sql);
        try {
            rs.next();
            return rs.getInt("count") == 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean executeUpdate(String sqlSentence) {
        try {
            Statement stat = conn.createStatement();
            return stat.executeUpdate(sqlSentence) > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public int getLastAutoId() {
        try {
            ResultSet rs = executeQuery("SELECT LAST_INSERT_ID() as id");
            rs.next();
            return rs.getInt("id");
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }
}
