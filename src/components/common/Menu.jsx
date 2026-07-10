import { useState, useRef, useEffect } from "react";
import styles from "./Menu.module.css";

function Menu({ label, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleItemClick(item) {
    item.onClick();
    setIsOpen(false);
  }

  // 메뉴 바깥을 클릭하면 닫히게 처리
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button className={styles.trigger} onClick={handleToggle}>
        {label} <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul className={styles.menuList}>
          {items.map((item) => (
            <li
              key={item.label}
              className={styles.menuItem}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Menu;
