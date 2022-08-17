import React from 'react'

const Alerta = ({children}) => {
  return (
        <div className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase'>
{/* Mandamos children por props hacia Formulario para que el codigo sea mas reutilizable */}
            {children}
        </div>
  )
}

export default Alerta