import { useState, useRef } from "react";
import styles from "./Dropdown.module.css";
import { useClickOutside } from "../../hooks/useClickOutside";

// children으로 함수를 넘기면 { close } 인자를 받아 선택 즉시 드롭다운을 닫을 수 있음
// 예: <Dropdown label="뷰 필터">{({ close }) => <button onClick={close}>...</button>}</Dropdown>
function Dropdown({ label, align = "left", disabled = false, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useClickOutside(wrapperRef, () => setIsOpen(false), isOpen && !disabled);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setIsOpen((prev) => !prev);
        }}
      >
        {label}
        <span className={styles.arrow}>{isOpen && !disabled ? "▲" : "▼"}</span>
      </button>

      {isOpen && !disabled && (
        <div
          className={`${styles.panel} ${
            align === "right" ? styles.alignRight : styles.alignLeft
          }`}
        >
          {typeof children === "function"
            ? children({ close: () => setIsOpen(false) })
            : children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
