import "./VisitShopListing.css";

export default function VisitShopListing({ listing }) {
  return (
    <div className="visit-shop-listing">
      <img src={listing.images[0]} alt={listing.model} />
      <p>{listing.model}</p>
    </div>
  );
}
