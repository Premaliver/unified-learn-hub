import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const NIRFChart = () => {
  const data = [
    { year: "2020", tlr: 72, rpc: 68, go: 75, oi: 70, perception: 65 },
    { year: "2021", tlr: 75, rpc: 71, go: 78, oi: 73, perception: 68 },
    { year: "2022", tlr: 78, rpc: 74, go: 81, oi: 76, perception: 71 },
    { year: "2023", tlr: 81, rpc: 77, go: 84, oi: 79, perception: 74 },
    { year: "2024", tlr: 84, rpc: 80, go: 87, oi: 82, perception: 77 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="year" 
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: '12px' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="tlr" 
          stroke="hsl(var(--chart-1))" 
          strokeWidth={2}
          name="Teaching-Learning-Resources"
          dot={{ fill: "hsl(var(--chart-1))" }}
        />
        <Line 
          type="monotone" 
          dataKey="rpc" 
          stroke="hsl(var(--chart-2))" 
          strokeWidth={2}
          name="Research-Professional-Practice"
          dot={{ fill: "hsl(var(--chart-2))" }}
        />
        <Line 
          type="monotone" 
          dataKey="go" 
          stroke="hsl(var(--chart-3))" 
          strokeWidth={2}
          name="Graduation Outcomes"
          dot={{ fill: "hsl(var(--chart-3))" }}
        />
        <Line 
          type="monotone" 
          dataKey="oi" 
          stroke="hsl(var(--chart-4))" 
          strokeWidth={2}
          name="Outreach-Inclusivity"
          dot={{ fill: "hsl(var(--chart-4))" }}
        />
        <Line 
          type="monotone" 
          dataKey="perception" 
          stroke="hsl(var(--chart-5))" 
          strokeWidth={2}
          name="Perception"
          dot={{ fill: "hsl(var(--chart-5))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NIRFChart;
