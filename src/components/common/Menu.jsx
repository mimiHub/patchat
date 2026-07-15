import { useState, useRef, useEffect } from "react";
import styles from "./Menu.module.css";

function Menu({
  label,
  icon,
  items,
  selectedId,
  dropdownAlign = "left",
  variant = "outlined", // "outlined" | "plain"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  function handleToggle() {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.left,
        right: window.innerWidth - rect.right,
        width: rect.width,
      });
    }
    setIsOpen((prev) => !prev);
  }

  function handleItemClick(item) {
    item.onClick();
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownStyle = menuPosition
    ? {
        top: menuPosition.top,
        ...(dropdownAlign === "right" && { right: menuPosition.right }),
        ...(dropdownAlign === "left" && { left: menuPosition.left }),
        ...(dropdownAlign === "center" && {
          left: menuPosition.left + menuPosition.width / 2,
          transform: "translateX(-50%)",
        }),
      }
    : {};

  const triggerClassName =
    variant === "plain" ? styles.triggerPlain : styles.trigger;

  return (
    <div className={styles.wrapper} ref={menuRef}>
      {icon ? (
        <button
          type="button"
          ref={triggerRef}
          className={styles.iconTrigger}
          onClick={handleToggle}
          aria-label={label || "메뉴 열기"}
        >
          {icon}
        </button>
      ) : (
        <button
          type="button"
          ref={triggerRef}
          className={triggerClassName}
          onClick={handleToggle}
        >
          <span className={styles.triggerLabel}>{label}</span>
          <svg
            className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {isOpen && (
        <ul className={styles.menuListFixed} style={dropdownStyle}>
          {items.map((item) => (
            <li
              key={item.id || item.label}
              className={styles.menuItem}
              onClick={() => handleItemClick(item)}
            >
              <div className={styles.menuItemText}>
                <span className={styles.menuItemLabel}>{item.label}</span>
                {item.description && (
                  <span className={styles.menuItemDesc}>
                    {item.description}
                  </span>
                )}
              </div>
              {item.id === selectedId && (
                <span className={styles.checkMark}>✓</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Menu;