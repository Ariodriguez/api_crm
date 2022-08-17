import { useEffect, useState } from 'react' 
/* useEffect para consultar  la api y useState para colocarlo en el state de resultado use params para leer el id de la url */
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'

const EditarCliente = () => {
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
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
        <p className='mt-3'>Utiliza este formulario para editar los datos de un cliente</p>

{/* En caso de no existir el id, con un ternario, decimos lo siguiente */}
        {cliente?.nombre ? (
            <Formulario
              cliente={cliente}
              cargando={cargando}
            />
        ): <p className='font-bold uppercase pt-3 text-red-600'>Cliente ID no válido</p>}
        
    </>
  )
}

export default EditarCliente