import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import {
  Menu,
  PillTabs,
  Title,
  Card,
  Stack,
  StatGrid,
} from "../../components/common";
import { fieldOptions, topNOptions, chartDataByField } from "./chartData.js";
import styles from "./Chart.module.css";

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

// 축 글자 크기 - 표(14px)·막대 라벨(12px)과 맞춤 (기본값은 더 커서 모바일에서 겹침)
const AXIS_TICK = { fontSize: 12, fill: "var(--color-text-secondary)" };

// 숫자 → "12,958" 처럼 천 단위 콤마
function formatNumber(value) {
  return value.toLocaleString("ko-KR");
}

// 비율 → 소수점 한 자리 % (예: 23.4%)
function formatPercent(part, total) {
  if (!total) return "0%";
  const percent = Math.round((part / total) * 1000) / 10;
  // 아주 작은 값이 "0%"로 보이면 "없음"으로 오해할 수 있어서 "<0.1%"로 표시
  if (percent === 0 && part > 0) return "<0.1%";
  return `${percent}%`;
}

function Chart() {
  const [selectedFieldId, setSelectedFieldId] = useState("cpc");
  const [selectedTopNId, setSelectedTopNId] = useState("top5");

  const selectedField = fieldOptions.find((f) => f.id === selectedFieldId);
  const selectedTopN = topNOptions.find((t) => t.id === selectedTopNId);

  const fullData = chartDataByField[selectedFieldId] || [];
  // 값이 큰 순서대로(내림차순) 정렬 - 막대가 위에서부터 큰 순서로 나오게
  const sortedData = [...fullData].sort((a, b) => b.value - a.value);
  const displayData = sortedData.slice(0, selectedTopN.value);

  // ---- 요약 숫자 계산 (화면에 보이는 상위 N개가 아니라 전체 기준) ----
  const total = fullData.reduce((sum, item) => sum + item.value, 0);
  const first = sortedData[0];
  const topNTotal = displayData.reduce((sum, item) => sum + item.value, 0);
  const top3Total = sortedData
    .slice(0, 3)
    .reduce((sum, item) => sum + item.value, 0);

  const summaryItems = [
    { label: "총 건수", value: formatNumber(total) },
    { label: "1위 항목", value: first?.name ?? "-" },
    {
      label: "1위 비중",
      value: first ? formatPercent(first.value, total) : "-",
    },
    {
      label: `상위 ${selectedTopN.value}개 비중`,
      value: formatPercent(topNTotal, total),
    },
  ];

  const topNMenuItems = topNOptions.map((option) => ({
    id: option.id,
    label: option.label,
    onClick: () => setSelectedTopNId(option.id),
  }));

  // 막대 1개당 높이를 정해두고 개수만큼 차트 높이를 늘림 → 5개/10개 모두 막대 두께가 일정
  const chartHeight = Math.max(240, displayData.length * 52 + 40);

  // fill(height:100%)을 쓰지 않음: 높이를 100%로 고정하면 내용이 팝업보다 길 때
  // 넘친 부분에 팝업 아래 여백(padding)이 안 붙어서 마지막 요소가 잘려 보임
  return (
    <Stack direction="column" gap="md" align="stretch">
      <PillTabs
        options={fieldOptions}
        selectedId={selectedFieldId}
        onChange={setSelectedFieldId}
      />

      <StatGrid items={summaryItems} />

      {/* PC: 차트 카드(왼쪽) + 순위 표 카드(오른쪽) / 태블릿·모바일: 위아래 */}
      <div className={styles.chartBody}>
        <Card className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <Title level={4} className={styles.chartTitle}>
              {selectedField.label}
            </Title>
            <Menu
              label={selectedTopN.label}
              items={topNMenuItems}
              selectedId={selectedTopNId}
              dropdownAlign="right"
            />
          </div>

          <div className={styles.chartArea}>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart
                data={displayData}
                layout="vertical"
                margin={{ top: 10, right: 56, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  tickFormatter={formatNumber}
                  tick={AXIS_TICK}
                />
                {/* width="auto": 라벨 길이만큼만 폭을 잡음 */}
                <YAxis
                  type="category"
                  dataKey="name"
                  width="auto"
                  tick={AXIS_TICK}
                />
                <Tooltip formatter={(value) => formatNumber(value)} />
                <Bar dataKey="value" barSize={28} radius={[0, 4, 4, 0]}>
                  {displayData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={BAR_COLORS[index % BAR_COLORS.length]}
                    />
                  ))}
                  {/* 막대 끝에 값 표시 - 길이만 보고 짐작하지 않아도 되게 */}
                  <LabelList
                    dataKey="value"
                    position="right"
                    formatter={formatNumber}
                    className={styles.barLabel}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className={styles.sideCard}>
          <table className={styles.rankTable}>
            <thead>
              <tr>
                <th scope="col">순위</th>
                <th scope="col">{selectedField.label}</th>
                <th scope="col">건수</th>
                <th scope="col">비율</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((item, index) => (
                <tr key={item.name}>
                  <td className={styles.rankNumber}>{index + 1}</td>
                  <td>
                    {/* td 자체에 display:flex를 주면 표 칸(table-cell) 성질이 깨져서
                        아래 구분선이 어긋남 → 안쪽 span에 flex */}
                    <span className={styles.rankName}>
                      {/* 막대와 같은 색 점 → 표와 차트를 눈으로 연결 */}
                      <span
                        className={styles.colorDot}
                        style={{
                          backgroundColor:
                            BAR_COLORS[index % BAR_COLORS.length],
                        }}
                      />
                      <span className={styles.nameText}>{item.name}</span>
                    </span>
                  </td>
                  <td className={styles.rankValue}>
                    {formatNumber(item.value)}
                  </td>
                  <td className={styles.rankValue}>
                    {formatPercent(item.value, total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {first && (
        <p className={styles.insight}>
          <strong className={styles.insightLabel}>요약</strong>
          1위는 <em>{first.name}</em>({formatPercent(first.value, total)}
          )이며, 상위 3개 항목이 전체 {formatNumber(total)}건 중{" "}
          <em>{formatPercent(top3Total, total)}</em>를 차지합니다.
        </p>
      )}
    </Stack>
  );
}

export default Chart;
