import React from 'react'
import './Admin.css'
import Sidebar from '../../Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Addproduct from '../../Addproduct/Addproduct'
import Listproduct from '../../Listproduct/Listproduct'

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar />
        <Routes>
          <Route path='/addproduct' element={<Addproduct />} ></Route>
           <Route path='/listproduct' element={<Listproduct />} ></Route>
        </Routes>

    </div>
  )
}

export default Admin