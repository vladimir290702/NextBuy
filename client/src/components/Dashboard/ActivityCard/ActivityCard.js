import "./ActivityCard.css";
import { IoCalendarOutline } from "react-icons/io5";

export default function ActivityCard({ activity }) {
  let activityText = "";

  if (activity.type === "favourited") {
    activityText = `${activity.firstName} ${activity.lastName} favourited your item: ${activity.item.productName} ${activity.item.model}`;
  } else if (activity.type === "removed") {
    activityText = `${activity.firstName} ${activity.lastName} removed your item from favourites: ${activity.item.productName} ${activity.item.model}`;
  }
  return (
    <div id="dashboard-shop-activities-wrapper">
      <div className="dashboard-shop-activity-card">
        <div className="dashboard-shop-image-container">
          <img src={activity.item.images[0]} alt="" />
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
              <p>{activity.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
