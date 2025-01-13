import "./OptionCard.css";

export default function OptionCard({ data, setDataToParent, selectedOption }) {
  const handleDataPassing = (e) => {
    e.preventDefault();

    setDataToParent(e, data.category);
  };
  return (
    <div id="apparel-sorting-options">
      <div
        className="apparel-sorting-option"
        onClick={(e) => handleDataPassing(e)}
      >
        <div className="apparel-sorting-option-toggle">
          <div>
            <p>{data.category}</p>
          </div>
          <div className="apparel-toggle-function">
            <p>{data.category === selectedOption ? "-" : "+"}</p>
          </div>
        </div>
        <div
          className={
            selectedOption === data.category
              ? "apparel-sorting-option-subcategories-active"
              : "apparel-sorting-option-subcategories"
          }
        >
          {data.options?.map((item, index) => {
            return (
              <div key={index}>
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
