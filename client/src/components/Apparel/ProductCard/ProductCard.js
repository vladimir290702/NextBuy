import "./ProductCard.css";

export default function ProductCard() {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/6ca23f73-976a-47c0-86f9-a6a7ab527130/AIR+MAX+PLUS+DRIFT.png"
          alt=""
        />
      </div>
      <div>
        <h3>Nike</h3>
        <p>Air Force</p>
        <p>$129.99</p>
      </div>
    </div>
  );
}
