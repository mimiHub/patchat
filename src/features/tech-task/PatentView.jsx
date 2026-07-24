import { Button } from "../../components/common";
import Patent from "../patent-panel/Patent.jsx";
import styles from "./TechTask.module.css";

function PatentView({
  onBack,
  selectedPatentId,
  onSelectPatentId,
  onViewMore,
}) {
  return (
    <div className={styles.patentView}>
      <Button
        variant="secondary"
        size="sm"
        onClick={onBack}
        className={styles.backButton}
      >
        ← 기술과제로 돌아가기
      </Button>
      <div className={styles.patentViewBody}>
        <Patent
          selectedPatentId={selectedPatentId}
          onSelectPatentId={onSelectPatentId}
          onViewMore={onViewMore}
        />
      </div>
    </div>
  );
}

export default PatentView;
