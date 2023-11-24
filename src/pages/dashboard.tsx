import React from "react";
import moment from "moment";
import type { InferGetStaticPropsType } from "next";
import type { GetStaticProps } from "next";
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
import { prisma } from "~/server/db";

export default function Dashboard(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <div className="flex flex-col gap-12">
      <h1 className={`p-8 text-6xl text-bermuda`}>DASHBOARD</h1>
      <div className="flex w-full justify-center gap-2 place-self-end px-4 sm:justify-start">
        <div className="w-[30rem] space-y-4">
          <Card className="flex w-full">
            <div>
              <h1 className="text-gray-600">Entradas nas últimas 24h</h1>
              <h1 className="text-xl font-extrabold">
                {data?.vehiclesRegisteredToday}
              </h1>
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
              <BarChart width={730} height={250} data={data?.barChartData}>
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
          <div className="flex gap-2 pr-4">
            <Card className="flex flex-1">
              <div>
                <h1 className="text-gray-600">Saidas nas últimas 24h</h1>
                <h1 className="text-xl font-extrabold">
                  {data?.vehiclesRegisteredToday}
                </h1>
              </div>
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
              <div>
                <h1 className="text-gray-600">Carros Totais</h1>
                <h1 className="text-xl font-extrabold">
                  {data?.vehiclesRegisteredToday}
                </h1>
              </div>
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
              <div>
                <h1 className="text-gray-600">Motos Totais</h1>
                <h1 className="text-xl font-extrabold">
                  {data?.vehiclesRegisteredToday}
                </h1>
              </div>
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
          <div className="pr-4">
            <Card className="flex flex-1 ">
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
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="entradas"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="saidas" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<DashboardData> = async () => {
  const totalVehicles = await prisma.vehicles.count();
  const vehiclesRegisteredToday = await prisma.vehicles.count({
    where: {
      createdAt: { gte: moment().subtract(1, "day").toDate() },
    },
  });
  const motorcyclesRegistered = await prisma.vehicles.count({
    where: {
      isMotorcycle: true,
    },
  });

  const lastMonthVehicles = await prisma.vehicles.findMany({
    where: {
      createdAt: { gte: moment().subtract(31, "days").toDate() },
    },
  });

  const months = [];

  async function fetchLinechartData(lte: number, gte: number) {
    const [entradas, saidas] = await Promise.all([
      prisma.vehicles.count({
        where: {
          createdAt: {
            lte: moment()
              .subtract(11 - lte, "month")
              .toDate(),
            gte: moment()
              .subtract(11 - gte, "month")
              .toDate(),
          },
        },
      }),
      prisma.vehicles.count({
        where: {
          leavedAt: {
            lte: moment()
              .subtract(11 - lte, "month")
              .toDate(),
            gte: moment()
              .subtract(11 - gte, "month")
              .toDate(),
          },
        },
      }),
    ]);
    return { entradas, saidas };
  }

  for (let month = 0; month < 12; month++) {
    const { entradas, saidas } = await fetchLinechartData(month + 1, month);
    months.push({
      month: moment().month(month).format("MMMM"),
      entradas,
      saidas,
    });
  }
  console.log(months);
  console.log(months[0]);

  return {
    props: {
      vehiclesRegisteredToday,
      motorcycleData: [
        { name: "Moto", total: motorcyclesRegistered },
        { name: "Carro", total: totalVehicles - motorcyclesRegistered },
      ],
      todayData: [
        { name: "Total", total: totalVehicles },
        { name: "Hoje", total: vehiclesRegisteredToday },
      ],
      lineChartData: months,
      barChartData: [
        {
          name: "Semana 1",
          motocicletas: lastMonthVehicles.filter(
            (vehicle) =>
              moment(vehicle.createdAt).isSameOrAfter(
                moment().subtract(4, "week")
              ) &&
              moment(vehicle.createdAt).isBefore(
                moment().subtract(3, "week")
              ) &&
              vehicle.isMotorcycle
          ).length,
          carros: lastMonthVehicles.filter(
            (vehicle) =>
              moment(vehicle.createdAt).isSameOrAfter(
                moment().subtract(4, "week")
              ) &&
              moment(vehicle.createdAt).isBefore(
                moment().subtract(3, "week")
              ) &&
              !vehicle.isMotorcycle
          ).length,
        },
        {
          name: "Semana 2",
          motocicletas: lastMonthVehicles.filter(
            (vehicle) =>
              moment(vehicle.createdAt).isSameOrAfter(
                moment().subtract(3, "week")
              ) &&
              moment(vehicle.createdAt).isBefore(
                moment().subtract(2, "week")
              ) &&
              vehicle.isMotorcycle
          ).length,
          carros: lastMonthVehicles.filter(
            (vehicle) =>
              moment(vehicle.createdAt).isSameOrAfter(
                moment().subtract(3, "week")
              ) &&
              moment(vehicle.createdAt).isBefore(
                moment().subtract(2, "week")
              ) &&
              !vehicle.isMotorcycle
          ).length,
        },
        {
          name: "Semana 3",
          motocicletas: lastMonthVehicles.filter(
            (vehicle) =>
              moment(vehicle.createdAt).isSameOrAfter(
                moment().subtract(2, "week")
              ) &&
              moment(vehicle.createdAt).isBefore(
                moment().subtract(1, "week")
              ) &&
              vehicle.isMotorcycle
          ).length,
          carros: lastMonthVehicles.filter(
            (vehicle) =>
              moment(vehicle.createdAt).isSameOrAfter(
                moment().subtract(2, "week")
              ) &&
              moment(vehicle.createdAt).isBefore(
                moment().subtract(1, "week")
              ) &&
              !vehicle.isMotorcycle
          ).length,
        },
        {
          name: "Semana 4",
          motocicletas: lastMonthVehicles.filter(
            (vehicle) =>
              moment(vehicle.createdAt).isSameOrAfter(
                moment().subtract(1, "week")
              ) && vehicle.isMotorcycle
          ).length,
          carros: lastMonthVehicles.filter(
            (vehicle) =>
              moment(vehicle.createdAt).isSameOrAfter(
                moment().subtract(1, "week")
              ) && !vehicle.isMotorcycle
          ).length,
        },
      ],
    },
  };
};
