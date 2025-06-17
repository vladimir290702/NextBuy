import "./FavouriteProducts.css";
import FavouriteProductCard from "./FavouriteCard/FavouriteProductCard";
import { useUser } from "../../contexts/UserContext";

export default function FavouriteProducts() {
  const { user } = useUser();

  return (
    <div id="favourite-products-main-container">
      <div id="favoruite-products-title-container">
        <h3 id="favourite-products-title">Your favourite products:</h3>
      </div>

      <div id="favourite-products-card-wrapper">
        {user.favouriteProducts.length > 0 ? (
          user.favouriteProducts.map((product) => (
            <FavouriteProductCard product={product} key={product._id} />
          ))
        ) : (
          <h2>No favourite products yet!</h2>
        )}
      </div>
    </div>
  );
}
