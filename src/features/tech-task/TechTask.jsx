import { useState } from "react";
import {
  Sankey,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Rectangle,
} from "recharts";
import {
  Tab,
  Stack,
  Title,
  Badge,
  Button,
  Input,
  Dropdown,
  Tooltip,
} from "../../components/common";
import { IconSidebar } from "../../layouts/Nav/icons";
import Patent from "../patent-panel/Patent.jsx";
import {
  challenges,
  sankeyData,
  heatmapColumns,
  heatmapData,
} from "./techTaskData.js";
import styles from "./TechTask.module.css";

const CHART_TABS = [{ label: "SANKEY DIAGRAM" }, { label: "HEATMAP DIAGRAM" }];
const LIST_PAGE_SIZE = 8;

// 노드/링크를 구분하기 위한 색상 팔레트 (Chart/ClusterChart와 동일 계열)
const SANKEY_COLORS = [
  "#3b82f6",
  "#ec4899",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
];

function SankeyNode({ x, y, width, height, index, payload }) {
  const color = SANKEY_COLORS[index % SANKEY_COLORS.length];
  const isOut = x + width > 300;
  return (
    <g>
      <Rectangle x={x} y={y} width={width} height={height} fill={color} radius={2} />
      <text
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2}
        dy="0.35em"
        textAnchor={isOut ? "end" : "start"}
        fontSize={12}
        fill="var(--color-text-primary)"
      >
        {payload.name}
      </text>
    </g>
  );
}

