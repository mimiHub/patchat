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
} from "recharts";
import { Menu, PillTabs, Title } from "../../components/common";
import {
  fieldOptions,
  topNOptions,
  chartDataByField,
} from "./chartData.js";
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

function Chart() {
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
    <div className={styles.container}>
      <PillTabs
        options={fieldOptions}
        selectedId={selectedFieldId}
        onChange={setSelectedFieldId}
      />

      <div className={styles.chartCard}>
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
                <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;