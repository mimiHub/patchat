import styles from "./LabeledBox.module.css";

function LabeledBox({ label, children, icon, rounded = true }) {
  const boxClassName = rounded
    ? `${styles.box} ${styles.rounded}`
    : styles.box;

  return (
    <div className={boxClassName}>
      <div className={styles.header}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {label}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export default LabeledBox;