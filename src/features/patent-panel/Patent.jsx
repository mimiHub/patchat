import { useState } from "react";
import { patentList } from "./patentData.js";
import {
  Card,
  Tab,
  Badge,
  Button,
  Title,
  Stack,
  StatGrid,
} from "../../components/common";
import styles from "./Patent.module.css";

const LIST_PAGE_SIZE = 6;

function Patent({ selectedPatentId, onSelectPatentId, onViewMore }) {
  const [listPageIndex, setListPageIndex] = useState(0);

  const selectedId = selectedPatentId ?? patentList[0].id;
  const selectedPatent =
    patentList.find((p) => p.id === selectedId) ?? patentList[0];

  const currentIndex = patentList.findIndex((p) => p.id === selectedPatent.id);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  // ---- 태블릿/모바일 카드 1개 - 특허 단위 이전/다음 ----
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

  // ---- PC 전체 리스트 - 6개씩 페이지 단위 ----
  const totalListPages = Math.max(
    1,
    Math.ceil(patentList.length / LIST_PAGE_SIZE),
  );
  const safeListPageIndex = Math.min(listPageIndex, totalListPages - 1);
  const listPageStart = safeListPageIndex * LIST_PAGE_SIZE;
  const visiblePatents = patentList.slice(
    listPageStart,
    listPageStart + LIST_PAGE_SIZE,
  );

  function handleListPagePrev() {
    setListPageIndex((p) => Math.max(0, p - 1));
  }

  function handleListPageNext() {
    setListPageIndex((p) => Math.min(totalListPages - 1, p + 1));
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

  const hasDrawing = selectedPatent.drawings?.length > 0;

  // 서지정보 표 - 값이 없으면(예: 심사중이라 등록일 없음) "-"로 표시
  const biblioRows = [
    { label: "출원인", value: selectedPatent.applicant },
    { label: "발명자", value: selectedPatent.inventor },
    { label: "대리인", value: selectedPatent.agent },
    { label: "출원일", value: selectedPatent.filingDate },
    { label: "공개일", value: selectedPatent.publicationDate },
    { label: "등록일", value: selectedPatent.registrationDate },
    { label: "IPC", value: selectedPatent.ipc },
  ];

  const stats = selectedPatent.stats ?? {};
  const statItems = [
    { label: "청구항", value: stats.claimCount ?? "-" },
    { label: "인용", value: stats.citationCount ?? "-" },
    { label: "피인용", value: stats.citedByCount ?? "-" },
    { label: "패밀리", value: stats.familyCount ?? "-" },
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
              {/* PC(1024px 이상) - 6개씩 페이지 단위 리스트, rows 그룹은 위,
                  페이지네이션은 맨 아래로 (space-between) */}
              <div className={styles.listFullWrapper}>
                <ul className={styles.listFull}>
                  {visiblePatents.map((patent) => (
                    <li
                      key={patent.id}
                      className={
                        patent.id === selectedId
                          ? styles.itemActive
                          : styles.item
                      }
                      onClick={() => onSelectPatentId(patent.id)}
                    >
                      <div className={styles.itemBody}>
                        <p className={styles.itemTitle}>{patent.title}</p>
                        <p className={styles.itemNumber}>
                          {patent.patentNumber}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {totalListPages > 1 && (
                  <div className={styles.itemPagination}>
                    <button
                      type="button"
                      className={styles.pageArrow}
                      onClick={handleListPagePrev}
                      disabled={safeListPageIndex === 0}
                      aria-label="이전 페이지"
                    >
                      ‹
                    </button>
                    <span className={styles.pageIndicator}>
                      {safeListPageIndex + 1} / {totalListPages}
                    </span>
                    <button
                      type="button"
                      className={styles.pageArrow}
                      onClick={handleListPageNext}
                      disabled={safeListPageIndex === totalListPages - 1}
                      aria-label="다음 페이지"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>

              {/* 태블릿/모바일(1023px 이하) - 카드 1개 + 페이지네이션 */}
              <div className={styles.listSingle}>
                <div className={styles.singleCard}>
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

            {/* "대표도면 + 더보기" 제목줄은 2단 바깥(위)에 둬서
                아래 도면과 서지정보 표의 윗선이 같은 높이에서 시작하도록 */}
            {hasDrawing && (
              <div className={styles.drawingHeader}>
                <p className={styles.drawingTitle}>대표도면</p>
                {selectedPatent.drawings.length > 1 && (
                  <Button variant="secondary" size="sm" onClick={onViewMore}>
                    더보기
                  </Button>
                )}
              </div>
            )}

            {/* 대표도면(왼쪽) + 서지정보(오른쪽) 2단. 도면이 없으면 1단 */}
            <div
              className={
                hasDrawing
                  ? styles.infoGrid
                  : `${styles.infoGrid} ${styles.infoGridSingle}`
              }
            >
              {hasDrawing && (
                <div className={styles.drawingSection}>
                  <img
                    className={styles.drawingImage}
                    src={selectedPatent.drawings[0].url}
                    alt={selectedPatent.drawings[0].alt}
                  />
                </div>
              )}

              <div className={styles.infoSide}>
                {/* 서지정보: "항목명 - 값" 짝이라 dl(정의 목록)로 마크업 */}
                <dl className={styles.biblio}>
                  {biblioRows.map((row) => (
                    <div key={row.label} className={styles.biblioRow}>
                      <dt>{row.label}</dt>
                      <dd>{row.value || "-"}</dd>
                    </div>
                  ))}
                </dl>

                <StatGrid items={statItems} />
              </div>
            </div>

            <Tab variant="pill" size="sm" tabs={tabs} />
          </Card>
        </div>
      </Stack>
    </div>
  );
}

export default Patent;
