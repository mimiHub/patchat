import styles from "./Popup.module.css";

function Popup({ isOpen, onClose, title, children }) {
  if (!isOpen) {
    return null;
  }

  function handleOverlayClick(e) {
    // 오버레이 자체를 클릭했을 때만 닫히고, 팝업 내용 클릭은 무시
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default Popup;
