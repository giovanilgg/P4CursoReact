import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
const VerCliente = () => {
  const { id } = useParams(); //sirve para retornar el id asociado a lo que estamos visitando
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  //console.log(params)

  useEffect(() => {
  
    const clienteEspecifico = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setCargando(false);
      }, 1000);
      
    };
    clienteEspecifico();
  }, []);
  return (
    <>
      {
         cargando ? <p><Spinner></Spinner></p>: Object.keys(cliente).length === 0 ? (
        "No hay clientes "
      ) : (
        <div className="">
          <h1 className="font-black text-4xl text-blue-900 mt-3 ">
            Ver cliente:{" "}
            <p className="text-red-900 uppercase "> {cliente.nombre}</p>
          </h1>
          <p className="mt-3 mb-3">Informacion del cliente </p>

          <div className="bg-gray-200 text-center  ">
            <p className="text-4xl text-gray-700 ">
              <span className="uppercase font-bold ">Cliente:</span>
              {cliente.nombre}
            </p>
            <p className="text-2xl text-gray-700 ">
              <span className="uppercase font-bold ">Email:</span>
              {cliente.email}
            </p>
            <p className="text-2xl text-gray-700 ">
              <span className="uppercase font-bold ">Telefono:</span>
              {cliente.telefono}
            </p>
            <p className="text-2xl text-gray-700 ">
              <span className="uppercase font-bold ">Empresa:</span>
              {cliente.empresa}
            </p>
            <p className="text-2xl text-gray-700 ">
              <span className="uppercase font-bold ">Notas:</span>
              {cliente.notas}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default VerCliente;
