package dao;

public interface UserDao {
    User find(String username);

    boolean insert(User user);

    boolean update(User user);
}
