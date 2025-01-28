import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
        <div id="title-wrapper">
          <h1>NEXT BUY</h1>
        </div>
        <div id="collection-selection-buttons">
          <div>
            <Link
              className="collection-button"
              onClick={(e) => handleApparel(e, "man")}
            >
              FOR HIM
            </Link>
          </div>
          <div>
            <Link
              className="collection-button"
              onClick={(e) => handleApparel(e, "woman")}
            >
              FOR HER
            </Link>
          </div>
        </div>
      </div>
      <EmailSubscribtion />
    </>
  );
}
