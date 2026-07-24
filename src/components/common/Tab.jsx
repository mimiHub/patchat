import { useState } from "react";
import styles from "./Tab.module.css";

function Tab({ tabs, variant = "underline", activeIndex: controlledIndex, onChange, showDivider = true,}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  function handleClick(index) {
    if (onChange) onChange(index);
    if (!isControlled) setInternalIndex(index);
  }

  function getTabClassName(index) {
  const isActive = index === activeIndex;
  const base = isActive ? styles.tabActive : styles.tab;
  const variantClass = styles[`variant-${variant}`];
  const activeVariantClass = isActive
    ? styles[`activeVariant-${variant}`]
    : "";
  return [base, variantClass, activeVariantClass].filter(Boolean).join(" ");
}

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.tabList} ${styles[`list-${variant}`]}`}
        role="tablist"
        style={
          variant === "underline" && !showDivider
           ? { borderBottom: "none" }
           : undefined
       }        
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            className={getTabClassName(index)}
            onClick={() => handleClick(index)}
            title={tab.label}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs[activeIndex].content && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeIndex}`}
          aria-labelledby={`tab-${activeIndex}`}
          className={styles.tabContent}
        >
          {tabs[activeIndex].content}
        </div>
      )}
    </div>
  );
}

export default Tab;
