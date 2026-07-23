import { patentList } from "./patentData.js";
import { Card, Tab, Badge, Button, Title, Stack } from "../../components/common";
import styles from "./Patent.module.css";

function Patent({ selectedPatentId, onSelectPatentId, onViewMore }) {
  const selectedId = selectedPatentId ?? patentList[0].id;
  const selectedPatent =
    patentList.find((p) => p.id === selectedId) ?? patentList[0];

  const currentIndex = patentList.findIndex((p) => p.id === selectedPatent.id);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  function handlePrev() {
    if (safeIndex > 0) {
      onSelectPatentId(patentList[safeIndex - 1].id);
    }
  }

  function handleNext() {
    if (safeIndex < patentList.length - 1) {
      onSelectPatentId(patentList[safeIndex + 1].id);
    }
  }

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
      content: (
        <p className={styles.tabText}>{selectedPatent.specification}</p>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Stack justify="between" align="baseline" className={styles.pageHeader}>
        <Title level={4}>특허리스트</Title>
        <span className={styles.listCount}>총 {patentList.length}건</span>
      </Stack>

      <Stack
        direction="row"
        gap="sm"
        align="stretch"
        className={styles.pageCountent}
      >
        <div className={styles.listWrapper}>
          <div className={styles.listScroll}>
            <Card size="sm" className="fillCard" scrollHeight="100%">
              {/* PC(1024px 이상) - 전체 리스트 */}
              <ul className={`${styles.list} ${styles.listFull}`}>
                {patentList.map((patent) => (
                  <li
                    key={patent.id}
                    className={
                      patent.id === selectedId
                        ? styles.itemActive
                        : styles.item
                    }
                    onClick={() => onSelectPatentId(patent.id)}
                  >
                    <p className={styles.itemTitle}>{patent.title}</p>
                    <p className={styles.itemNumber}>{patent.patentNumber}</p>
                  </li>
                ))}
              </ul>

              {/* 태블릿/모바일(1023px 이하) - 카드 1개 + 페이지네이션 */}
              <div className={styles.listSingle}>
                <div className={styles.itemActive}>
                  <p className={styles.itemTitle}>{selectedPatent.title}</p>
                  <p className={styles.itemNumber}>
                    {selectedPatent.patentNumber}
                  </p>
                </div>

                {patentList.length > 1 && (
                  <div className={styles.itemPagination}>
                    <button
                      type="button"
                      className={styles.pageArrow}
                      onClick={handlePrev}
                      disabled={safeIndex === 0}
                      aria-label="이전 특허"
                    >
                      ‹
                    </button>
                    <span className={styles.pageIndicator}>
                      {safeIndex + 1} / {patentList.length}
                    </span>
                    <button
                      type="button"
                      className={styles.pageArrow}
                      onClick={handleNext}
                      disabled={safeIndex === patentList.length - 1}
                      aria-label="다음 특허"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        <div className={styles.detail}>
          <Card
            size="sm"
            className="fillCard"
            scrollHeight="100%"
            contentClassName={styles.detailScroll}
            title={selectedPatent.title}
            description={selectedPatent.patentNumber}
          >
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

            <Tab variant="pill" tabs={tabs} />
          </Card>
        </div>
      </Stack>
    </div>
  );
}

export default Patent;
