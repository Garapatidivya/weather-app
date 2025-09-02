import "./HourlyStrip.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const getIcon = (code) => {
  if (code === 0) return "☀️"; 
  if ([1, 2, 3].includes(code)) return "⛅"; 
  if ([45, 48].includes(code)) return "🌫"; 
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧"; 
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️"; 
  return "🌍";
};

function HourlyStrip({ hourly, codes, times }) {
  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const data = (hourly || []).map((temp, idx) => ({
    time: times?.[idx] ? formatTime(times[idx]) : `+${idx + 1}h`,
    temp,
    icon: getIcon(codes?.[idx]),
  }));

  return (
    <div className="hourly-strip-container">
      <h3 className="hourly-strip-title">Next 12 Hours</h3>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 40, right: 20, left: 0, bottom: 20 }}>
          {/* Box-style grid */}
          <CartesianGrid
            stroke="#93c5fd"    // light blue
            strokeDasharray="0" // solid lines for boxes
            vertical={true}
            horizontal={true}
          />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip
            formatter={(value, _name, props) => [
              `${value}°C ${props?.payload?.icon || ""}`,
              "Temperature",
            ]}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#1e40af"
            strokeWidth={3}
            dot={({ cx, cy, payload }) => (
              <g>
                <text x={cx} y={cy - 25} textAnchor="middle" fontSize="18">
                  {payload.icon}
                </text>
                <text x={cx} y={cy - 5} textAnchor="middle" fontSize="14" fill="#111">
                  {payload.temp}°C
                </text>
                <circle cx={cx} cy={cy} r={6} fill="#1e40af" stroke="white" strokeWidth={2} />
              </g>
            )}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HourlyStrip;
