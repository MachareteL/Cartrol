import React from "react";
import { PieChart, Tooltip, Pie, ResponsiveContainer } from "recharts";
import Card from "~/components/Card";
import { api } from "~/utils/api";

export default function Dashboard() {
  const query = api.vehicles;
  const { data: todayEntries } = query.getTodayTotal.useQuery();
  const { data: totalEntriesAmt } = query.getTotal.useQuery();
  const today = [
    { name: "Total", total: 20 },
    { name: "Hoje", total: 30 },
  ];
  return (
    <div className="flex flex-col gap-12">
      <h1 className={`p-8 text-6xl text-bermuda`}>DASHBOARD</h1>
      <div className="container mx-auto flex">
        <Card className="flex">
          <div>
            <h1 className="text-gray-600">Cadastro nas últimas 24h</h1>
            <h1 className="text-xl font-extrabold">{todayEntries}</h1>
          </div>
          {/* <ResponsiveContainer height={"100%"} width={"100%"}> */}
          <PieChart width={300} height={200}>
            <Pie
              dataKey={"total"}
              data={today}
              cx={100}
              cy={50}
              innerRadius={40}
              outerRadius={80}
              fill="#0400C2"
            />
            {/* <Pie
                dataKey="value"
                data={today}
                cx={500}
                cy={200}
                innerRadius={40}
                outerRadius={80}
                fill="#82ca9d"
              /> */}
            <Tooltip />
          </PieChart>
          {/* </ResponsiveContainer> */}
        </Card>
      </div>
    </div>
  );
}
