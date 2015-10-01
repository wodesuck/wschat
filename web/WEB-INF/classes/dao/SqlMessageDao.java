package dao;

import java.sql.*;
import java.util.*;

public class SqlMessageDao implements MessageDao {
    private DataConnection conn;

    public SqlMessageDao(DataConnection conn) {
        this.conn = conn;
    }

    @Override
    public boolean insert(Message message) {
        String sql = String.format("INSERT INTO message(type,sender,msg,stamp) VALUES(%d,'%s','%s',%d)",
                message.getType(), message.getSender(), message.getMsg(), message.getStamp());
        if (conn.executeUpdate(sql)) {
            message.setId(conn.getLastAutoId());
            return true;
        }
        return false;
    }

    @Override
    public List<Message> get(int num) {
        return get(num, -1);
    }

    @Override
    public List<Message> get(int num, int from) {
        String sql;
        if (from == -1) {
            sql = String.format("SELECT * from message ORDER BY stamp DESC LIMIT %d", num);
        } else {
            sql = String.format("SELECT * from message WHERE stamp<%d ORDER BY stamp DESC LIMIT %d", from, num);
        }
        ResultSet rs = conn.executeQuery(sql);
        ArrayList<Message> messages = new ArrayList<>();
        try {
            while (rs.next()) {
                Message message = new Message();
                message.setId(rs.getInt("id"));
                message.setType(rs.getInt("type"));
                message.setSender(rs.getString("sender"));
                message.setMsg(rs.getString("msg"));
                message.setStamp(rs.getInt("stamp"));
                messages.add(message);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        return messages;
    }
}
