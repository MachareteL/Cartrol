import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import Moment from "react-moment";
import Loading from "~/components/Loading";
import { api } from "~/utils/api";

export default function Home() {
  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    api.cars.getAll.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastpage) => lastpage.nextCursor,
      }
    );
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <>Houve um erro, fale com o Lucas</>;
  }
  if (!data) {
    return <>Cadaste um novo veículo para ver aqui as informações</>;
  }
  const vehicleList = data.pages.flatMap((page) => page.cars);
  vehicleList.map(({ createdAt, sign }) => {
    console.log({ placa: sign, data: createdAt });
  });

  return (
    <>
      <Head>
        <title>Cartrol</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto mt-24">
        <InfiniteScroll
          loader={<Loading />}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          dataLength={vehicleList.length}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableCell>Protocolo</TableCell>
                <TableCell>Placa</TableCell>
                <TableCell>Formato</TableCell>
                <TableCell>Data de Entrada</TableCell>
                <TableCell>Pátio</TableCell>
                <TableCell>Seguradora</TableCell>
              </TableHead>
              <TableBody>
                {vehicleList.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell component="th" scope="row">
                      {vehicle.protocol}
                    </TableCell>
                    <TableCell>{vehicle.sign}</TableCell>
                    <TableCell>{vehicle.category}</TableCell>
                    <TableCell>
                      <Moment >{vehicle.createdAt}</Moment>
                    </TableCell>
                    <TableCell>
                      {vehicle.isPresent ? (
                        <CheckCircleIcon className="w-6 text-green-500" />
                      ) : (
                        <XCircleIcon className="w-6 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>{vehicle.costumerName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </InfiniteScroll>
      </main>
    </>
  );
}
