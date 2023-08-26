import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import Textinput from "~/components/Textinput";
import backgroundSVG from "public/Towing-amico.svg";
import { api } from "~/utils/api";
import swal from "sweetalert";
import { useRouter } from "next/router";

export default function Register() {
  const carApi = api.cars.create.useMutation({
    onSuccess: ({ sign, protocol }) => {
      swal({
        icon: "success",
        title: `Carro  ${sign} registrado com sucesso!`,
        text: `O registro de número: ${protocol} foi efetuado com sucesso!`,
      }).then(() => reload());
    },
  });
  const { data } = api.cars.getCostumers.useQuery();
  const { reload } = useRouter();
  const [carInfo, setCarInfo] = useState<CarType>({
    protocol: "",
    isBurned: false,
    category: "sedan",
    createdAt: new Date(),
    isPresent: false,
    sign: "",
    costumerName: "",
  });
  function handleChange({
    target,
  }: ChangeEvent<HTMLInputElement> | SelectChangeEvent) {
    setCarInfo({ ...carInfo, [target.name]: target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(carInfo);
    carApi.mutate(carInfo);
  }
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-md border border-gray-200 bg-white p-16 px-8 shadow-md sm:w-1/3 sm:px-16"
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
          <FormControl className="flex-1" required>
            <InputLabel id="categoryLabel">Categoria</InputLabel>
            <Select
              label="Categoria"
              labelId="categoryLabel"
              name="category"
              onChange={handleChange}
              value={carInfo.category}
            >
              <MenuItem value={"sedan"}>Sedan</MenuItem>
              <MenuItem value={"minivan"}>Mini van</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="-mt-4 flex gap-4">
          <FormControlLabel
            className="flex-1"
            control={
              <Checkbox
                onChange={(e) => {
                  setCarInfo({ ...carInfo, isPresent: e.target.checked });
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
                  setCarInfo({ ...carInfo, isBurned: e.target.checked });
                }}
              />
            }
            label="Carro queimado"
          />
        </div>
        <div className="flex gap-4">
          <Textinput
            type="date"
            name="createdAt"
            onChange={handleChange}
            className="relative flex-1 before:absolute before:-top-6 before:left-0 before:content-['Data_de_Entrada']"
          />
          <Textinput
            type="date"
            name="leavedAt"
            onChange={handleChange}
            disabled={carInfo.isPresent}
            className="relative flex-1 before:absolute before:-top-6 before:left-0 before:content-['Data_de_Saida'] "
          />
        </div>
        <div className="flex">
          <Autocomplete
            className="flex-1"
            freeSolo
            options={(data ?? []).map(({ name }) => name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seguradora"
                onChange={(e) => {
                  setCarInfo({ ...carInfo, costumerName: e.target.value });
                }}
                name="costumerName"
              />
            )}
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
            className="rounded-md bg-bermuda px-4 py-2 text-white"
          >
            Cadastrar
          </button>
        </div>
      </form>
      <div className="absolute bottom-0 right-0 -z-30">
        <Image src={backgroundSVG} alt="" />
      </div>
    </div>
  );
}
