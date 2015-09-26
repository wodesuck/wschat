package wsapp;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.HashSet;

@ServerEndpoint("/wschat")
public class WsChat {
    private static HashSet<Session> sessions = new HashSet<>();

    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
    }

    @OnMessage
    public void onMessage(String msg) {
        try {
            for (Session session : sessions) {
                session.getBasicRemote().sendText(msg);
            }
        } catch (Exception e) {

        }
    }
}
