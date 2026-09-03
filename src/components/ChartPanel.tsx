import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

interface ChartProps {
  data: any[];
  title: string;
  dataKey: string | string[];
  type?: 'line' | 'bar' | 'pie' | 'area';
  nameKey?: string;
  height?: number;
}

export const ChartPanel: React.FC<ChartProps> = ({
  data,
  title,
  dataKey,
  type = 'bar',
  nameKey = 'name',
  height = 300,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="card" style={{ height }}>
        <h3>{title}</h3>
        <div className="flex items-center justify-center" style={{ height: height - 60 }}>
          <p className="text-tertiary">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'line' && (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey={nameKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            {Array.isArray(dataKey) ? (
              dataKey.map((key, idx) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={COLORS[idx % COLORS.length]}
                  strokeWidth={2}
                  dot={{ fill: COLORS[idx % COLORS.length], r: 4 }}
                />
              ))
            ) : (
              <Line type="monotone" dataKey={dataKey} stroke={COLORS[0]} strokeWidth={2} />
            )}
          </LineChart>
        )}
        {type === 'area' && (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey={nameKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '0.5rem',
              }}
            />
            <Area
              type="monotone"
              dataKey={typeof dataKey === 'string' ? dataKey : dataKey[0]}
              stroke={COLORS[0]}
              fillOpacity={1}
              fill="url(#colorArea)"
            />
          </AreaChart>
        )}
        {type === 'bar' && (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey={nameKey} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            {Array.isArray(dataKey) ? (
              dataKey.map((key, idx) => (
                <Bar key={key} dataKey={key} fill={COLORS[idx % COLORS.length]} radius={4} />
              ))
            ) : (
              <Bar dataKey={dataKey} fill={COLORS[0]} radius={4} />
            )}
          </BarChart>
        )}
        {type === 'pie' && (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey={typeof dataKey === 'string' ? dataKey : dataKey[0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '0.5rem',
              }}
            />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
