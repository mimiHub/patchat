import styles from "./StatGrid.module.css";

// 숫자 지표 박스 묶음 (예: 청구항 12 / 인용 8 ...)
// items: [{ label: "청구항", value: 12 }, ...]
// columns: 한 줄 칸 수 (기본 4). 모바일(767px 이하)에선 4칸 → 2칸, 3칸 이하는 그대로
function StatGrid({ items, columns = 4, className = "" }) {
  const mobileColumns = columns >= 4 ? 2 : columns;
  return (
    <ul
      className={`${styles.grid} ${className}`}
      // CSS 변수로 칸 수를 넘겨서, CSS 쪽 repeat()와 media query가 그대로 사용
      style={{
        "--stat-columns": columns,
        "--stat-columns-mobile": mobileColumns,
      }}
    >
      {items.map((item) => (
        <li key={item.label} className={styles.item}>
          <span className={styles.value}>{item.value}</span>
          <span className={styles.label}>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default StatGrid;
