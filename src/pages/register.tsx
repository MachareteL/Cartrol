import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import React, { type ChangeEvent, useState, useEffect } from "react";
import Textinput from "~/components/Textinput";
import truckpana from "public/Towing-amico.svg";
import parkingpana from "public/parking-pana.svg";

import { api } from "~/utils/api";
import swal from "sweetalert";
import { useRouter } from "next/router";
import moment from "moment";

export default function Register() {
  const carAPI = api.vehicles;
  const { data: costumers } = carAPI.getCostumers.useQuery();
  const { data: models } = carAPI.getModels.useQuery();
  const createCar = carAPI.create.useMutation({
    onSuccess: ({ sign, protocol }) => {
      swal({
        icon: "success",
        title: `Carro  ${sign} registrado com sucesso!`,
        text: `O registro de número: ${protocol} foi efetuado com sucesso!`,
      })
        .then(() => reload())
        .catch((e) => {
          console.log(e);
        });
    },
    onError: ({ message }) => {
      void swal({
        icon: "error",
        title: `Houve um erro!`,
        text: message,
      });
    },
  });

  const { reload } = useRouter();
  const [vehicleInfo, setCarInfo] = useState<Vehicle>({
    protocol: "",
    isMotorcycle: false,
    modelName: "",
    createdAt: new Date(),
    isPresent: false,
    sign: "",
    costumerName: "",
  });

  useEffect(() => {
    console.log(vehicleInfo);
  }, [vehicleInfo]);

  function handleChange({
    target,
  }: ChangeEvent<HTMLInputElement> | SelectChangeEvent) {
    setCarInfo({ ...vehicleInfo, [target.name]: target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(vehicleInfo);
    createCar.mutate(vehicleInfo);
  }
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute -bottom-10 right-0 -z-30 lg:bottom-0">
        <Image src={truckpana} alt="" />
      </div>
      <div className="absolute left-10 top-10 -z-30 hidden lg:block">
        <Image src={parkingpana} alt="" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-md border border-gray-200 bg-white p-16 px-8 shadow-md lg:w-1/3 lg:px-16"
      >
        <div className="flex">
          <Textinput
            className="flex-1"
            placeholder="Protocolo"
            required
            name="protocol"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4">
          <Textinput
            className="flex-1"
            name="sign"
            placeholder="Placa"
            required
            onChange={handleChange}
          />
          <Autocomplete
            className="flex-1"
            freeSolo
            options={(models ?? []).map(({ name }) => name)}
            renderInput={(params) => (
              <TextField {...params} label="Modelo" name="modelName" required />
            )}
            onInputChange={(_, newValue) => {
              setCarInfo({ ...vehicleInfo, modelName: newValue });
            }}
          />
        </div>
        <div className="-mt-4 flex gap-4">
          <FormControlLabel
            className="flex-1"
            control={
              <Checkbox
                onChange={(e) => {
                  setCarInfo({ ...vehicleInfo, isPresent: e.target.checked });
                }}
              />
            }
            label="Está no pátio"
          />
          <FormControlLabel
            className="flex-1"
            control={
              <Checkbox
                onChange={(e) => {
                  setCarInfo({ ...vehicleInfo, isMotorcycle: e.target.checked });
                }}
              />
            }
            label="Motocicleta"
          />
        </div>
        <div className="flex gap-4">
          <Textinput
            type="date"
            name="createdAt"
            onChange={({ target }) => {
              setCarInfo({
                ...vehicleInfo,
                createdAt: moment(target.value).toDate(),
              });
            }}
            className="relative flex-1 before:absolute before:-top-6 before:left-0 before:content-['Data_de_Entrada*']"
          />
          <Textinput
            type="date"
            name="leavedAt"
            onChange={({ target }) => {
              setCarInfo({
                ...vehicleInfo,
                leavedAt: moment(target.value).toDate(),
              });
            }}
            disabled={vehicleInfo.isPresent}
            className="relative flex-1 before:absolute before:-top-6 before:left-0 before:content-['Data_de_Saida'] "
          />
        </div>
        <div className="flex">
          <Autocomplete
            className="flex-1"
            freeSolo
            options={(costumers ?? []).map(({ name }) => name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seguradora"
                name="costumerName"
                required
              />
            )}
            onInputChange={(_, newValue) => {
              setCarInfo({ ...vehicleInfo, costumerName: newValue });
            }}
          />
        </div>
        <div className="flex">
          <Textinput
            className="flex-1"
            name="more"
            multiline
            lineCount={4}
            placeholder="Observação"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-bermuda px-4 py-2 text-white hover:shadow-md"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
