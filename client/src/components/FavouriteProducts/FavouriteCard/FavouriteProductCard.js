import "./FavouriteProductCard.css";
import { BsCart4 } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
export default function FavouriteProductCard({ product }) {
  return (
    <div className="favourite-product-card-container">
      <div className="favourite-product-image-container">
        <div>
          <img src={product.images[0]} alt="" />
        </div>
        <div className="favourite-product-data">
          <h2 className="favourite-product-name">
            {product.productName} {product.model}
          </h2>
          <p className="favourite-product-price">${product.price}</p>
          <p>Color: {product.color}</p>
          <p>Avalible sizes: {product.sizes.join(" / ")}</p>
          <div className="favourite-product-description">
            <p>
              {product.description.length > 350
                ? product.description.slice(0, 350) + "..."
                : product.description}
            </p>
          </div>
        </div>
      </div>

      <div className="favourite-product-buttons-container">
        <div className="favourite-product-add-to-cart">
          <BsCart4 className="favourite-product-icon" />
        </div>
        <div className="favourite-product-remove">
          <MdDelete className="favourite-product-icon" />
        </div>
      </div>
    </div>
  );
}
