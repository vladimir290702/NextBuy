import "./ListingCard.css";

export default function ListingCard({ data }) {
  return (
    <div className="edit-listing-wrapper">
      <img src={data?.images[0]} alt={data?.productName} />
      <div className="edit-shop-listing-overlay">Edit Listing</div>
    </div>
  );
}
