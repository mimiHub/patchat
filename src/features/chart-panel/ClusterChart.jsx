import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Card,
  Badge,
  PillTabs,
  Title,
  Input,
  Stack,
  StatGrid,
} from "../../components/common";
import { clusterData, clusterBubbles } from "./clusterData.js";
import { patentList } from "../patent-panel/patentData.js";
import styles from "./ClusterChart.module.css";

// "전체" 탭을 뺀 실제 클러스터들
const CLUSTERS = clusterData.filter((c) => c.id !== "all");

function getColor(clusterId) {
  return (
    clusterData.find((c) => c.id === clusterId)?.color ||
    "var(--color-gray-400)"
  );
}

// 버블에 마우스를 올렸을 때 보이는 말풍선 (기본 툴팁은 x/y/z 숫자만 나와서 의미가 없음)
function BubbleTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const bubble = payload[0].payload;
  const cluster = clusterData.find((c) => c.id === bubble.clusterId);
  return (
    <div className={styles.tooltip}>
      <span
        className={styles.colorDot}
        style={{ backgroundColor: getColor(bubble.clusterId) }}
      />
      {cluster?.label}
    </div>
  );
}

function ClusterChart({ onOpenPatent }) {
  const [activeId, setActiveId] = useState("all");
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);
  const activeCluster = clusterData.find((c) => c.id === activeId);
  const isAll = activeId === "all";

  const displayBubbles = isAll
    ? clusterBubbles
    : clusterBubbles.filter((b) => b.clusterId === activeId);

  // ---- 전체 보기용: 특허 수가 많은 클러스터부터 ----
  const totalPatents = CLUSTERS.reduce((sum, c) => sum + c.patentCount, 0);
  const rankedClusters = [...CLUSTERS].sort(
    (a, b) => b.patentCount - a.patentCount,
  );

  // ---- 클러스터 1개 보기용 ----
  const clusterStats = isAll
    ? []
    : [
        { label: "특허 수", value: `${activeCluster.patentCount}건` },
        { label: "평균 출원연도", value: activeCluster.avgFilingYear },
        { label: "키워드", value: `${activeCluster.keywordCount}개` },
      ];

  const representativePatents = isAll
    ? []
    : activeCluster.patentIds
        .map((id) => patentList.find((p) => p.id === id))
        .filter(Boolean);

  // 버블 클릭 → 그 클러스터 탭으로 이동 (전체 보기에서만)
  function handleBubbleClick(point) {
    const clusterId = point?.payload?.clusterId ?? point?.clusterId;
    if (isAll && clusterId) setActiveId(clusterId);
  }

  // PC: fill(height:100%)로 팝업 높이에 딱 맞춤 (차트 카드가 남는 높이를 채움)
  // 태블릿·모바일: styles.root가 높이 고정을 풀어줌 (CSS 참고)
  return (
    <Stack
      direction="column"
      gap="md"
      align="stretch"
      fill
      className={styles.root}
    >
      <PillTabs
        options={clusterData}
        selectedId={activeId}
        onChange={setActiveId}
      />

      {activeCluster.title && (
        <Card
          title={activeCluster.title}
          description={activeCluster.description}
          headerAction={
            <Input
              type="switch"
              checked={isDescriptionVisible}
              onChange={() => setIsDescriptionVisible((prev) => !prev)}
              label={isDescriptionVisible ? "숨기기" : "보이기"}
            />
          }
        >
          {isDescriptionVisible && (
            <div className={styles.keywordRow}>
              <span className={styles.keywordCount}>
                {activeCluster.keywordCount}개
              </span>
              <div className={styles.keywordList}>
                {activeCluster.keywords.map((kw, i) => (
                  <Badge key={i} variant="outline">
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* PC: 차트 카드(왼쪽) + 정보 카드(오른쪽) / 태블릿·모바일: 위아래 */}
      <div className={styles.chartBody}>
        {/* scrollHeight="100%": 카드가 남는 높이에 맞춰지고, 넘치면 카드 "안에서" 스크롤 */}
        <Card
          className={styles.chartCard}
          scrollHeight="100%"
          contentClassName={styles.chartCardContent}
        >
          <div className={styles.chartHeader}>
            <Title level={4} className={styles.chartTitle}>
              Cluster
            </Title>
            <p className={styles.chartCount}>
              전체 클러스터: <strong>{CLUSTERS.length}건</strong> · 특허{" "}
              <strong>{totalPatents}건</strong>
            </p>
          </div>

          <div className={styles.chartArea}>
            {/* 고정 높이(360px) 대신 카드에 남는 높이를 차트가 다 사용 */}
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" hide domain={[0, 100]} />
                <YAxis type="number" dataKey="y" hide domain={[0, 100]} />
                <ZAxis type="number" dataKey="z" range={[400, 1800]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={<BubbleTooltip />}
                />
                <Scatter
                  data={displayBubbles}
                  onClick={handleBubbleClick}
                  className={isAll ? styles.clickable : undefined}
                >
                  {displayBubbles.map((entry, index) => (
                    <Cell key={index} fill={getColor(entry.clusterId)} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            {isAll && (
              <p className={styles.chartHint}>
                버블을 누르면 해당 클러스터로 이동해요
              </p>
            )}
          </div>
        </Card>

        <Card className={styles.sideCard} scrollHeight="100%">
          <aside className={styles.sidePanel}>
            {isAll ? (
              // 제목+목록을 div로 묶어야 패널의 flex gap(20px)이 둘 사이에 끼지 않음
              <div>
                {/* 전체 보기: 클러스터 목록 = 색 범례 + 바로가기 */}
                <p className={styles.sideTitle}>클러스터별 특허 수</p>
                <ul className={styles.clusterList}>
                  {rankedClusters.map((cluster) => (
                    <li key={cluster.id}>
                      <button
                        type="button"
                        className={styles.clusterItem}
                        onClick={() => setActiveId(cluster.id)}
                      >
                        <span className={styles.clusterName}>
                          <span
                            className={styles.colorDot}
                            style={{ backgroundColor: cluster.color }}
                          />
                          <span className={styles.ellipsis}>
                            {cluster.label}
                          </span>
                        </span>
                        <span className={styles.clusterCount}>
                          {cluster.patentCount}건
                        </span>
                        {/* 전체 대비 비중 막대 */}
                        <span className={styles.shareTrack}>
                          <span
                            className={styles.shareBar}
                            style={{
                              width: `${(cluster.patentCount / totalPatents) * 100}%`,
                              backgroundColor: cluster.color,
                            }}
                          />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <StatGrid items={clusterStats} columns={3} />

                <div>
                  <p className={styles.sideTitle}>주요 출원인</p>
                  <ol className={styles.applicantList}>
                    {activeCluster.topApplicants.map((applicant, index) => (
                      <li key={applicant.name}>
                        <span className={styles.applicantRank}>
                          {index + 1}
                        </span>
                        <span className={styles.ellipsis}>
                          {applicant.name}
                        </span>
                        <span className={styles.applicantCount}>
                          {applicant.count}건
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <p className={styles.sideTitle}>대표 특허</p>
                  <ul className={styles.patentList}>
                    {representativePatents.map((patent) => (
                      <li key={patent.id}>
                        <button
                          type="button"
                          className={styles.patentItem}
                          onClick={() => onOpenPatent?.(patent.id)}
                        >
                          <span className={styles.patentText}>
                            <span className={styles.patentTitle}>
                              {patent.title}
                            </span>
                            <span className={styles.patentMeta}>
                              {patent.patentNumber} · {patent.applicant}
                            </span>
                          </span>
                          <span className={styles.arrow} aria-hidden="true">
                            ›
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </aside>
        </Card>
      </div>
    </Stack>
  );
}

export default ClusterChart;
