package dao;

import java.sql.*;

public interface DataConnection {
    ResultSet executeQuery(String sqlSentence);

    boolean executeUpdate(String sqlSentence);

    boolean isUnique(String table, String field, String value);

    int getLastAutoId();
}
