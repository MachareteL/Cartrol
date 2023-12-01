import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { inter } from "~/pages";
import Card from "./Card";

export default function Modal({ isOpen, closeModal, vehicle }: ModalProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <b>Protocolo</b> {vehicle?.protocol}
                  </Dialog.Title>
                  <table className="my-4 w-full">
                    <tr className="border-b border-gray-300">
                      <th className="pl-2 pr-6 py-2">Modelo</th>
                      <td className="py-2 font-extralight">{vehicle?.modelName}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <th className="pl-2 pr-6 py-2">Placa</th>
                      <td className="py-2 font-extralight">{vehicle?.sign}</td>
                    </tr>
                    <tr>
                      <th className="pl-2 pr-6 py-2">Observação</th>
                      <td className="py-2 font-extralight">{vehicle?.more}</td>
                    </tr>
                  </table>
                  <span></span>
                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Confirmar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