function SankeyLink(props) {
  const {
    sourceX,
    sourceY,
    sourceControlX,
    targetX,
    targetY,
    targetControlX,
    linkWidth,
    payload,
  } = props;
  const sourceIndex = payload?.source?.index ?? 0;
  const color = SANKEY_COLORS[sourceIndex % SANKEY_COLORS.length];

  return (
    <path
      d={`M${sourceX},${sourceY}C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
      fill="none"
      stroke={color}
      strokeOpacity={0.35}
      strokeWidth={linkWidth}
    />
  );
}

function SankeyChartView() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Sankey
        data={sankeyData}
        nodePadding={30}
        nodeWidth={12}
        linkCurvature={0.5}
        margin={{ top: 10, right: 60, bottom: 10, left: 10 }}
        node={<SankeyNode />}
        link={<SankeyLink />}
      >
        <RechartsTooltip />
      </Sankey>
    </ResponsiveContainer>
  );
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function HeatmapChartView() {
  const maxValue = Math.max(...heatmapData.flatMap((row) => row.values));

  return (
    <div className={styles.heatmap}>
      <div className={styles.heatmapHeaderRow}>
        <div className={styles.heatmapRowLabel} />
        {heatmapColumns.map((col) => (
          <div key={col} className={styles.heatmapColLabel}>
            {col}
          </div>
        ))}
      </div>
      {heatmapData.map((row) => (
        <div key={row.label} className={styles.heatmapRow}>
          <div className={styles.heatmapRowLabel}>{row.label}</div>
          {row.values.map((value, i) => (
            <div
              key={i}
              className={styles.heatmapCell}
              style={{
                backgroundColor: hexToRgba(
                  "#0d6efd",
                  maxValue === 0 ? 0 : value / maxValue,
                ),
              }}
              title={`${row.label} · ${heatmapColumns[i]}: ${value}건`}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function TechTask({ selectedPatentId, onSelectPatentId, onViewMore }) {
  const [activeChartTab, setActiveChartTab] = useState(0);
  const [view, setView] = useState("challenge"); // "challenge" | "patent"
  const [challengePageIndex, setChallengePageIndex] = useState(0);
  const [listPageIndex, setListPageIndex] = useState(0);

  const [isChartCollapsed, setIsChartCollapsed] = useState(false);

  // ---- 차트 설정 ----
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

  const safeChallengeIndex =
    filteredChallenges.length > 0
      ? Math.min(challengePageIndex, filteredChallenges.length - 1)
      : 0;
  const currentChallenge = filteredChallenges[safeChallengeIndex] ?? null;

  // 햄버거로 특허상세보기 열 때는 첫 번째 항목의 특허를 기준으로 이어줌
  const currentItem = currentChallenge?.items[0] ?? null;

  // PC 전체 리스트용 - 4개씩 페이지로 나눔
  const totalListPages = Math.max(
    1,
    Math.ceil(filteredChallenges.length / LIST_PAGE_SIZE),
  );
  const safeListPageIndex = Math.min(listPageIndex, totalListPages - 1);
  const visibleChallenges = filteredChallenges.slice(
    safeListPageIndex * LIST_PAGE_SIZE,
    safeListPageIndex * LIST_PAGE_SIZE + LIST_PAGE_SIZE,
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

  // 차트 안 작은 토글 버튼: split ↔ list 만 빠르게 전환 (chart 단독 모드는 뷰필터에서)
  function handleQuickChartToggle() {
    setIsChartCollapsed((prev) => !prev);
  }

  return (
    <Stack direction="column" gap="lg" align="stretch" fill>
      <Title level={4}>기술과제</Title>

      <Stack justify="between" align="center" className={styles.toolbarRow}>
        <Tab
          variant="pill"
          tabs={CHART_TABS}
          activeIndex={activeChartTab}
          onChange={setActiveChartTab}
        />

        <Stack gap="sm">
          <Dropdown label="차트 설정" align="right" disabled={view === "patent"}>
            <div className={styles.settingsPanel}>
              <label className={styles.settingLabel}>
                특허 건수 기준(min) : {minPatentCount}건 이상
              </label>
              <input
                type="range"
                min={1}
                max={maxPatentCount}
                value={minPatentCount}
                onChange={(e) => setMinPatentCount(Number(e.target.value))}
                className={styles.rangeInput}
              />

              <label className={styles.settingLabel}>
                상위 N개만 보기 (0=전체)
              </label>
              <Input
                type="text"
                value={topN}
                onChange={(e) => setTopN(Number(e.target.value) || 0)}
                placeholder="0"
              />

              <label className={styles.settingLabel}>
                텍스트 검색(문제/해결)
              </label>
              <Input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="키워드 입력"
              />

              <label className={styles.settingLabel}>특정 특허만 남기기</label>
              <Input
                type="select"
                value={specificPatentId}
                onChange={(e) => setSpecificPatentId(e.target.value)}
                options={allPatentCodes}
                placeholder="특허 ID 선택 (미선택=전체)"
              />
            </div>
          </Dropdown>
        </Stack>
      </Stack>

      <Stack direction="row" gap="sm" align="stretch" className={styles.body}>
        {/* 좌측 차트 영역 - Nav처럼 폭(width)만 줄었다 늘어남, 버튼은 항상 카드 안에 있음 */}
        <div
          className={`${styles.chartPanel} ${
            isChartCollapsed ? styles.chartCollapsed : ""
          }`}
        >
          <button
            type="button"
            className={styles.chartToggle}
            onClick={handleQuickChartToggle}
            aria-label={isChartCollapsed ? "차트 펼치기" : "차트 접기"}
          >
            <IconSidebar on={!isChartCollapsed} />
          </button>
          {!isChartCollapsed && (
            <div className={styles.chartBody}>
              {activeChartTab === 0 ? (
                <SankeyChartView />
              ) : (
                <HeatmapChartView />
              )}
            </div>
          )}
        </div>

        {/* 우측: 기술과제 목록/상세 또는 특허상세보기 */}
        <div className={styles.mainPanel}>
            {view === "patent" ? (
              <div className={styles.patentView}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBackToChallenge}
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
            ) : (
              <Stack
                direction="row"
                gap="sm"
                align="stretch"
                fill
                className={styles.challengeSection}
              >
                <div className={styles.challengeList}>
                  {filteredChallenges.length === 0 ? (
                    <p className={styles.emptyState}>
                      조건에 맞는 기술과제가 없어요. 필터를 조정해보세요.
                    </p>
                  ) : (
                    <>
                      {/* PC(1024px 이상) - 전체 리스트, 클릭해서 선택 */}
                      <div className={styles.challengeListFull}>
                        {visibleChallenges.map((challenge, i) => {
                          const index = safeListPageIndex * LIST_PAGE_SIZE + i;
                          return (
                          <button
                            type="button"
                            key={challenge.id}
                            className={`${styles.challengeRow} ${
                              index === safeChallengeIndex
                                ? styles.challengeRowActive
                                : ""
                            }`}
                            onClick={() => setChallengePageIndex(index)}
                          >
                            <span className={styles.challengeLabelGroup}>
                              <span className={styles.challengeTag}>
                                해결 수단
                              </span>
                              <span className={styles.challengeLabel}>
                                {challenge.label}
                                <span className={styles.challengeCount}>
                                  {" "}
                                  (특허: {challenge.patentCount}건)
                                </span>
                              </span>
                            </span>
                            <span className={styles.challengeActions}>
                              <Tooltip
                                text="특허상세보기로 가기"
                                position="left"
                              >
                                <span
                                  role="button"
                                  tabIndex={0}
                                  className={styles.hamburgerBtn}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setChallengePageIndex(index);
                                    handleOpenPatentView();
                                  }}
                                  aria-label="특허상세보기로 가기"
                                >
                                  ☰
                                </span>
                              </Tooltip>
                            </span>
                          </button>
                          );
                        })}

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
                      <div className={styles.challengeListSingle}>
                        <div
                          className={`${styles.challengeRow} ${styles.challengeRowActive}`}
                        >
                          <span className={styles.challengeLabelGroup}>
                            <span className={styles.challengeTag}>
                              해결 수단
                            </span>
                            <span className={styles.challengeLabel}>
                              {currentChallenge.label}
                              <span className={styles.challengeCount}>
                                {" "}
                                (특허: {currentChallenge.patentCount}건)
                              </span>
                            </span>
                          </span>
                          <span className={styles.challengeActions}>
                            <Tooltip
                              text="특허상세보기로 가기"
                              position="left"
                            >
                              <span
                                role="button"
                                tabIndex={0}
                                className={styles.hamburgerBtn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenPatentView();
                                }}
                                aria-label="특허상세보기로 가기"
                              >
                                ☰
                              </span>
                            </Tooltip>
                          </span>
                        </div>

                        {filteredChallenges.length > 1 && (
                          <div className={styles.itemPagination}>
                            <button
                              type="button"
                              className={styles.pageArrow}
                              onClick={handleChallengePrev}
                              disabled={safeChallengeIndex === 0}
                              aria-label="이전 기술과제"
                            >
                              ‹
                            </button>
                            <span className={styles.pageIndicator}>
                              {safeChallengeIndex + 1} /{" "}
                              {filteredChallenges.length}
                            </span>
                            <button
                              type="button"
                              className={styles.pageArrow}
                              onClick={handleChallengeNext}
                              disabled={
                                safeChallengeIndex ===
                                filteredChallenges.length - 1
                              }
                              aria-label="다음 기술과제"
                            >
                              ›
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className={styles.challengeDetail}>
                  {currentChallenge ? (
                    <>
                      <Stack justify="between" align="baseline">
                        <Title level={4}>{currentChallenge.label}</Title>
                        <span className={styles.detailCount}>
                          총: <strong>{currentChallenge.patentCount}건</strong>
                        </span>
                      </Stack>
                      <div className={styles.detailList}>
                        {currentChallenge.items.map((item, i) => (
                          <div key={i} className={styles.detailItem}>
                            <p className={styles.detailPatentCode}>
                              {item.patentCode}
                            </p>
                            <div className={styles.detailRow}>
                              <Badge variant="outline">과제</Badge>
                              <p className={styles.detailText}>{item.task}</p>
                            </div>
                            <div className={styles.detailRow}>
                              <Badge variant="primary">해결</Badge>
                              <p className={styles.detailText}>
                                {item.solution}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className={styles.emptyState}>
                      조건에 맞는 기술과제가 없어요.
                    </p>
                  )}
                </div>
              </Stack>
            )}
          </div>
      </Stack>
    </Stack>
  );
}

export default TechTask;
