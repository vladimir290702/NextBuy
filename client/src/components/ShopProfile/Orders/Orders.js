import "./Orders.css";
import { useState } from "react";

export default function Orders() {
  const [isClicked, setIsClicked] = useState(false);

  const handleSortButton = (e) => {
    e.preventDefault();

    setIsClicked(!isClicked);
  };

  return (
    <div id="orders-wrapper">
      <div id="orders-status-container">
        <div id="orders-title-container">
          <h2>Orders</h2>
        </div>
        <div id="orders-status-options-container">
          <div>New</div>
          <div>Completed</div>
        </div>
        <div class="order-card">
          <div className="order-creation-info-container">
            <p>Completed on: 16.01.2025</p>
          </div>
          <div className="order-product-details">
            <div className="order-product">
              <div className="order-product-information-container">
                <div>
                  <p className="order-product-brand-name">Nike</p>
                </div>
                <div className="order-product-image-container">
                  <img
                    src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/6ca23f73-976a-47c0-86f9-a6a7ab527130/AIR+MAX+PLUS+DRIFT.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="order-product-additional-details">
                <div>Quantity: 1</div>
                <div>Model: Air Force</div>
                <div>Size: 43</div>
              </div>
            </div>
            <div className="order-delivery">
              <div>
                <p>Ordered: 14.01.2025</p>
              </div>
              <div>
                <p>Tracking Number: 0034043471769852</p>
              </div>
              <div>
                <p>Ship to: </p>
              </div>
              <div>
                <p>Vladimir Metodiev</p>
              </div>
              <div>
                <p>ul. "Bqlo more" 2</p>
              </div>
              <div>
                <p>Blagoevgrad 2700</p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
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
            id={isClicked ? "orders-initial-div-active" : "orders-initial-div"}
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
            <div className="order-sorting-options">
              <div
                className={
                  true ? "orders-empty-div-active" : "orders-empty-div"
                }
              ></div>
              <div>
                <p>All</p>
              </div>
            </div>
            <div className="order-sorting-options">
              <div
                className={
                  true ? "orders-empty-div-active" : "orders-empty-div"
                }
              ></div>
              <div>
                <p>Bulgaria</p>
              </div>
            </div>
            <div className="order-sorting-options">
              <div
                className={
                  true ? "orders-empty-div-active" : "orders-empty-div"
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
            <div className="order-sorting-options">
              <div className="orders-empty-div"></div>
              <div>
                <p>Pre-transit</p>
              </div>
            </div>
            <div className="order-sorting-options">
              <div className="orders-empty-div"></div>
              <div>
                <p>In transit</p>
              </div>
            </div>
            <div className="order-sorting-options">
              <div className="orders-empty-div"></div>
              <div>
                <p>Delivered</p>
              </div>
            </div>
            <div className="order-sorting-options">
              <div className="orders-empty-div"></div>
              <div>
                <p>Canceled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
