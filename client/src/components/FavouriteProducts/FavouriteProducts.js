import "./FavouriteProducts.css";
import FavouriteProductCard from "./FavouriteCard/FavouriteProductCard";
import { useUser } from "../../contexts/UserContext";

export default function FavouriteProducts() {
  const { user } = useUser();
  console.log(user.favouriteProducts);

  return (
    <div id="favourite-products-main-container">
      <div id="favoruite-products-title-container">
        <p id="favourite-products-title">Your favourite products:</p>
      </div>

      {user.favouriteProducts.length > 0 ? (
        user.favouriteProducts.map((product) => (
          <FavouriteProductCard product={product} />
        ))
      ) : (
        <h2>No favourite products yet!</h2>
      )}
    </div>
  );
}
