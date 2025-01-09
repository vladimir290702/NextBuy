import "./AddListing.css";

export default function AddListing() {
  return (
    <div id="add-listing-wrapper">
      <div id="first-product-section">
        <div id="imageContainer">
          <img
            src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/9e970183-c03c-4250-ae91-b238aefd47df/NIKE+AIR+MAX+90.png"
            alt=""
          />
          <img
            src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/6ca23f73-976a-47c0-86f9-a6a7ab527130/AIR+MAX+PLUS+DRIFT.png"
            alt=""
          />
          <img
            src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/7ccbde3c-6b29-4027-ad8a-bdbd84426c1d/W+AIR+FORCE+1+%2707+NEXT+NATURE.png"
            alt=""
          />
          <img
            src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/7ccbde3c-6b29-4027-ad8a-bdbd84426c1d/W+AIR+FORCE+1+%2707+NEXT+NATURE.png"
            alt=""
          />
        </div>
        <div id="productMainData">
          <div className="main-data-option">
            <div id="add-listing-category-label">
              <label>Category</label>
            </div>
            <div id="add-listing-category-options">
              <select>
                <option name="Clothing" id="">
                  Clothing
                </option>
                <option name="Shoes" id="">
                  Shoes
                </option>
                <option name="Accessories" id="">
                  Accessories
                </option>
                <option name="Belts" id="">
                  Belts
                </option>
                <option name="Bags" id="">
                  Bags
                </option>
                <option name="Watches" id="">
                  Watches
                </option>
                <option name="Sunglasses" id="">
                  Sunglasses
                </option>
                <option name="Wallets" id="">
                  Wallets
                </option>
              </select>
            </div>
          </div>
          <div className="main-data-option">
            <div className="main-data-label-container">
              <label>Product Model:</label>
            </div>
            <div className="add-listing-category-input">
              <input type="text" placeholder="Model..." />
            </div>
          </div>
          <div className="main-data-option">
            <div className="main-data-label-container">
              <label>Price:</label>
            </div>
            <div className="add-listing-category-input">
              <input type="text" placeholder="Price..." />
            </div>
          </div>
          <div className="main-data-option">
            <div className="main-data-label-container">
              <label>Select Currency:</label>
            </div>
            <div id="add-listing-currency">
              <div id="add-listing-currency-dollar">$</div>
              <div id="add-listing-currency-euro">€</div>
            </div>
          </div>
        </div>
      </div>
      <div id="secondary-product-data">
        <div id="productSizes">
          <div className="main-data-label-container">
            <label>Which product sizes will you offer to your customers:</label>
          </div>
          <div id="create-product-sizes-wrapper">
            <div className="create-product-size">S</div>
            <div className="create-product-size">M</div>
            <div className="create-product-size">L</div>
            <div className="create-product-size">XL</div>
            <div className="create-product-size">2XL</div>
            <div className="create-product-size">3XL</div>
          </div>
        </div>
        <div id="add-listing-discription">
          <div className="main-data-label-container">
            <label htmlFor="productModel">Description:</label>
          </div>
          <div className="add-listing-category-input">
            <textarea placeholder="Please describe your product..."></textarea>
          </div>
        </div>
      </div>
      <div id="createProductButton">
        <button>Add Listing</button>
      </div>
    </div>
  );
}
