package dao;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class SqlUserDaoTest {
    DataConnection conn;
    SqlUserDao userDao;

    @Before
    public void setUp() throws Exception {
        conn = new MySqlConnection("wschat");
        userDao = new SqlUserDao(conn);
        conn.executeUpdate("INSERT INTO user(username, password) VALUES('TestUser', 'TestPassword')");
    }

    @After
    public void tearDown() throws Exception {
        conn.executeUpdate("DELETE FROM user WHERE username='TestUser'");
    }

    @Test
    public void testFind() throws Exception {
        User user = userDao.find("TestUser");
        assertNotNull(user);
        assertEquals("TestUser", user.getUsername());
        assertEquals("TestPassword", user.getPassword());
    }

    @Test
    public void testInsert() throws Exception {
        User user = new User();
        user.setUsername("TestUser");
        user.setPassword("password");
        assertFalse(userDao.insert(user));
        user.setUsername("TestUser2");
        assertTrue(userDao.insert(user));
        conn.executeUpdate("DELETE FROM user WHERE username='TestUser2'");
    }

    @Test
    public void testUpdate() throws Exception {
        User user = userDao.find("TestUser");
        user.setPassword("NewPassword");
        assertTrue(userDao.update(user));
        user = userDao.find("TestUser");
        assertEquals("NewPassword", user.getPassword());
    }
}