import { useState } from "react";
import { Tab, Stack, Dropdown } from "../../components/common";
import ChartPanel from "./ChartPanel.jsx";
import ChartSettingsForm from "./ChartSettingsForm.jsx";
import ChallengeView from "./ChallengeView.jsx";
import PatentView from "./PatentView.jsx";
import { challenges } from "./techTaskData.js";
import styles from "./TechTask.module.css";

const CHART_TABS = [{ label: "SANKEY DIAGRAM" }, { label: "HEATMAP DIAGRAM" }];
const LIST_PAGE_SIZE = 7;

function TechTask({ selectedPatentId, onSelectPatentId, onViewMore }) {
  const [activeChartTab, setActiveChartTab] = useState(0);
  const [view, setView] = useState("challenge"); // "challenge" | "patent"
  const [challengePageIndex, setChallengePageIndex] = useState(0);
  const [listPageIndex, setListPageIndex] = useState(0);
  const [isChartCollapsed, setIsChartCollapsed] = useState(false);

  // ---- 차트 설정(필터) ----
  const [minPatentCount, setMinPatentCount] = useState(1);
  const [topN, setTopN] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [specificPatentId, setSpecificPatentId] = useState("");

  const maxPatentCount = Math.max(...challenges.map((c) => c.patentCount));
  const allPatentCodes = [
    ...new Set(challenges.flatMap((c) => c.items.map((i) => i.patentCode))),
  ];

  // ---- 필터링된 기술과제 목록 ----
  let filteredChallenges = challenges.filter(
    (c) => c.patentCount >= minPatentCount,
  );

  if (searchText.trim()) {
    const q = searchText.trim().toLowerCase();
    filteredChallenges = filteredChallenges
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (item) =>
            item.task.toLowerCase().includes(q) ||
            item.solution.toLowerCase().includes(q),
        ),
      }))
      .filter((c) => c.items.length > 0);
  }

  if (specificPatentId) {
    filteredChallenges = filteredChallenges
      .map((c) => ({
        ...c,
        items: c.items.filter((item) => item.patentCode === specificPatentId),
      }))
      .filter((c) => c.items.length > 0);
  }

  filteredChallenges = [...filteredChallenges].sort(
    (a, b) => b.patentCount - a.patentCount,
  );
  if (topN > 0) {
    filteredChallenges = filteredChallenges.slice(0, topN);
  }

  // ---- 챌린지(탭) 단위 페이지네이션 (태블릿/모바일 카드 1개용) ----
  const safeChallengeIndex =
    filteredChallenges.length > 0
      ? Math.min(challengePageIndex, filteredChallenges.length - 1)
      : 0;
  const currentChallenge = filteredChallenges[safeChallengeIndex] ?? null;
  const currentItem = currentChallenge?.items[0] ?? null;

  // ---- PC 전체 리스트용 페이지네이션 (7개씩) ----
  const totalListPages = Math.max(
    1,
    Math.ceil(filteredChallenges.length / LIST_PAGE_SIZE),
  );
  const safeListPageIndex = Math.min(listPageIndex, totalListPages - 1);
  const listPageStart = safeListPageIndex * LIST_PAGE_SIZE;
  const visibleChallenges = filteredChallenges.slice(
    listPageStart,
    listPageStart + LIST_PAGE_SIZE,
  );

  function handleListPagePrev() {
    setListPageIndex((p) => Math.max(0, p - 1));
  }

  function handleListPageNext() {
    setListPageIndex((p) => Math.min(totalListPages - 1, p + 1));
  }

  function handleChallengePrev() {
    setChallengePageIndex((i) => Math.max(0, i - 1));
  }

  function handleChallengeNext() {
    setChallengePageIndex((i) =>
      Math.min(filteredChallenges.length - 1, i + 1),
    );
  }

  function handleOpenPatentView() {
    // 지금 보고 있던 항목의 특허 번호를 그대로 이어받아서, 특허상세보기가
    // 관련 없는 기본 특허가 아니라 이 항목의 특허를 바로 보여주도록 연결
    if (currentItem) {
      onSelectPatentId(currentItem.patentCode);
    }
    setView("patent");
  }

  function handleBackToChallenge() {
    setView("challenge");
  }

  function handleQuickChartToggle() {
    setIsChartCollapsed((prev) => !prev);
  }

  return (
    <Stack direction="column" gap="lg" align="stretch" fill>
      <Stack justify="between" align="center" className={styles.toolbarRow}>
        <Tab
          variant="pill"
          tabs={CHART_TABS}
          activeIndex={activeChartTab}
          onChange={setActiveChartTab}
        />

        <Stack gap="sm">
          <Dropdown
            label="차트 설정"
            align="right"
            disabled={view === "patent"}
          >
            <ChartSettingsForm
              minPatentCount={minPatentCount}
              onMinPatentCountChange={setMinPatentCount}
              maxPatentCount={maxPatentCount}
              topN={topN}
              onTopNChange={setTopN}
              searchText={searchText}
              onSearchTextChange={setSearchText}
              specificPatentId={specificPatentId}
              onSpecificPatentIdChange={setSpecificPatentId}
              allPatentCodes={allPatentCodes}
            />
          </Dropdown>
        </Stack>
      </Stack>

      <Stack direction="row" gap="sm" align="stretch" className={styles.body}>
        <ChartPanel
          activeChartTab={activeChartTab}
          isCollapsed={isChartCollapsed}
          onToggle={handleQuickChartToggle}
        />

        <div className={styles.mainPanel}>
          {view === "patent" ? (
            <PatentView
              onBack={handleBackToChallenge}
              selectedPatentId={selectedPatentId}
              onSelectPatentId={onSelectPatentId}
              onViewMore={onViewMore}
            />
          ) : (
            <ChallengeView
              filteredChallenges={filteredChallenges}
              visibleChallenges={visibleChallenges}
              listPageStart={listPageStart}
              safeChallengeIndex={safeChallengeIndex}
              totalListPages={totalListPages}
              safeListPageIndex={safeListPageIndex}
              onSelectChallenge={setChallengePageIndex}
              onOpenPatentView={handleOpenPatentView}
              onListPagePrev={handleListPagePrev}
              onListPageNext={handleListPageNext}
              currentChallenge={currentChallenge}
              onChallengePrev={handleChallengePrev}
              onChallengeNext={handleChallengeNext}
            />
          )}
        </div>
      </Stack>
    </Stack>
  );
}

export default TechTask;
