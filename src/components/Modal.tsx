import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import editIcon from "/public/edit.svg";

export default function Modal({
  isOpen,
  closeModal,
  vehicle,
  handleEditVehicle,
}: ModalProps) {
  const [editingMode, setEditingMode] = useState(false);

  function handleEditData() {
    if (!editingMode) {
      return closeModal();
    }
    console.log("teste");
  }
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
                    <tbody>
                      <tr className="border-b border-gray-300">
                        <th className="py-2 pl-2 pr-6">Modelo</th>
                        <td className={`py-2 font-extralight ${editingMode && "italic"}`}>
                          {vehicle?.modelName}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <th className="py-2 pl-2 pr-6">Placa</th>
                        <td className={`py-2 font-extralight ${editingMode && "italic"}`}>
                          {vehicle?.sign}
                        </td>
                      </tr>
                      <tr>
                        <th className="py-2 pl-2 pr-6">Observação</th>
                        <td className={`py-2 font-extralight ${editingMode && "italic"}`}>
                          {vehicle?.more}
                        </td>
                      </tr>
                      <tr>
                        <th className="py-2 pl-2 pr-6">Entrada</th>
                        <td className={`py-2 font-extralight ${editingMode && "italic"}`}>
                          {vehicle?.createdAt.toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <th className="py-2 pl-2 pr-6">Saída</th>
                        <td className={`py-2 font-extralight ${editingMode && "italic"}`}>
                          {vehicle?.leavedAt?.toLocaleDateString() ??
                            "Está no patio"}
                        </td>
                      </tr>
                      <tr>
                        <th className="py-2 pl-2 pr-6">Cliente</th>
                        <td className={`py-2 font-extralight ${editingMode && "italic"}`}>
                          {vehicle?.costumerName}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-4 flex justify-between">
                    {!editingMode && (
                      <button
                        type="button"
                        className="rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setEditingMode(true);
                        }}
                      >
                        Editar
                        <Image
                          src={editIcon}
                          alt=""
                          className="inline-flex w-5"
                        />
                      </button>
                    )}
                    <button
                      type="button"
                      className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleEditData}
                    >
                      {editingMode ? "Salvar" : "Confirmar"}
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
