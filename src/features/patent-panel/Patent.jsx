import { patentList } from "./patentData.js";
import Card from "../../components/common/Card.jsx";
import Tab from "../../components/common/Tab.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import styles from "./Patent.module.css";

function Patent({ selectedPatentId, onSelectPatentId, onViewMore }) {
  const selectedId = selectedPatentId ?? patentList[0].id;
  const selectedPatent = patentList.find((p) => p.id === selectedId);

  const tabs = [
    {
      label: "요약",
      content: <p className={styles.tabText}>{selectedPatent.summary}</p>,
    },
    {
      label: "청구범위",
      content: <p className={styles.tabText}>{selectedPatent.claims}</p>,
    },
    {
      label: "명세서",
      content: <p className={styles.tabText}>{selectedPatent.specification}</p>,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.listWrapper}>
        <p className={styles.listHeader}>
          특허리스트{" "}
          <span className={styles.listCount}>총 {patentList.length}건</span>
        </p>
        <ul className={styles.list}>
          {patentList.map((patent) => (
            <li
              key={patent.id}
              className={
                patent.id === selectedId ? styles.itemActive : styles.item
              }
              onClick={() => onSelectPatentId(patent.id)}
            >
              <p className={styles.itemTitle}>{patent.title}</p>
              <p className={styles.itemNumber}>{patent.patentNumber}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.detail}>
        <Card className="fillCard" title={selectedPatent.title} description={selectedPatent.patentNumber}>
          <div className={styles.metaRow}>
            <Badge variant="outline">{selectedPatent.techCategory}</Badge>
            <Badge variant="primary">{selectedPatent.status}</Badge>
          </div>
          <p className={styles.metaText}>
            <strong>출원인</strong> {selectedPatent.applicant}
          </p>
          <p className={styles.metaText}>
            <strong>발명자</strong> {selectedPatent.inventor}
          </p>

          {selectedPatent.drawings?.length > 0 && (
            <div className={styles.drawingSection}>
              <div className={styles.drawingHeader}>
                <p className={styles.drawingTitle}>대표도면</p>
                {selectedPatent.drawings.length > 1 && (
                  <Button variant="secondary" size="sm" onClick={onViewMore}>
                    더보기
                  </Button>
                )}
              </div>
              <img
                className={styles.drawingImage}
                src={selectedPatent.drawings[0].url}
                alt={selectedPatent.drawings[0].alt}
              />
            </div>
          )}

          <Tab tabs={tabs} />
        </Card>
      </div>
    </div>
  );
}

export default Patent;