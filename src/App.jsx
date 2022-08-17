import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'
import NuevoCliente from './paginas/NuevoCliente'
import EditarCliente from './paginas/EditarCliente'
import VerCliente from './paginas/VerCliente'
//El framework de react-router-dom nos permite anidar secciones de la pagina
function App() {
  

  return (
      <BrowserRouter>
        <Routes>
          {/* Iniciamos con BrowserRouter, luego con un Routes y dentro de el los Routes que queramos con los RoutesHijos*/}
          <Route path='/clientes' element={<Layout />}>
              <Route index element={<Inicio />} />
              <Route path='nuevo' element={<NuevoCliente />} />
              <Route path='editar/:id' element={<EditarCliente />} />
              <Route path=':id' element={<VerCliente />} />
              {/* Lo que hace el :id es redireccionarnos al componente de VerCliente cada vez que le demos en el btn de ver */}
          </Route>

        </Routes>
      </BrowserRouter>
  )
}

export default App
