import "./Dashboard.css";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { getShopData } from "../../services/createShop";
import { useUser } from "../../contexts/UserContext";
import Counter from "../Counter/Counter";
import ActivityCard from "./ActivityCard/ActivityCard";

export default function Dashboard() {
  const [shopData, setShopData] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchedShopData = async () => {
      const response = await getShopData(user?.username);

      setShopData(response?.shop);
    };
    fetchedShopData();
  }, []);

  return (
    <div id="shop-profile-wrapper">
      <ShopProfileSidebar />
      <div id="selected-shop-category">
        <div id="dashboard-shop-wrapper">
          <div id="dashboard-shop-data">
            <div id="dashboard-shop-data-image-container">
              <img src={shopData?.logo} alt={shopData?.name} />
            </div>
            <div id="dashboard-shop-data-name-container">
              <p>What's new, {shopData?.name}?</p>
              <p id="dashboard-shop-default-info">
                {shopData?.orders?.length} sales | {shopData?.listings?.length}{" "}
                active listings
              </p>
            </div>
          </div>
          <div id="dashboard-shop-info-boxes-container">
            <div className="dashboard-shop-info-box-container">
              <div id="dashboard-shop-info-box-title">
                <p>Total Views:</p>
              </div>
              <div id="dashboard-shop-info-box-counter">
                <Counter end={shopData?.views / 2} duration={2000} />
              </div>
            </div>
            <div className="dashboard-shop-info-box-container">
              <div id="dashboard-shop-info-box-title">
                <p>Listings:</p>
              </div>
              <div id="dashboard-shop-info-box-counter">
                <Counter end={shopData?.listings?.length} duration={2000} />
              </div>
            </div>
            <div className="dashboard-shop-info-box-container">
              <div id="dashboard-shop-info-box-title">
                <p>Orders:</p>
              </div>
              <div id="dashboard-shop-info-box-counter">
                <Counter end={shopData?.orders?.length} duration={2000} />
              </div>
            </div>
            <div className="dashboard-shop-info-box-container">
              <div id="dashboard-shop-info-box-title">
                <p>Revenue in:</p>
              </div>
              <div id="dashboard-shop-info-box-counter">
                <Counter end={shopData?.revenue.toFixed(2)} duration={2000} />
              </div>
            </div>
          </div>
          <div id="dashboard-activity">
            <h2>Resent Activity:</h2>
            {shopData?.activity?.length > 0 ? (
              shopData?.activity?.map((activity) => {
                return <ActivityCard activity={activity} />;
              })
            ) : (
              <div>There is no activity yet!</div>
            )}
          </div>

          {shopData?.activity?.length != 0 && shopData?.activity?.length > 4 ? (
            <div id="dashboard-load-activity-container">
              <div id="dashboard-button-wrapper">
                <button>
                  <FaPlus id="dashboard-button-plus" />
                  <span id="dashboard-button-text">Show more</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
