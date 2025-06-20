import "./UserChat.css";
import { IoIosSend } from "react-icons/io";

export default function UserChat() {
  return (
    <div id="shop-user-messanger-chat-wrapper">
      <div id="shop-user-messanger-customers-container">
        <div className="shop-user-messanger-customer-fragment">
          <div>
            <img
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
          </div>
          <div className="shop-user-messenger-customer-details">
            <h3>Vladimir Metodiev</h3>
            <p>Hello, i have a question...</p>
          </div>
        </div>
      </div>
      <div id="shop-user-messanger-chat-container">
        <div className="user-chat-header">
          <p>Vladimir Metodiev</p>
        </div>

        <div className="user-chat-body">
          <div className="user-chat-body-owner">
            <p>Hi!</p>
          </div>
          <div className="user-chat-body-custommer">
            <div className="user-chat-body-custommer-image-container">
              <img
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
            </div>
            <div className="user-chat-body-custommer-message-data">
              <p>Vladimir Metodiev</p>
              <div className="user-chat-body-custommer-message">
                <h4>Hello!</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="user-chat-footer">
          <div id="user-send-message-input">
            <input type="text" placeholder="Type a message..." />
          </div>
          <div id="user-send-message-icon-container">
            <IoIosSend id="user-send-message-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
