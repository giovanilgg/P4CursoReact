import React from "react";
import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente }) => {
  const { nombre, empresa, email, telefono, notas, id } = cliente;
  const navigate = useNavigate()
  return (
      
    <>
      <tr className="border-b-4 hover:bg-gray-100">
        <td className="p-2">{nombre}</td>
        <td className="p-2">
          <p>
            <span className="text-gray-800 uppercase font-bold">Email:</span>
            {email}
          </p>
          <p>
            <span className="text-gray-800 uppercase font-bold">Telefono:</span>
            {telefono}
          </p>
        </td>
        <td className="p-2">{empresa}</td>
        <td className="p-2 ">
          <button
            className="p-2 mr-6 w-full uppercase bg-orange-600 rounded-xl text-white hover:bg-orange-500 "
            type="button"
            onClick={()=>{
            navigate(`/clientes/${id}`)


            }}
          >
            Ver
          </button>
          <button
            className="p-2 mr-6 mt-1 w-full uppercase bg-indigo-500 rounded-xl text-white hover:bg-indigo-300"
            type="button"
          >
            Editar
          </button>
          <button
            className="p-2 mt-1 w-full uppercase bg-red-600 rounded-xl text-white hover:bg-red-400"
            type="button"
          >
            Eliminar
          </button>
        </td>
      </tr>
    </>
  );
};

export default Cliente;
