import styles from "./PillTabs.module.css";

function PillTabs({ options, selectedId, onChange }) {
  return (
    <div className={styles.tabRow}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={
            option.id === selectedId ? styles.tabActive : styles.tab
          }
          onClick={() => onChange(option.id)}
        >
          {option.color && (
            <span
              className={styles.dot}
              style={{ backgroundColor: option.color }}
            />
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default PillTabs;