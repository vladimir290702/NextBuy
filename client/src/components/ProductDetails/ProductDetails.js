import "./ProductDetails.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TbTruckDelivery, TbPackageImport } from "react-icons/tb";
import { useState, useEffect } from "react";
import ProductCategories from "../ProductCategories/ProductCategories";
import { useLocation } from "react-router-dom";
import { getListing } from "../../services/createShop";

export default function ProductDetails() {
  const location = useLocation();
  const [selectedFavourite, setSelectedFavourite] = useState(false);
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = location.state.id;

  useEffect(() => {
    try {
      const fetchedShopData = async () => {
        const response = await getListing(id);

        setListingData(response);
      };
      fetchedShopData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFavouriteProduct = (e) => {
    e.preventDefault();

    setSelectedFavourite(!selectedFavourite);
  };

  return (
    <>
      {loading ? null : (
        <>
          <ProductCategories />
          <div id="product-details-wrapper">
            <div id="product-details-images-container">
              {listingData?.product.images.map((product) => {
                return (
                  <div className="product-details-image">
                    <img src={product} alt={product} />
                  </div>
                );
              })}
            </div>
            <div id="product-details-information-container">
              <div id="routes">
                <p>Man - Shoes - {listingData?.product.category}</p>
              </div>
              <div id="product-name">
                <p>
                  {listingData?.product.productName}{" "}
                  {listingData?.product.model}
                </p>
              </div>
              <div id="product-price">
                <p>${listingData?.product?.price}</p>
              </div>
              <div>
                <p>Color: {listingData?.product?.color}</p>
              </div>
              <div>
                <p>Sizes:</p>
              </div>

              <div id="product-details-sizes-container">
                {listingData?.product.sizes.map((size) => {
                  return <div className="product-size">{size}</div>;
                })}
              </div>
              <div id="product-details-buttons-container">
                <div id="add-to-bag-button">
                  <button>Add to Bag</button>
                </div>
                <div
                  id="favourite-button"
                  onClick={(e) => handleFavouriteProduct(e)}
                >
                  {selectedFavourite ? (
                    <FaHeart id="favourite-pressed" />
                  ) : (
                    <FaRegHeart />
                  )}
                </div>
              </div>
              <div id="delivery-container">
                <div className="delivery-info">
                  <div>
                    <TbTruckDelivery className="delivery-icon" />
                  </div>
                  <div>
                    <p>Free delivery on all orders over $75</p>
                  </div>
                </div>
                <div className="delivery-info">
                  <div>
                    <TbPackageImport className="delivery-icon" />
                  </div>
                  <div>
                    <p>
                      60-day returns. For returns, a fee of 4,95 EUR applies.
                    </p>
                  </div>
                </div>
              </div>
              <div id="details-container">
                <p>{listingData?.product.description} </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
