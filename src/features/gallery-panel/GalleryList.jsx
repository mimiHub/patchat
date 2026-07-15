import { useState } from "react";
import { patentList } from "../patent-panel/patentData.js";
import { Button } from "../../components/common";
import btnStyles from "../../components/common/Button.module.css";
import styles from "./Gallery.module.css";

function GalleryList({ selectedPatentId }) {
  const patent =
    patentList.find((p) => p.id === selectedPatentId) || patentList[0];
  const drawings = patent.drawings || [];
  const [index, setIndex] = useState(0);

  function handleNextClick() {
    setIndex((prev) => (prev === drawings.length - 1 ? 0 : prev + 1));
  }

  function handlePrevClick() {
    setIndex((prev) => (prev === 0 ? drawings.length - 1 : prev - 1));
  }

  if (drawings.length === 0) {
    return <p className={styles.empty}>등록된 도면이 없습니다.</p>;
  }

  const current = drawings[index];

  return (
    <div className={styles.container}>
      <p className={styles.patentTitle}>{patent.title}</p>
      <p className={styles.patentNumber}>{patent.patentNumber}</p>

      <div className={styles.controlRow}>
        <div className={`${btnStyles["btn-group"]} ${styles.galleryBtnGroup}`}>
          <Button variant="secondary" size="sm" onClick={handlePrevClick}>
            Previous
          </Button>
          <Button variant="secondary" size="sm" onClick={handleNextClick}>
            Next
          </Button>
        </div>

        <p className={styles.counter}>
          {index + 1} / {drawings.length}
        </p>
      </div>

      <img className={styles.image} src={current.url} alt={current.alt} />
    </div>
  );
}

export default GalleryList;