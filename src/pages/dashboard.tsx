import React from "react";
import {
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Legend,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import Card from "~/components/Card";
import PieChartComponent from "~/components/PieChartComponent";
import { api } from "~/utils/api";

export default function Dashboard() {
  const query = api.vehicles;
  const { data } = api.vehicles.getAllTotal.useQuery();

 

  const teste = [
    {
      name: "Semana 1",
      motocicletas: 4000,
      carros: 2400,
    },
    {
      name: "Semana 2",
      motocicletas: 3000,
      carros: 1398,
    },
    {
      name: "Semana 3",
      motocicletas: 2000,
      carros: 9800,
    },
    {
      name: "Semana 4",
      motocicletas: 2780,
      carros: 3908,
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      <h1 className={`p-8 text-6xl text-bermuda`}>DASHBOARD</h1>
      <div className="flex w-full justify-center gap-2 place-self-end px-4 sm:justify-start">
        <div className="space-y-4">
          <Card className="flex w-96">
            <div>
              <h1 className="text-gray-600">Cadastro nas últimas 24h</h1>
              <h1 className="text-xl font-extrabold">{data?.vehiclesRegisteredToday}</h1>
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
          <Card>
            <ResponsiveContainer width={"100%"} height={250}>
              <BarChart width={730} height={250} data={teste}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="carros" fill="#8884d8" />
                <Bar dataKey="motocicletas" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
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
          </div>
          <div>
            <Card className="flex flex-1">
              <ResponsiveContainer height={500} width={"100%"}>
                <LineChart
                  data={data?.lineChartData}
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
