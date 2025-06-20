import "./UserChat.css";
import { IoIosSend } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { getAllClientConversations } from "../../services/chatServices";
import { useUser } from "../../contexts/UserContext";

const username = "Vladimir Metodiev";

const socket = io("http://localhost:5001");

export default function UserChat() {
  const { user } = useUser();
  const location = useLocation();
  const { shop, productId, client: stateClient } = location.state || {};
  const client = stateClient || user._id;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchUserConversations = async () => {
      const response = await getAllClientConversations(user._id);
      setConversations(response);

      if (shop && productId) {
        const existingConv = response.find(
          (conv) =>
            conv.shopId === shop &&
            conv.productId === productId &&
            conv.participants.some((p) => p._id === client)
        );

        if (existingConv) {
          setConversationId(existingConv._id);
          setSelectedConversation(existingConv);
          socket.emit("join room", { conversationId: existingConv._id });
          socket.emit("load messages", { conversationId: existingConv._id });
        } else {
          socket.emit("create conversation", {
            userId: client,
            shopId: shop,
            productId,
          });
        }
      }
    };

    fetchUserConversations();

    socket.on("conversation joined", (id) => {
      if (!id) return;
      setConversationId(id);
      socket.emit("load messages", { conversationId: id });
      getAllClientConversations(user._id).then(setConversations);
    });

    socket.on("messages", (msgs) => {
      setMessages(msgs);
      scrollToBottom();
    });

    socket.on("new message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("conversation joined");
      socket.off("messages");
      socket.off("new message");
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!text.trim()) return;

    const optimisticMsg = {
      _id: `temp-${Date.now()}`,
      sender: { _id: client, username },
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMsg]);

    if (!conversationId) {
      // Wait for conversation to be created/joined first
      const handleJoined = (id) => {
        socket.emit("send message", {
          conversationId: id,
          senderId: client,
          userId: client,
          shopId: shop,
          productId,
          text,
        });
        socket.off("conversation joined", handleJoined);
        setConversationId(id);
      };
      socket.on("conversation joined", handleJoined);

      socket.emit("join conversation", {
        userId: client,
        shopId: shop,
        productId,
      });
    } else {
      socket.emit("send message", {
        conversationId,
        senderId: client,
        userId: client,
        shopId: shop,
        productId,
        text,
      });
    }

    setText("");
  };

  return (
    <div id="shop-user-messanger-chat-wrapper">
      <div id="shop-user-messanger-customers-container">
        {conversations.map((conv) => {
          const otherParticipant = conv.participants.find(
            (p) => p._id !== user._id
          );
          return (
            <div
              key={conv._id}
              className="shop-user-messanger-customer-fragment"
              onClick={() => {
                socket.emit("join room", { conversationId: conv._id });
                setSelectedConversation(conv);
                setConversationId(conv._id);

                // Load messages explicitly
                socket.emit("load messages", { conversationId: conv._id });
              }}
            >
              <div>
                <img
                  src={
                    otherParticipant?.image ||
                    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60"
                  }
                  alt=""
                />
              </div>
              <div className="shop-user-messenger-customer-details">
                <h3>{otherParticipant?.username || "Unnamed"}</h3>
                <p>{conv.productId?.productName || "Product chat"}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div id="shop-user-messanger-chat-container">
        <div className="user-chat-header">
          <p>
            {selectedConversation?.participants.find((p) => p._id !== user._id)
              ?.username || "Select a chat"}
          </p>
        </div>

        <div className="user-chat-body">
          {messages.map((msg) =>
            msg.sender._id.toString() === client.toString() ? (
              <div key={msg._id} className="user-chat-body-owner">
                <p>{msg.text}</p>
                <span className="chat-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ) : (
              <div key={msg._id} className="user-chat-body-custommer">
                <div className="user-chat-body-custommer-image-container">
                  <img
                    src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60"
                    alt=""
                  />
                </div>
                <div className="user-chat-body-custommer-message-data">
                  <p>{msg.sender.username}</p>
                  <div className="user-chat-body-custommer-message">
                    <h4>{msg.text}</h4>
                    <span className="chat-time">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="user-chat-footer">
          <div id="user-send-message-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
          </div>
          <div id="user-send-message-icon-container" onClick={sendMessage}>
            <IoIosSend id="user-send-message-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
