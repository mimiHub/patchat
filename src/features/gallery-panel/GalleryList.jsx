import { useState } from "react";
import { sculptureList } from "./data.js";
import Button from "../../components/common/Button.jsx";
import styles from "../../components/common/Button.module.css";

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleNextClick() {
    if (index === sculptureList.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  function handlePrevClick() {
    if (index === 0) {
      setIndex(sculptureList.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <div className={styles["btn-group"]}>
        <Button onClick={handlePrevClick}>Previous</Button>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}
