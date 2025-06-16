import "./ShopMessanger.css";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { IoIosSend } from "react-icons/io";

export default function ShopMessanger() {
  return (
    <div id="shop-messanger-wrapper">
      <ShopProfileSidebar />
      <div id="shop-messanger-chat-wrapper">
        <div id="shop-messanger-customers-container">
          <div className="shop-messanger-customer-fragment">
            <div>
              <img
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
            </div>
            <div className="shop-messenger-customer-details">
              <h3>Vladimir Metodiev</h3>
              <p>Hello, i have a question...</p>
            </div>
          </div>
        </div>
        <div id="shop-messanger-chat-container">
          <div className="chat-header">
            <p>Vladimir Metodiev</p>
          </div>

          <div className="chat-body">
            <div className="chat-body-owner">
              <p>Hi!</p>
            </div>
            <div className="chat-body-custommer">
              <div className="chat-body-custommer-image-container">
                <img
                  src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                  alt=""
                />
              </div>
              <div className="chat-body-custommer-message-data">
                <p>Vladimir Metodiev</p>
                <div className="chat-body-custommer-message">
                  <h4>Hello!</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-footer">
            <div id="send-message-input">
              <input type="text" placeholder="Type a message..." />
            </div>
            <div id="send-message-icon-container">
              <IoIosSend id="send-message-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
