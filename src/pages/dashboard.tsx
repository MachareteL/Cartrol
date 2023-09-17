import React from "react";
import {
  PieChart,
  Tooltip,
  Pie,
  ResponsiveContainer,
  Cell,
  LineChart,
  CartesianGrid,
  Legend,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import Card from "~/components/Card";
import { api } from "~/utils/api";

export default function Dashboard() {
  const query = api.vehicles;
  const { data: todayEntries } = query.getTodayTotal.useQuery();
  const { data: totalEntriesAmt } = query.getTotal.useQuery();
  const todayData = [
    { name: "Total", total: totalEntriesAmt },
    { name: "Hoje", total: todayEntries },
  ];
  const lineChartData = [
    { name: "Total", total: totalEntriesAmt },
    { name: "Hoje", total: todayEntries },
    // PUXAR DATA DE CADASTRO NO ULTIMO MÊS
  ];
  return (
    <div className="flex flex-col gap-12">
      <h1 className={`p-8 text-6xl text-bermuda`}>DASHBOARD</h1>
      <div className="flex w-full justify-center place-self-end px-8 sm:justify-start">
        <div>
          <Card className="flex w-96">
            <div>
              <h1 className="text-gray-600">Cadastro nas últimas 24h</h1>
              <h1 className="text-xl font-extrabold">{todayEntries}</h1>
            </div>
            <ResponsiveContainer height={120} width={"100%"}>
              <PieChart>
                <Pie
                  dataKey={"total"}
                  data={todayData}
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
        <div className="h-screen bg-red-500">
          <Card className="w-96">
            <></>
          </Card>
        </div>
        <div className="flex-1 bg-blue-500">
          <div className="flex gap-2">
            <Card className="flex flex-1">
              <></>
            </Card>
            <Card className="flex flex-1">
              <></>
            </Card>
            <Card className="flex flex-1">
              <></>
            </Card>
          </div>
          <div>
            <Card className="flex flex-1">
              <ResponsiveContainer height={500} width={"100%"}>
                <LineChart
                  data={lineChartData}
                  width={500}
                  height={300}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="total" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
