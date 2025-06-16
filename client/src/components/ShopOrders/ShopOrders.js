import "./ShopOrders.css";
import { useState, useEffect } from "react";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { getShopData } from "../../services/createShop";
import { useUser } from "../../contexts/UserContext";

export default function ShopOrders() {
  const { user } = useUser();
  const [isClicked, setIsClicked] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const [shopData, setShopData] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchedShopData = async () => {
      const response = await getShopData(user.email);

      setShopData(response?.shop);
    };
    fetchedShopData();
  }, []);

  const handleSortButton = (e) => {
    e.preventDefault();

    setIsClicked(!isClicked);
  };

  const handleSelectedDestination = (e, destination) => {
    e.preventDefault();

    setSelectedDestination(destination);
  };

  const handleSelectedOrderStatus = (e, orderStatus) => {
    e.preventDefault();

    setSelectedOrderStatus(orderStatus);
  };

  const handleStatus = (e, status) => {
    e.preventDefault();

    if (status === "new") {
      setStatus("new");
    } else if (status === "completed") {
      setStatus("completed");
    }
  };

  return (
    <div id="shop-profile-wrapper">
      <ShopProfileSidebar />
      <div id="selected-shop-category">
        <div id="orders-wrapper">
          <div id="orders-status-container">
            <div id="orders-title-container">
              <h2>Orders</h2>
            </div>
            <div id="orders-status-options-container">
              <div
                className={
                  status === "new" ? "active-sorting-status" : "sorting-status"
                }
                onClick={(e) => handleStatus(e, "new")}
              >
                New
              </div>
              <div
                className={
                  status === "completed"
                    ? "active-sorting-status"
                    : "sorting-status"
                }
                onClick={(e) => handleStatus(e, "completed")}
              >
                Completed
              </div>
            </div>
            {shopData?.orders
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
                  isClicked ? "orders-initial-div-active" : "orders-initial-div"
                }
              >
                Sort by: Oldest
              </div>
              <div
                id={
                  isClicked
                    ? "orders-sorting-options-active"
                    : "orders-sorting-options"
                }
              >
                <div>Oldest</div>
                <div>Newest</div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <p>Destination:</p>
                </div>
                <div
                  className="order-sorting-options"
                  onClick={(e) => handleSelectedDestination(e, "All")}
                >
                  <div
                    className={
                      selectedDestination === "All"
                        ? "orders-empty-div-active"
                        : "orders-empty-div"
                    }
                  ></div>
                  <div>
                    <p>All</p>
                  </div>
                </div>
                <div
                  className="order-sorting-options"
                  onClick={(e) => handleSelectedDestination(e, "Bulgaria")}
                >
                  <div
                    className={
                      selectedDestination === "Bulgaria"
                        ? "orders-empty-div-active"
                        : "orders-empty-div"
                    }
                  ></div>
                  <div>
                    <p>Bulgaria</p>
                  </div>
                </div>
                <div
                  className="order-sorting-options"
                  onClick={(e) => handleSelectedDestination(e, "United States")}
                >
                  <div
                    className={
                      selectedDestination === "United States"
                        ? "orders-empty-div-active"
                        : "orders-empty-div"
                    }
                  ></div>
                  <div>
                    <p>United States</p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p>Status:</p>
                </div>
                <div
                  className="order-sorting-options"
                  onClick={(e) => handleSelectedOrderStatus(e, "Pre-transit")}
                >
                  <div
                    className={
                      selectedOrderStatus === "Pre-transit"
                        ? "orders-empty-div-active"
                        : "orders-empty-div"
                    }
                  ></div>
                  <div>
                    <p>Pre-transit</p>
                  </div>
                </div>
                <div
                  className="order-sorting-options"
                  onClick={(e) => handleSelectedOrderStatus(e, "In transit")}
                >
                  <div
                    className={
                      selectedOrderStatus === "In transit"
                        ? "orders-empty-div-active"
                        : "orders-empty-div"
                    }
                  ></div>
                  <div>
                    <p>In transit</p>
                  </div>
                </div>
                <div
                  className="order-sorting-options"
                  onClick={(e) => handleSelectedOrderStatus(e, "Delivered")}
                >
                  <div
                    className={
                      selectedOrderStatus === "Delivered"
                        ? "orders-empty-div-active"
                        : "orders-empty-div"
                    }
                  ></div>
                  <div>
                    <p>Delivered</p>
                  </div>
                </div>
                <div
                  className="order-sorting-options"
                  onClick={(e) => handleSelectedOrderStatus(e, "Canceled")}
                >
                  <div
                    className={
                      selectedOrderStatus === "Canceled"
                        ? "orders-empty-div-active"
                        : "orders-empty-div"
                    }
                  ></div>
                  <div>
                    <p>Canceled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
