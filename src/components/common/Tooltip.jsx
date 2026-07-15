import { useState } from "react";
import styles from "./Tooltip.module.css";

function Tooltip({ text, children, position = "top" }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <span className={`${styles.tooltip} ${styles[position]}`}>
          {text}
        </span>
      )}
    </span>
  );
}

export default Tooltip;