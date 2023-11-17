import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function PieChartComponent({
  data,
  dataKey,
  cellProps,
}: PieChartProps) {
  return (
    <ResponsiveContainer height={120} width={"100%"}>
      <PieChart>
        <Pie dataKey={dataKey} data={data} innerRadius={30} outerRadius={60}>
          {cellProps.map(({ key, fill }) => (
            <Cell key={key} fill={fill} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
