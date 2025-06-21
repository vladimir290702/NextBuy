import "./ActivityCard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCalendarOutline, IoHeart } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
export default function ActivityCard({ activity }) {
  const navigate = useNavigate();
  const [IsHovered, setIsHovered] = useState(false);
  let activityText = "";

  if (activity.type === "favourited") {
    activityText = `${activity.firstName} ${activity.lastName} favourited your item: ${activity.item.productName} ${activity.item.model}`;
  } else if (activity.type === "removed") {
    activityText = `${activity.firstName} ${activity.lastName} removed your item from favourites: ${activity.item.productName} ${activity.item.model}`;
  } else if (activity.type === "ordered") {
    activityText = `${activity.order.email} ordered ${
      activity.order.orderedProducts.length
    } ${activity.order.orderedProducts.length > 1 ? "items" : "item"}`;
  }

  const Icon = () => {
    if (activity.type === "favourited") {
      return <IoHeart />;
    } else if (activity.type === "removed") {
      return <MdDeleteForever />;
    } else if (activity.type === "ordered") {
      return <FaMoneyCheckDollar />;
    }
  };

  const handleReviewOrder = (e) => {
    e.preventDefault();

    navigate("/review-order", { state: activity.order });
  };

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={(e) => handleReviewOrder(e)}
      className="dashboard-shop-activities-wrapper"
    >
      <div className="dashboard-shop-activity-card">
        <div className="dashboard-shop-image-container">
          <img
            src={
              activity.type === "ordered"
                ? "https://www.shutterstock.com/image-vector/shopping-cart-check-mark-icon-600nw-1708233319.jpg"
                : activity.item.images[0]
            }
            alt=""
          />
        </div>
        <div className="dashboard-shop-activity-message-data-container">
          <div className="dashboard-shop-activity-message">
            <p>{activityText}</p>
          </div>
          <div className="dashboard-shop-activity-data">
            <div className="dashboard-shop-activity-icon">
              <p>
                <IoCalendarOutline />
              </p>
            </div>
            <div className="dashboard-shop-activity-date">
              <p>
                {activity?.item?.date} <Icon />
              </p>
            </div>
          </div>
        </div>
        {IsHovered ? (
          <div className="dashboard-activity-arrow-redirect-container-active">
            <FaArrowRight
              className={"dashboard-activity-arrow-redirect-active"}
            />
          </div>
        ) : (
          <div className="dashboard-empty-div">
            <FaArrowRight />
          </div>
        )}
      </div>
    </div>
  );
}
