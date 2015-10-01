package wsapp;

import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint(value = "/wschat", configurator = WsChatConfigurator.class)
public class WsChat {
    private static Set<Session> sessions = Collections.newSetFromMap(new ConcurrentHashMap<>());
    private String username = null;

    @OnOpen
    public void onOpen(Session session, EndpointConfig config) throws IOException {
        HttpSession httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        if (httpSession != null) {
            username = (String) httpSession.getAttribute("username");
        }
        if (username == null) {
            session.close();
        }
        sessions.add(session);
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
    }

    @OnMessage
    public void onMessage(String msg) throws IOException {
        for (Session session : sessions) {
            session.getBasicRemote().sendText(msg);
        }
    }
}
