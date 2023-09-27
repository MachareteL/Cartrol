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
import PieChartComponent from "~/components/PieChartComponent";
import { api } from "~/utils/api";

export default function Dashboard() {
  const query = api.vehicles;
  const { data: todayEntries } = query.getTodayTotal.useQuery();
  const { data: totalEntriesAmt } = query.getTotal.useQuery();
  const { data } = api.vehicles.getAllTotal.useQuery();

  const lineChartData = [
    { name: "Total", total: totalEntriesAmt },
    { name: "Hoje", total: todayEntries },
    // PUXAR DATA DE CADASTRO NO ULTIMO MÊS
  ];
  return (
    <div className="flex flex-col gap-12">
      <h1 className={`p-8 text-6xl text-bermuda`}>DASHBOARD</h1>
      <div className="flex w-full justify-center gap-2 place-self-end px-4 sm:justify-start">
        <div>
          <Card className="flex w-96">
            <div>
              <h1 className="text-gray-600">Cadastro nas últimas 24h</h1>
              <h1 className="text-xl font-extrabold">{todayEntries}</h1>
            </div>
            <PieChartComponent
              data={data?.todayData ?? []}
              cellProps={[
                { key: "cell-total-entries-1", fill: "#fdd343" },
                { key: "cell-total-entries-2", fill: "#0400C2" },
              ]}
              dataKey="total"
              key={"today-total-entries"}
            />
          </Card>
        </div>
        <div className="h-screen bg-red-500">
          <Card className="w-96">
            <></>
          </Card>
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex gap-2">
            <Card className="flex flex-1">
              <PieChartComponent
                data={data?.motorcycleData ?? []}
                cellProps={[
                  { key: "cell-motorcycle-entries-2", fill: "#0400C2" },
                  { key: "cell-motorcycle-entries-1", fill: "#fdd343" },
                ]}
                dataKey="total"
                key={"today-total-entries"}
              />
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
