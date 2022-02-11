import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alerta from "./Alerta";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Formulario = ({ cargando, cliente }) => {
  const navigate = useNavigate();
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(2, "El nombre es muy corto")
      .required("El nombre del cliente es obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("El email no es valido ")
      .required("El email es obligatorio "),
    telefono: Yup.number()
      .positive("Numero no valido")
      .integer("Numero no valido")
      .typeError("El numero no es valido "),
  });

  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      if (cliente.id) {
        const url = `http://localhost:4000/clientes/${cliente.id}`;
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        const url = "http://localhost:4000/clientes";
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      const resultado = respuesta.json();
      console.log(resultado);
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner></Spinner>
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-xl shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-black text-xl uppercase text-center">
        {cliente?.nombre ? "Actualizar cliente" : "Agregar cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre
                </label>
                <Field
                  placeholder="Nombre del cliente"
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-100"
                  name="nombre"
                />
              </div>
              {errors.nombre && touched.nombre ? (
                <Alerta errors={errors.nombre}></Alerta>
              ) : null}

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa
                </label>
                <Field
                  placeholder="Nombre de la empresa"
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-100"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta errors={errors.empresa}></Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email
                </label>
                <Field
                  placeholder="Email"
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-100"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta errors={errors.email}></Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Telefono
                </label>
                <Field
                  placeholder="Telefono del cliente"
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-100"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta errors={errors.telefono}></Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas del cliente
                </label>
                <Field
                  as="textarea"
                  placeholder="Notas del cliente"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-100 h-40"
                  name="notas"
                />
              </div>

              <input
                type="submit"
                value={
                  cliente?.nombre ? "Actualizar cliente" : "Agregar cliente"
                }
                className="mt-5 w-full bg-blue-800 text-white p-3 uppercase font-bold text-lg  rounded-xl"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
//son props que toma en caso de que no encuentre el prop que se pone
Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
