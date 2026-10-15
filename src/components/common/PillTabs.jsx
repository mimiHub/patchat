import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";
import styles from "./PillTabs.module.css";

// PC: 칩이 여러 줄로 줄바꿈 / 태블릿·모바일(1023px 이하): 한 줄 가로 스크롤 + 좌우 화살표
function PillTabs({ options, selectedId, onChange }) {
  // 양 끝 그라데이션 + 선택된 칩 자동 스크롤 + 화살표 이동 (공통 훅)
  const {
    ref: rowRef,
    edges,
    handleScroll,
    scrollByPage,
  } = useHorizontalScroll(selectedId);

  // 칩이 넘쳐서 가로 스크롤이 생겼을 때만 화살표를 보여줌 (PC 줄바꿈 상태에선 안 보임)
  const isOverflowing = edges.left || edges.right;

  const rowWrapClassName = [
    styles.rowWrap,
    edges.left ? styles.fadeLeft : "",
    edges.right ? styles.fadeRight : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper}>
      {isOverflowing && (
        <button
          type="button"
          className={styles.arrow}
          onClick={() => scrollByPage(-1)}
          disabled={!edges.left}
          aria-label="이전 항목 보기"
        >
          ‹
        </button>
      )}

      <div className={rowWrapClassName}>
        <div
          ref={rowRef}
          className={styles.tabRow}
          role="tablist"
          onScroll={handleScroll}
        >
          {options.map((option) => {
            const isActive = option.id === selectedId;
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={isActive ? styles.tabActive : styles.tab}
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
            );
          })}
        </div>
      </div>

      {isOverflowing && (
        <button
          type="button"
          className={styles.arrow}
          onClick={() => scrollByPage(1)}
          disabled={!edges.right}
          aria-label="다음 항목 보기"
        >
          ›
        </button>
      )}
    </div>
  );
}

export default PillTabs;
