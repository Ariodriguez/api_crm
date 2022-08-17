import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

    const [clientes, setClientes] = useState([])
    
    useEffect (() => {
      const obtenerClientesAPI = async () => {
            try {
              /* hacemos el metodo Get implicito para llamar los clientes indicando desde donde (db) */
              const url = 'http://localhost:4000/clientes'
              const respuesta = await fetch(url)
              const resultado = await respuesta.json()

              setClientes(resultado)
            } catch (error) {
              console.log(error)
            }
      } 

      obtenerClientesAPI()
    }, [])
    /* El boton de eliminar */
    const handleEliminar = async id => {
        const confirmar = confirm('¿Deseas eliminar este cliente?')
        /* Hacemos un try catch como los anteriores pero con el metodo DELETE */
        if (confirmar) {
          try {
            const url = `http://localhost:4000/clientes/${id}`
            const respuesta= await fetch(url, {
              method: 'DELETE'
            })

            await respuesta.json()
            /* Hacemos el metodo filter ya que nos devuelve un arreglo nuevo en este caso que traiga los !== al id que borramos*/
            const arrayClientes= clientes.filter( cliente => cliente.id !== id)
            setClientes(arrayClientes)
          } catch (error) {
              console.log(error)
          }
        }
    }

    return (
      <>
      {/* Creando una tabla para ver los clientes */}
          <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
          <p className='mt-3'>Administra tus Clientes</p>
          {/*Esta es la Tabla base con la informacion que llamamos de la db en el comp de Cliente.jsx  */}
          <table className='w-full mt-5 table-auto shadow bg-white'>
            <thead className='bg-blue-800 text-white'>
              <tr>
                <th className='p-2'>Nombre</th>
                <th className='p-2'>Contacto</th>
                <th className='p-2'>Empresa</th>
                <th className='p-2'>Acciones</th>
              </tr>
            </thead>

            <tbody>
                {clientes.map( cliente => (
                    <Cliente 
                      key={cliente.id}
                      cliente={cliente}
                      handleEliminar={handleEliminar}
                    />
                ))}
            </tbody>


          </table>


      </>
    )
  }

export default Inicio

