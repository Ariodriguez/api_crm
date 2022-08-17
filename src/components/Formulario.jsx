import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'
/*En este componente vamos a agregar un nuevo cliente inyectandolo en NuevoCliente.jsx */
/* Instalamos la libreria Formik y el validar Yup con el comando npm i formik yup */
const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(20, 'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                    .email('Email no válido')
                    .required('El email es obligatorio'),
                    /* En el caso de que nos salga un error en ingles en el DOM utilizamos el typeError y lo declaramos manualmente */
        telefono: Yup.number()
                    .positive('Número no válido')
                    .integer('Número no válido')
                    .typeError('El número no es válido'),
        notas:'',
    }) 

    /* Esto manda la orden a la api de que se genero un nuevo dato */
    /* La declaración try... catch señala un bloque de instrucciones a intentar ( try ), y especifica una respuesta si se produce una excepción ( catch ). */
    const handleSubmit = async (valores) =>{
        try {
            let respuesta
            if (cliente.id) {
                 /* Editando un Registro */
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url,{
                    /* Metodo PUT para actualizar */
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                        }
                })
            }
            else {
                /* Nuevo Registro */
                const url = 'http://localhost:4000/clientes'
                respuesta = await fetch(url,{
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
            })
            }

            await respuesta.json()
            navigate('/clientes')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    cargando ? <Spinner/> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>

            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}</h1>

            <Formik /* Manejamos el State, Formik ya asocia el objeto con lo que declaramos en el name dentro de los field */
                initialValues={{
                    /* La sintaxis del ?? es un tipo de condicion que si no encuentra tal marca tal */
                    nombre: cliente?.nombre ?? "",
                    empresa:cliente?.empresa ?? "",
                    email:cliente?.email ?? "",
                    telefono:cliente?.telefono ?? "",
                    notas:cliente?.notas ?? "",
                }}
                /* el enable lo que haces es mostrar el valor inicial, en este caso, del formik */
                enableReinitialize={true}
                /* El onSubmit se vincula con el btn que declaramos al final del form, con la funcion habldeSubmit lo mandamos a una funcion fuera del return que luego podemos manipular */
                onSubmit={ async (values, {resetForm}) => {
                await handleSubmit(values)

                    resetForm()
                }}
                /* Llamamos la funcion de validacion de yup luego del submit */
                validationSchema={nuevoClienteSchema}
            >{/* Llamamos a la libreria Formik y utilizamos su componente Form con sus campos Field, tenemos que hacer el label */}
                {({errors, touched}) => {
                    return(
                
                <Form 
                    className='mt-10'
                >
                    <div className='mb-4'>
                        <label 
                            className='text-gray-800'
                            htmlFor='nombre'
                        >Nombre:</label>
                        <Field
                            id="nombre"
                            type="text"
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder="Nombre del Cliente"
                            name="nombre"
                        />
    {/* Hacemos la condicion de que si el usuario toca fuera del campo sin un nombre, salte el error */}
                        {errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta>
                        ): null}

                    </div>

                    <div className='mb-4'>
                        <label 
                            className='text-gray-800'
                            htmlFor='empresa'
                        >Empresa:</label>
                        <Field
                            id="empresa"
                            type="text"
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder="Empresa del Cliente"
                            name="empresa"
                        />

                        {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                        ): null}

                    </div>

                    <div className='mb-4'>
                        <label 
                            className='text-gray-800'
                            htmlFor='email'
                        >E-mail:</label>
                        <Field
                            id="email"
                            type="email"
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder="E-mail del Cliente"
                            name="email"
                        />

                        {errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                        ): null}
                    </div>

                    <div className='mb-4'>
                        <label 
                            className='text-gray-800'
                            htmlFor='telefono'
                        >Teléfono:</label>
                        <Field
                            id="telefono"
                            type="tel"
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder="Teléfono del Cliente"
                            name="telefono"
                        />

                        {errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta>
                        ): null}
                    </div>

                    <div className='mb-4'>
                        <label 
                            className='text-gray-800'
                            htmlFor='notas'
                        >Notas:</label>
                        <Field
                            as="textarea"
                            id="notas"
                            type="text"
                            className='mt-2 block w-full p-3 bg-gray-50 h-40'
                            placeholder="Notas del Cliente"
                            name="notas"
                        />
                    </div>

                    <input 
                        type="submit"
                        value={cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}
                        className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg' 
                    />
                </Form>
                )}}
            </Formik>
        </div> )
  )
}
/* Hacemos este defaultProps para no tener que fabricar codigo desconocido y tampoco repetir un componente */
Formulario.defaultProps = {
    cliente: {},
    cargando: false  
}

export default Formulario