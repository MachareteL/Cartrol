import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import Textinput from "~/components/Textinput";

export default function registry() {
  const [carInfo, setCarInfo] = useState<CarType>();
  function handleChange(e: ChangeEvent<HTMLInputElement> | SelectChangeEvent) {
    console.log(e.target.value);
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form className="flex flex-col gap-4 rounded-md border border-gray-200 p-16 px-8 shadow-md sm:w-1/3 sm:px-16">
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
              onChange={handleChange}
              value=""
            >
              <MenuItem value={"Sedan"}>Sedan</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="-mt-4 flex gap-4">
          <FormControlLabel
            className="flex-1"
            control={<Checkbox />}
            label="Está no pátio"
          />
          <FormControlLabel
            className="flex-1"
            control={<Checkbox />}
            label="Carro queimado"
          />
        </div>
        <div className="flex gap-4">
          <Textinput
            type="date"
            onChange={handleChange}
            className="relative flex-1 before:absolute before:-top-6 before:left-0 before:content-['Data_de_Entrada']"
          />
          <Textinput
            type="date"
            onChange={handleChange}
            className="relative flex-1 before:absolute before:-top-6 before:left-0 before:content-['Data_de_Saida']"
          />
        </div>
        <div className="flex">
          <FormControl className="flex-1">
            <InputLabel id="costumerLabel">Seguradora</InputLabel>
            <Select
              label="Seguradora"
              labelId="costumerLabel"
              value=""
              onChange={handleChange}
            >
              <MenuItem value={"Sedan"}>Sedan</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex">
          <Textinput
            className="flex-1"
            name="sign"
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
    </div>
  );
}
