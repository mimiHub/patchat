import { useState } from "react";
import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  Sankey,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  Rectangle,
} from "recharts";
import { Menu, PillTabs, Card, Badge, Title, Input, Stack } from "../../components/common";
import { fieldOptions, topNOptions, chartDataByField } from "../chart-panel/chartData.js";
import { clusterData, clusterBubbles } from "../chart-panel/clusterData.js";
import {
  sankeyData,
  heatmapColumns,
  heatmapData,
} from "../tech-task/techTaskData.js";
import barStyles from "../chart-panel/Chart.module.css";
import clusterStyles from "../chart-panel/ClusterChart.module.css";
import heatmapStyles from "../tech-task/TechTask.module.css";

const BAR_COLORS = [
  "#ec4899",
  "#8b5cf6",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#06b6d4",
  "#f97316",
  "#84cc16",
  "#6366f1",
];

// 노드/링크를 구분하기 위한 색상 팔레트 (Sankey 전용)
const SANKEY_COLORS = [
  "#3b82f6",
  "#ec4899",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
];

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ---------------------------------------------
// 막대 차트 (BarChart)
// ---------------------------------------------
function BarChartView() {
  const [selectedFieldId, setSelectedFieldId] = useState("cpc");
  const [selectedTopNId, setSelectedTopNId] = useState("top5");

  const selectedField = fieldOptions.find((f) => f.id === selectedFieldId);
  const selectedTopN = topNOptions.find((t) => t.id === selectedTopNId);

  const fullData = chartDataByField[selectedFieldId] || [];
  const displayData = fullData.slice(0, selectedTopN.value);

  const topNMenuItems = topNOptions.map((option) => ({
    id: option.id,
    label: option.label,
    onClick: () => setSelectedTopNId(option.id),
  }));

  return (
    <Stack direction="column" gap="md" align="stretch" fill>
      <PillTabs
        options={fieldOptions}
        selectedId={selectedFieldId}
        onChange={setSelectedFieldId}
      />

      <Card>
        <div className={barStyles.chartHeader}>
          <Title level={4} className={barStyles.chartTitle}>
            {selectedField.label}
          </Title>
          <Menu
            label={selectedTopN.label}
            items={topNMenuItems}
            selectedId={selectedTopNId}
            dropdownAlign="right"
          />
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={displayData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip />
            <Bar dataKey="value" barSize={28} radius={[0, 4, 4, 0]}>
              {displayData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={BAR_COLORS[index % BAR_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Stack>
  );
}

// ---------------------------------------------
// 클러스터 차트 (ScatterChart)
// ---------------------------------------------
function ClusterChartView() {
  const [activeId, setActiveId] = useState("all");
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);
  const activeCluster = clusterData.find((c) => c.id === activeId);

  const displayBubbles =
    activeId === "all"
      ? clusterBubbles
      : clusterBubbles.filter((b) => b.clusterId === activeId);

  function getColor(clusterId) {
    return (
      clusterData.find((c) => c.id === clusterId)?.color ||
      "var(--color-gray-400)"
    );
  }

  return (
    <Stack direction="column" gap="md" align="stretch" fill>
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
            <div className={clusterStyles.keywordRow}>
              <span className={clusterStyles.keywordCount}>
                {activeCluster.keywordCount}개
              </span>
              <div className={clusterStyles.keywordList}>
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

      <Card className="fillCard">
        <div className={clusterStyles.chartHeader}>
          <Title level={4} className={clusterStyles.chartTitle}>
            클러스터 차트
          </Title>
          <p className={clusterStyles.chartCount}>
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
      </Card>
    </Stack>
  );
}

// ---------------------------------------------
// Sankey 다이어그램
// ---------------------------------------------
function SankeyNode({ x, y, width, height, index, payload }) {
  const color = SANKEY_COLORS[index % SANKEY_COLORS.length];
  const isOut = x + width > 300;
  return (
    <g>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        radius={2}
      />
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

// ---------------------------------------------
// Heatmap
// ---------------------------------------------
function HeatmapChartView() {
  const maxValue = Math.max(...heatmapData.flatMap((row) => row.values));

  return (
    <div className={heatmapStyles.heatmap}>
      <div className={heatmapStyles.heatmapHeaderRow}>
        <div className={heatmapStyles.heatmapRowLabel} />
        {heatmapColumns.map((col) => (
          <div key={col} className={heatmapStyles.heatmapColLabel}>
            {col}
          </div>
        ))}
      </div>
      {heatmapData.map((row) => (
        <div key={row.label} className={heatmapStyles.heatmapRow}>
          <div className={heatmapStyles.heatmapRowLabel}>{row.label}</div>
          {row.values.map((value, i) => (
            <div
              key={i}
              className={heatmapStyles.heatmapCell}
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

// ---------------------------------------------
// 통합 진입점 - type에 따라 4개 중 하나를 렌더링
// ---------------------------------------------
function ChartView({ type }) {
  switch (type) {
    case "bar":
      return <BarChartView />;
    case "cluster":
      return <ClusterChartView />;
    case "sankey":
      return <SankeyChartView />;
    case "heatmap":
      return <HeatmapChartView />;
    default:
      return null;
  }
}

export default ChartView;
