import "./ShopMessanger.css";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { IoIosSend } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useUser } from "../../contexts/UserContext";
import { getAllShopConversations } from "../../services/chatServices";

const socket = io("http://localhost:5001");

export default function ShopMessanger() {
  const { user } = useUser();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchConversations = async () => {
      const convs = await getAllShopConversations(user._id);
      setConversations(convs);
      if (convs.length > 0) {
        selectConversation(convs[0]);
      }
    };
    fetchConversations();

    socket.on("conversation joined", (id) => {
      if (!id) return;
      socket.emit("load messages", { conversationId: id });
    });

    socket.on("messages", (msgs) => {
      setMessages(msgs);
      scrollToBottomIfNearEnd();
    });

    socket.on("new message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottomIfNearEnd();
    });

    return () => {
      socket.off("conversation joined");
      socket.off("messages");
      socket.off("new message");
    };
  }, [user]);

  useEffect(() => {
    const container = document.querySelector(".chat-body");
    if (!container) return;

    const onScroll = () => {
      const threshold = 150;
      const scrollPosition = container.scrollTop + container.clientHeight;
      const scrollHeight = container.scrollHeight;

      if (scrollHeight - scrollPosition < threshold) {
        setAutoScrollEnabled(true);
      } else {
        setAutoScrollEnabled(false);
      }
    };

    container.addEventListener("scroll", onScroll);

    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const selectConversation = (conv) => {
    setSelectedConversation(conv);
    setMessages([]);
    socket.emit("join room", { conversationId: conv._id });
    setAutoScrollEnabled(true);

    const container = document.querySelector(".chat-body");
    if (container) {
      container.scrollTop = 0;
    }
  };

  const sendMessage = () => {
    if (!text.trim() || !selectedConversation) return;

    socket.emit("send message", {
      conversationId: selectedConversation._id,
      senderId: user._id,
      userId: selectedConversation.participants.find((p) => p._id !== user._id)
        ._id,
      shopId: user._id,
      productId: selectedConversation.productId?._id || null,
      text,
    });

    setText("");
  };

  const scrollToBottomIfNearEnd = () => {
    if (!autoScrollEnabled) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="shop-messanger-wrapper">
      <ShopProfileSidebar />

      <div id="shop-messanger-chat-wrapper">
        <div id="shop-messanger-customers-container">
          {conversations.map((conv) => {
            const otherParticipant = conv.participants.find(
              (p) => p._id !== user._id
            );
            return (
              <div
                key={conv._id}
                className="shop-messanger-customer-fragment"
                onClick={() => selectConversation(conv)}
                style={{
                  backgroundColor:
                    selectedConversation?._id === conv._id ? "#eee" : "white",
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
                <div className="shop-messenger-customer-details">
                  <h3>{otherParticipant?.username || "Unnamed"}</h3>
                  <p>{conv.productId?.productName || "Product chat"}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div id="shop-messanger-chat-container">
          <div className="chat-header">
            <p>
              {selectedConversation
                ? selectedConversation.participants.find(
                    (p) => p._id !== user._id
                  )?.username
                : "Select a chat"}
            </p>
          </div>

          <div className="chat-body">
            {messages.map((msg) =>
              msg.sender._id === user._id ? (
                <div key={msg._id} className="chat-body-owner">
                  <p>{msg.text}</p>
                  <span className="chat-time">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ) : (
                <div key={msg._id} className="chat-body-custommer">
                  <div className="chat-body-custommer-image-container">
                    <img
                      src={
                        selectedConversation.participants.find(
                          (p) => p._id !== user._id
                        )?.image ||
                        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60"
                      }
                      alt=""
                    />
                  </div>
                  <div className="chat-body-custommer-message-data">
                    <p>{msg.sender.username}</p>

                    <div className="chat-body-custommer-message">
                      <h4>{msg.text}</h4>
                      <span className="chat-time">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <div id="send-message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
            </div>
            <div id="send-message-icon-container" onClick={sendMessage}>
              <IoIosSend id="send-message-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
