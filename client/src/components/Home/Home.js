import "./Home.css";
import { useNavigate } from "react-router-dom";
import EmailSubscribtion from "../EmailSubscription/EmailSubscription";

export default function Home() {
  const navigate = useNavigate();

  const handleApparel = (e, option) => {
    e.preventDefault();

    navigate("/apparel", { state: option });
  };
  return (
    <>
      <div id="home-image-wrapper">
        <div id="collection-selection-buttons">
          <div
            onClick={(e) => handleApparel(e, "woman")}
            id="collection-man-section"
          >
            <div className="apparel-picture-overlay"></div>
            <button class="apparel-collection-button">Shop Men's</button>
          </div>
          <div
            onClick={(e) => handleApparel(e, "woman")}
            id="collection-woman-section"
          >
            <div className="apparel-picture-overlay"></div>
            <button class="apparel-collection-button">Shop Women's</button>
          </div>
        </div>
      </div>
      <EmailSubscribtion />
    </>
  );
}
