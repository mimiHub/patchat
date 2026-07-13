import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1월", value: 40 },
  { name: "2월", value: 65 },
  { name: "3월", value: 50 },
  { name: "4월", value: 80 },
  { name: "5월", value: 35 },
];

function Chart({ barColor = "var(--color-primary-700)" }) {
  return (
    <div className="chart-container">
      <h2>차트 컴포넌트</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={barColor} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
