package dao;

import java.util.List;

public interface MessageDao {
    boolean insert(Message message);

    List<Message> get(int num);

    List<Message> get(int num, int from);
}
