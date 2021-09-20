import { AreaChart, Line, XAxis, YAxis, Tooltip, Area, Legend } from "recharts";

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
            <stop
              offset="5%"
              stopColor="rgba(89, 166, 177, 1)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="rgba(89, 166, 177, 1)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <Line type="monotone" dataKey={change} stroke="rgba(89, 166, 177, 1)" />
        <XAxis dataKey="last_updated" tick={false} label="Date" />
        <YAxis />
        <Area
          type="monotone"
          dataKey={change}
          stroke="rgba(89, 166, 177, 1)"
          fillOpacity={1}
          fill="url(#colorChange)"
        />
        <Legend verticalAlign="top" iconType="wye" />
        <Tooltip />
      </AreaChart>
    </div>
  );
};

export default ChartLine;
