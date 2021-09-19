import {
  AreaChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Legend,
} from "recharts";

const ChartLine = ({
  data,
  change,
  width,
  height,
  col,
}: {
  data: any;
  change: any;
  width: number;
  height: number;
  col: number;
}) => {
  return (
    <div className={`col-${col}`}>
      <AreaChart
        width={width}
        height={height}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <defs>
          <linearGradient id="colorChange" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Line type="monotone" dataKey={change} stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="last_updated" />
        <YAxis />
        <Area
          type="monotone"
          dataKey={change}
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorChange)"
        />
        <Legend />
        <Tooltip />
      </AreaChart>
    </div>
  );
};

export default ChartLine;
