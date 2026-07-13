import { useState } from "react";
import { patentList } from "./patentData.js";
import styles from "./Patent.module.css";

function Patent() {
  const [selectedId, setSelectedId] = useState(patentList[0].id);

  const selectedPatent = patentList.find((p) => p.id === selectedId);

  return (
    <div className={styles.container}>
      {/* 좌측: 목록 */}
      <ul className={styles.list}>
        {patentList.map((patent) => (
          <li
            key={patent.id}
            className={
              patent.id === selectedId ? styles.itemActive : styles.item
            }
            onClick={() => setSelectedId(patent.id)}
          >
            <p className={styles.itemTitle}>{patent.title}</p>
            <p className={styles.itemNumber}>{patent.patentNumber}</p>
          </li>
        ))}
      </ul>

      {/* 우측: 상세 내용 */}
      <div className={styles.detail}>
        <h2>{selectedPatent.title}</h2>
        <p>
          <strong>특허번호</strong> {selectedPatent.patentNumber}
        </p>
        <p>
          <strong>출원인</strong> {selectedPatent.applicant}
        </p>
        <p>
          <strong>발명자</strong> {selectedPatent.inventor}
        </p>
        <p>
          <strong>기술분류</strong> {selectedPatent.techCategory}
        </p>

        <h3>요약</h3>
        <p>{selectedPatent.summary}</p>

        <h3>청구범위</h3>
        <p>{selectedPatent.claims}</p>

        <h3>명세서</h3>
        <p>{selectedPatent.specification}</p>
      </div>
    </div>
  );
}

export default Patent;
