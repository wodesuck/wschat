package dao;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class SqlMessageDaoTest {
    DataConnection conn;
    SqlMessageDao messageDao;

    @Before
    public void setUp() throws Exception {
        conn = new MySqlConnection("wschat");
        messageDao = new SqlMessageDao(conn);
    }

    @After
    public void tearDown() throws Exception {
        conn.executeUpdate("DELETE from message WHERE stamp>=100000");
    }

    @Test
    public void testInsert() throws Exception {
        Message message = new Message();
        message.setType(1);
        message.setSender("TestSender");
        message.setMsg("TestMsg");
        message.setStamp(100000);
        assertTrue(messageDao.insert(message));
    }

    @Test
    public void testGet() throws Exception {
        for (int i = 100000; i <= 100010; i++) {
            Message message = new Message();
            message.setType(1);
            message.setSender("TestSender");
            message.setMsg("TestMsg");
            message.setStamp(i);
            messageDao.insert(message);
        }
        int expectStamp = 100010;
        for (Message message : messageDao.get(5)) {
            assertEquals(expectStamp, message.getStamp());
            --expectStamp;
        }
        for (Message message : messageDao.get(5, 100006)) {
            assertEquals(expectStamp, message.getStamp());
            --expectStamp;
        }
    }
}