import { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
/* Importamos el Spinner de la carpeta de componentes */
/* UseParams nos permite leer el id  */

const VerCliente = () => {

    const [cliente, setCliente] = useState({})  
    const [cargando, setCargando] = useState(true)  

    const { id } = useParams()
    
    /* El useEffect se ejecuta una vez y cuando este listo hace el llamado a la API */
    useEffect(() =>{
    
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            /* El ! lo cambia al contrario, en este caso de true a false poniendo el valor final */
            setCargando(!cargando)  
        }
        obtenerClienteAPI()
    }, [])
/* Resultado muestra respuesta en json, respuesta hace fetch en la url que llama a la id que solicitemos y el setCliente va a cambiar el resultado a medida que realizamos esta operacion*/
    return (
        cargando ? <Spinner /> : 
            Object.keys(cliente).length === 0 ?
            <p>No hay resultados</p> : (
                <div>
                        <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
                        <p className='mt-3'>Información del Cliente</p>


                        {cliente.nombre &&  (
                            <p className='text-gray-600 text-4xl mt-10'>
                                <span className='text-gray-800 uppercase font-bold'>Cliente: </span>
                                {cliente.nombre}
                            </p>
                        )}
                        {cliente.email && (
                            <p className='text-gray-600 text-2xl mt-4'>
                                <span className='text-gray-800 uppercase font-bold'>Email: </span>
                                {cliente.email}
                            </p>
                        )}
                        {cliente.telefono  && (
                            <p className='text-gray-600 text-2xl mt-4'>
                                <span className='text-gray-800 uppercase font-bold'>Teléfono: </span>
                                {cliente.telefono}
                            </p>
                        )}
                        {cliente.empresa && (
                            <p className='text-gray-600 text-2xl mt-4'>
                                <span className='text-gray-800 uppercase font-bold'>Empresa: </span>
                                {cliente.empresa}
                            </p>
                        )}
                        {cliente.notas && (
                            <p className='text-gray-600 text-2xl mt-4'>
                                <span className='text-gray-800 uppercase font-bold'>Notas: </span>
                                {cliente.notas}
                            </p> 
                        )}         
                </div>
            )
    )
}

export default VerCliente