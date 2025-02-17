import "./ProductDetails.css";
import { FaHeart, FaRegHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TbTruckDelivery, TbPackageImport } from "react-icons/tb";
import { useState, useEffect } from "react";
import ProductCategories from "../ProductCategories/ProductCategories";
import { useLocation } from "react-router-dom";
import { getListing } from "../../services/createShop";
import { addListingToBag } from "../../services/custommerOperations";
import { useUser } from "../../contexts/UserContext";

export default function ProductDetails() {
  const location = useLocation();
  const { user } = useUser();
  const [selectedFavourite, setSelectedFavourite] = useState(false);
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
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

  const handleAddProductToBag = async (e) => {
    e.preventDefault();

    const productData = {
      id: listingData.product._id,
      productName: listingData.product.productName,
      model: listingData.product.model,
      category: listingData.product.category,
      price: listingData.product.price,
      description: listingData.product.description,
      color: listingData.product.color,
      size: selectedSize,
      images: listingData.product.images,
      quantity: 1,
    };

    const response = await addListingToBag(productData, user.email);
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
                  <div className="product-details-image" key={product}>
                    <img src={product} alt={product} />
                  </div>
                );
              })}
            </div>
            <div id="product-details-information-container">
              <div id="routes">
                <p>
                  Man - {listingData?.product.parentCategory} -{" "}
                  {listingData?.product.category}
                </p>
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
                  return (
                    <div
                      key={size}
                      className={
                        selectedSize === size
                          ? "product-size-selected"
                          : "product-size"
                      }
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </div>
                  );
                })}
              </div>
              <div id="product-details-buttons-container">
                <div id="add-to-bag-button">
                  <button onClick={(e) => handleAddProductToBag(e)}>
                    Add to Bag
                  </button>
                </div>
                <div
                  id="favourite-button"
                  onClick={(e) => handleFavouriteProduct(e)}
                >
                  {selectedFavourite ? (
                    <FaHeart id="favourite-pressed" />
                  ) : (
                    <FaRegHeart id="favourite-not-pressed" />
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
