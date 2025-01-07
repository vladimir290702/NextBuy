import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import EmailSubscribtion from "../EmailSubscription/EmailSubscription";

export default function Home() {
  const navigate = useNavigate();

  const handleManApparel = (e) => {
    e.preventDefault();

    navigate("/apparel-man");
  };

  const handleWomanApparel = (e) => {
    e.preventDefault();

    navigate("/apparel-woman");
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
              onClick={(e) => handleManApparel(e)}
            >
              FOR HIM
            </Link>
          </div>
          <div>
            <Link
              className="collection-button"
              onClick={(e) => handleWomanApparel(e)}
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
