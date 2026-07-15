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
import { Card, Badge, Tab , PillTabs } from "../../components/common";
import { clusterData, clusterBubbles } from "./clusterData.js";
import styles from "./ClusterChart.module.css";

function ClusterChart() {
  const [activeId, setActiveId] = useState("all");
  const activeCluster = clusterData.find((c) => c.id === activeId);

  const displayBubbles =
    activeId === "all"
      ? clusterBubbles
      : clusterBubbles.filter((b) => b.clusterId === activeId);

  const tabs = clusterData.map((cluster) => ({
    label: cluster.label,
    content: null, // Tab의 content는 안 쓰고, activeIndex만 활용
  }));

  function getColor(clusterId) {
    return clusterData.find((c) => c.id === clusterId)?.color || "var(--color-gray-400)";
  }

  return (
    <div className={styles.container}>
      <PillTabs
        options={clusterData}
        selectedId={activeId}
        onChange={setActiveId}
      />

      {activeCluster.title && (
        <Card
          title={activeCluster.title}
          description={activeCluster.description}
        >
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
        </Card>
      )}

      <div className={styles.chartHeader}>
        <p className={styles.chartTitle}>클러스터 차트</p>
        <p className={styles.chartCount}>
          전체 클러스터: <strong>{clusterData.length - 1}건</strong>
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" hide domain={[0, 100]} />
          <YAxis type="number" dataKey="y" hide domain={[0, 100]} />
          <ZAxis type="number" dataKey="z" range={[400, 1800]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={displayBubbles}>
            {displayBubbles.map((entry, index) => (
              <Cell key={index} fill={getColor(entry.clusterId)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ClusterChart;