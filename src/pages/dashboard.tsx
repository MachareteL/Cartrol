import React from "react";
import { PieChart, Tooltip, Pie, ResponsiveContainer, Cell } from "recharts";
import Card from "~/components/Card";
import { api } from "~/utils/api";

export default function Dashboard() {
  const query = api.vehicles;
  const { data: todayEntries } = query.getTodayTotal.useQuery();
  const { data: totalEntriesAmt } = query.getTotal.useQuery();
  const data = [
    { name: "Total", total: totalEntriesAmt },
    { name: "Hoje", total: todayEntries },
  ];
  return (
    <div className="flex flex-col gap-12">
      <h1 className={`p-8 text-6xl text-bermuda`}>DASHBOARD</h1>
      <div className="container mx-auto flex justify-center">
        <Card className="flex w-96">
          <div>
            <h1 className="text-gray-600">Cadastro nas últimas 24h</h1>
            <h1 className="text-xl font-extrabold">{todayEntries}</h1>
          </div>
          <ResponsiveContainer height={120} width={"100%"}>
            <PieChart>
              <Pie
                dataKey={"total"}
                data={data}
                innerRadius={30}
                outerRadius={60}
              >
                <Cell key={`cell-${123}`} fill="#fdd343" />
                <Cell key={`cell-${33}`} fill="#0400C2" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
