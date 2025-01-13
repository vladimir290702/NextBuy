import "./Paging.css";
import { useState } from "react";

export default function Paging({ page, selectPage }) {
  const [selectedPage, setSelectedPage] = useState(page);
  const pagesCount = 20;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const RenderManyPages = ({ item }) => {
    if (item < 4 || item > pagesCount - 3) {
      return (
        <div
          className={selectedPage === item ? "page-selected" : "page"}
          onClick={(e) => handleSelectedPage(e, item)}
        >
          <h3>{item}</h3>
        </div>
      );
    } else if (item === 4) {
      return (
        <div
          className={selectedPage === item ? "page-selected" : "page"}
          onClick={(e) => handleSelectedPage(e, item)}
        >
          <h3>...</h3>
        </div>
      );
    } else {
      return null;
    }
  };

  const RenderFewPages = ({ item }) => {
    return (
      <div
        className={selectedPage === item ? "page-selected" : "page"}
        onClick={(e) => handleSelectedPage(e, item)}
      >
        <h3>{item}</h3>
      </div>
    );
  };

  const handleSelectedPage = (e, page) => {
    e.preventDefault();

    selectPage(e, page);
    setSelectedPage(page);
  };

  return (
    <div id="paging">
      {pages.map((item) => {
        if (pagesCount > 10) {
          return <RenderManyPages item={item} />;
        } else {
          return <RenderFewPages item={item} />;
        }
      })}
    </div>
  );
}
