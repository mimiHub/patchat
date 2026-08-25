import { IconSidebar } from "../../layouts/Nav/icons/index.js";
import ChartView from "../chart-view/ChartView.jsx";
import styles from "./TechTask.module.css";

// 좌측 차트 영역 - Nav처럼 폭(width)만 줄었다 늘어남, 버튼은 항상 카드 안에 있음
function ChartPanel({ activeChartTab, isCollapsed, onToggle }) {
  return (
    <div
      className={`${styles.chartPanel} ${
        isCollapsed ? styles.chartCollapsed : ""
      }`}
    >
      <button
        type="button"
        className={styles.chartToggle}
        onClick={onToggle}
        aria-label={isCollapsed ? "차트 펼치기" : "차트 접기"}
      >
        <IconSidebar on={!isCollapsed} />
      </button>
      {!isCollapsed && (
        <div className={styles.chartBody}>
          <ChartView type={activeChartTab === 0 ? "sankey" : "heatmap"} />
        </div>
      )}
    </div>
  );
}

export default ChartPanel;
