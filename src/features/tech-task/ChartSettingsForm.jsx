import { Input } from "../../components/common";
import styles from "./TechTask.module.css";

function ChartSettingsForm({
  minPatentCount,
  onMinPatentCountChange,
  maxPatentCount,
  topN,
  onTopNChange,
  searchText,
  onSearchTextChange,
  specificPatentId,
  onSpecificPatentIdChange,
  allPatentCodes,
}) {
  return (
    <div className={styles.settingsPanel}>
      <label className={styles.settingLabel}>
        특허 건수 기준(min) : {minPatentCount}건 이상
      </label>
      <input
        type="range"
        min={1}
        max={maxPatentCount}
        value={minPatentCount}
        onChange={(e) => onMinPatentCountChange(Number(e.target.value))}
        className={styles.rangeInput}
      />

      <label className={styles.settingLabel}>상위 N개만 보기 (0=전체)</label>
      <Input
        type="text"
        value={topN}
        onChange={(e) => onTopNChange(Number(e.target.value) || 0)}
        placeholder="0"
      />

      <label className={styles.settingLabel}>텍스트 검색(문제/해결)</label>
      <Input
        type="text"
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        placeholder="키워드 입력"
      />

      <label className={styles.settingLabel}>특정 특허만 남기기</label>
      <Input
        type="select"
        value={specificPatentId}
        onChange={(e) => onSpecificPatentIdChange(e.target.value)}
        options={allPatentCodes}
        placeholder="특허 ID 선택 (미선택=전체)"
      />
    </div>
  );
}

export default ChartSettingsForm;
