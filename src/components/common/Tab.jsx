import { useState } from "react";
import styles from "./Tab.module.css";

function Tab({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabList}>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={index === activeIndex ? styles.tabActive : styles.tab}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{tabs[activeIndex].content}</div>
    </div>
  );
}

export default Tab;
