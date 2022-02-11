import React from "react";
import Formulario from "../components/Formulario";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const EditarCliente = () => {
  const { id } = useParams(); //sirve para retornar el id asociado a lo que estamos visitando
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
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
    <div>
      <h1 className="font-black text-4xl text-blue-900 mt-3">Editar Cliente</h1>
      <p className="">
        Utiliza este formulario para editar los datos del cliente{" "}
      </p>

      {cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando}></Formulario>
      ): <p>Cliente ID no valido</p>}
    </div>
  );
};

export default EditarCliente;
