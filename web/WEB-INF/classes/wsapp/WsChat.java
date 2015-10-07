package wsapp;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.*;

import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@ServerEndpoint(value = "/wschat", configurator = WsChatConfigurator.class)
public class WsChat {
    private static Map<Session, String> sessions = new ConcurrentHashMap<>();
    private static AtomicInteger stamp = new AtomicInteger();
    private String username = null;

    static {
        MessageDao messageDao = new SqlMessageDao(new MySqlConnection("wschat"));
        List<Message> messages = messageDao.get(1);
        if (messages.size() > 0) {
            stamp = new AtomicInteger(messages.get(0).getStamp());
        }
    }

    @OnOpen
    public void onOpen(Session session, EndpointConfig config) throws IOException {
        HttpSession httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        if (httpSession != null) {
            username = (String) httpSession.getAttribute("username");
        }
        if (username == null) {
            session.close();
            return;
        }
        sessions.put(session, username);

        Message message = new Message();
        message.setType(1);
        message.setMsg("online");
        broadcast(message);
    }

    @OnClose
    public void onClose(Session session) {
        if (username == null) {
            return;
        }
        sessions.remove(session);

        Message message = new Message();
        message.setType(2);
        message.setMsg("offline");
        broadcast(message);
    }

    @OnMessage
    public void onMessage(String msg) {
        Gson gson = new Gson();
        Message message = gson.fromJson(msg, Message.class);
        broadcast(message);
    }

    void broadcast(Message message) {
        message.setSender(username);
        message.setStamp(stamp.incrementAndGet());

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(message);
        for (Session session : sessions.keySet()) {
            try {
                session.getBasicRemote().sendText(json);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        if (message.getType() > 2) {
            MessageDao messageDao = new SqlMessageDao(new MySqlConnection("wschat"));
            messageDao.insert(message);
        }
    }

    static public Collection<String> getParticipants() {
        return sessions.values();
    }
}
