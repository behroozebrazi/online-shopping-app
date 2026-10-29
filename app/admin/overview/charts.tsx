"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

function Charts({
  data: { salesData },
}: {
  data: { salesData: { month: string; totalSales: number }[] };
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={salesData} barCategoryGap="20%">
        <XAxis
          dataKey="month"
          stroke="#AAAA00"
          fontSize={12}
          tickLine={false}
          axisLine={true}
        />

        <YAxis
          stroke="#AAAA00"
          tickLine={false}
          axisLine={false}
          tick={({ x, y, payload }) => (
            <text
              x={x}
              y={y}
              textAnchor="end"
              fill="#00AAAA"
              fontSize={12}
              direction={"ltr"}
            >{`$ ${payload.value}`}</text>
          )}
        />

        <Bar
          dataKey="totalSales"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-blue-700"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Charts;
