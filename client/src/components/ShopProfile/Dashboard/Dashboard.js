import "./Dashboard.css";
import { IoCalendarOutline, IoHeart } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
export default function Dashboard({ shopData }) {
  return (
    <div id="dashboard-shop-wrapper">
      <div id="dashboard-shop-data">
        <div id="dashboard-shop-data-image-container">
          <img src={shopData.logo} alt={shopData.name} />
        </div>
        <div id="dashboard-shop-data-name-container">
          <p>What's new, {shopData.name}?</p>
          <p id="dashboard-shop-default-info">
            0 sales | {shopData.listings.length} active listings
          </p>
        </div>
      </div>
      <div id="dashboard-shop-info-boxes-container">
        <div className="dashboard-shop-info-box-container">
          <div id="dashboard-shop-info-box-title">
            <p>Total Views:</p>
          </div>
          <div id="dashboard-shop-info-box-counter">
            <p>{shopData.views}</p>
          </div>
        </div>
        <div className="dashboard-shop-info-box-container">
          <div id="dashboard-shop-info-box-title">
            <p>Listings:</p>
          </div>
          <div id="dashboard-shop-info-box-counter">
            <p>{shopData.listings.length}</p>
          </div>
        </div>
        <div className="dashboard-shop-info-box-container">
          <div id="dashboard-shop-info-box-title">
            <p>Orders:</p>
          </div>
          <div id="dashboard-shop-info-box-counter">
            <p>{shopData.orders.length}</p>
          </div>
        </div>
        <div className="dashboard-shop-info-box-container">
          <div id="dashboard-shop-info-box-title">
            <p>Revenue in:</p>
          </div>
          <div id="dashboard-shop-info-box-counter">
            <p>USD: {shopData.revenue}</p>
          </div>
        </div>
      </div>
      <div id="dashboard-activity">
        <h2>Resent Activity:</h2>
        {shopData.activity.length > 0 ? (
          <div id="dashboard-shop-activities-wrapper">
            <div className="dashboard-shop-activity-card">
              <div className="dashboard-shop-image-container">
                <img
                  src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/6ca23f73-976a-47c0-86f9-a6a7ab527130/AIR+MAX+PLUS+DRIFT.png"
                  alt=""
                />
              </div>
              <div className="dashboard-shop-activity-message-data-container">
                <div className="dashboard-shop-activity-message">
                  <p>Brandon favourited your item: Nike hoodie</p>
                </div>
                <div className="dashboard-shop-activity-data">
                  <div className="dashboard-shop-activity-icon">
                    <p>
                      <IoCalendarOutline />
                    </p>
                  </div>
                  <div className="dashboard-shop-activity-date">
                    <p>05.01.2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>There is no activity yet!</div>
        )}
      </div>

      <div id="dashboard-load-activity-container">
        <div id="dashboard-button-wrapper">
          <button>
            <FaPlus id="dashboard-button-plus" />
            <span id="dashboard-button-text">Show more</span>
          </button>
        </div>
      </div>
    </div>
  );
}
