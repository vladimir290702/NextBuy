import "./Dashboard.css";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { BsChatRightText } from "react-icons/bs";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { getShopData } from "../../services/createShop";
import { useUser } from "../../contexts/UserContext";
import Counter from "../Counter/Counter";
import ActivityCard from "./ActivityCard/ActivityCard";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

export default function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [shopData, setShopData] = useState(null);
  const [activity, setActivity] = useState([]);
  const [activitiesCount, setActivitiesCount] = useState(null);
  const [loading, setLoading] = useState(shopData ? false : true);
  const [page, setPage] = useState(1);

  const visibleLoadButtonContainer =
    activitiesCount !== 0 &&
    activitiesCount > 3 &&
    activity.length !== activitiesCount;

  useEffect(() => {
    if (loading) {
      const fetchedShopData = async () => {
        setLoading(true);

        const response = await getShopData(user?.username, page);

        if (response) {
          setLoading(false);
          setActivity(response.activities);

          setActivitiesCount(response?.totalActivities);
          setShopData(response?.shop);
        } else {
          setLoading(false);
          setActivity([]);
          setActivitiesCount(null);
          setShopData(null);
        }
      };
      fetchedShopData();
    }
  }, [page]);

  const openShopMessanger = (e) => {
    e.preventDefault();

    navigate("/shop-messanger");
  };

  return (
    <div id="shop-profile-wrapper">
      <ShopProfileSidebar />
      <div id="dashboard-selected-shop-category">
        {loading ? (
          <div className="apparel-loader-container">
            <RingLoader color="#ff3c00" size={150} />
            <h2>Please wait your data is loading!</h2>
          </div>
        ) : (
          <div id="dashboard-shop-wrapper">
            <div id="dashboard-shop-data">
              <div id="dashboard-shop-data-main-info">
                <div id="dashboard-shop-data-image-container">
                  <img src={shopData?.logo} alt={shopData?.name} />
                </div>
                <div id="dashboard-shop-data-name-container">
                  <p>What's new, {shopData?.name}?</p>
                  <p id="dashboard-shop-default-info">
                    {shopData?.orders?.length} sales |{" "}
                    {shopData?.listings?.length} active listings
                  </p>
                </div>
              </div>
              <div
                id="dashboard-messages"
                onClick={(e) => openShopMessanger(e)}
              >
                <BsChatRightText />
              </div>
            </div>
            <div id="dashboard-shop-info-boxes-container">
              <div className="dashboard-shop-info-box-container">
                <div className="dashboard-shop-info-box-title">
                  <p>Total Views:</p>
                </div>
                <div id="dashboard-shop-info-box-counter">
                  <Counter end={shopData?.views / 2} duration={2000} />
                </div>
              </div>
              <div className="dashboard-shop-info-box-container">
                <div className="dashboard-shop-info-box-title">
                  <p>Listings:</p>
                </div>
                <div id="dashboard-shop-info-box-counter">
                  <Counter end={shopData?.listings?.length} duration={2000} />
                </div>
              </div>
              <div className="dashboard-shop-info-box-container">
                <div className="dashboard-shop-info-box-title">
                  <p>Orders:</p>
                </div>
                <div id="dashboard-shop-info-box-counter">
                  <Counter end={shopData?.orders?.length} duration={2000} />
                </div>
              </div>
              <div className="dashboard-shop-info-box-container">
                <div className="dashboard-shop-info-box-title">
                  <p>Revenue in:</p>
                </div>
                <div id="dashboard-shop-info-box-counter">
                  <div id="dashboard-revenue-counter-container">
                    <div>
                      <p>$</p>
                    </div>
                    <div>
                      <Counter
                        end={shopData?.revenue.toFixed(2)}
                        duration={2000}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="dashboard-activity">
              <h2>Resent Activity:</h2>
              {activity?.length > 0 ? (
                activity?.map((activity, index) => {
                  return <ActivityCard activity={activity} key={index} />;
                })
              ) : (
                <div>There is no activity yet!</div>
              )}
            </div>

            {visibleLoadButtonContainer ? (
              <div id="dashboard-load-activity-container">
                <div
                  id={
                    visibleLoadButtonContainer
                      ? "dashboard-button-wrapper-visible"
                      : "dashboard-button-wrapper"
                  }
                  onClick={() => setPage(page + 1)}
                >
                  <button>
                    <FaPlus id="dashboard-button-plus" />
                    <span id="dashboard-button-text">Show more</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
