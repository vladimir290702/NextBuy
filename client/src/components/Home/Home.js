import "./Home.css";
import EmailSubscribtion from "../EmailSubscription/EmailSubscription";

export default function Home() {
  return (
    <>
      <div id="home-image-wrapper">
        <div id="title-wrapper">
          <h1>NEXT BUY</h1>
        </div>
        <div id="collection-selection-buttons">
          <div>
            <button className="collection-button">FOR HIM</button>
          </div>
          <div>
            <button className="collection-button">FOR HER</button>
          </div>
        </div>
      </div>
      <EmailSubscribtion />
    </>
  );
}
