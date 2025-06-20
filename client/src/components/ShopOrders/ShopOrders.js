import "./ShopOrders.css";
import { useState, useEffect } from "react";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { getShopData } from "../../services/createShop";
import { useUser } from "../../contexts/UserContext";
import { RingLoader } from "react-spinners";

export default function ShopOrders() {
  const { user } = useUser();
  const [isClicked, setIsClicked] = useState(false);
  const [shopData, setShopData] = useState([]);
  const [sortBy, setSortBy] = useState("Newest");
  const [loading, setLoading] = useState(shopData ? false : true);

  useEffect(() => {
    const fetchedShopData = async () => {
      setLoading(true);
      const response = await getShopData(user.email);

      if (sortBy === "Newest") {
        setShopData(response?.shop?.orders);
        setLoading(false);
      } else {
        setShopData(response?.shop?.orders.reverse());
        setLoading(false);
      }
    };
    fetchedShopData();
  }, [sortBy]);

  const handleSortButton = (e) => {
    e.preventDefault();

    setIsClicked(!isClicked);
  };

  const handleSortBy = (e, type) => {
    e.preventDefault();

    if (type === "oldest") {
      setSortBy("Oldest");
    } else {
      setSortBy("Newest");
    }
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
          <div id="orders-wrapper">
            <div id="orders-status-container">
              <div id="orders-title-container">
                <h2>Orders</h2>
              </div>
              {shopData
                .map((order) => {
                  return (
                    <div className="order-card" key={order.dateOfOrder}>
                      <div className="order-creation-info-container">
                        <p>Ordered on: {order.dateOfOrder}</p>
                      </div>
                      <div className="order-product-details">
                        <div className="order-product">
                          <div className="order-product-information-container">
                            <div>
                              <p className="order-product-brand-name">
                                {order.orderedProducts[0].productName}
                              </p>
                            </div>
                            <div className="order-product-image-container">
                              <img
                                src={order.orderedProducts[0].images[0]}
                                alt={order.orderedProducts[0].productName}
                              />
                            </div>
                          </div>
                          <div className="order-product-additional-details">
                            <div>Quantity: 1</div>
                            <div>Model: {order.orderedProducts[0].model}</div>
                            <div>Size: {order.orderedProducts[0].size}</div>
                          </div>
                        </div>
                        <div className="order-delivery">
                          <div>
                            <p>Tracking Number: {order.trackingNumber}</p>
                          </div>
                          <div>
                            <p>Ship to: </p>
                          </div>
                          <div>
                            <p>
                              {order.firstName} {order.lastName}
                            </p>
                          </div>
                          <div>
                            <p>{order.street}</p>
                          </div>
                          <div>
                            <p>
                              {order.city} {order.zipcode}
                            </p>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  );
                })
                .reverse()}
            </div>
            <div id="orders-sorting-container">
              <div
                id={
                  isClicked
                    ? "orders-options-toggle-container-active"
                    : "orders-options-toggle-container"
                }
                onClick={(e) => handleSortButton(e)}
              >
                <div
                  id={
                    isClicked
                      ? "orders-initial-div-active"
                      : "orders-initial-div"
                  }
                >
                  Sort by: {sortBy}
                </div>
                <div
                  id={
                    isClicked
                      ? "orders-sorting-options-active"
                      : "orders-sorting-options"
                  }
                >
                  <div onClick={(e) => handleSortBy(e, "oldest")}>Oldest</div>
                  <div onClick={(e) => handleSortBy(e, "newest")}>Newest</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
