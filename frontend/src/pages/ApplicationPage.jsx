import React from 'react'
import { useNavigate } from 'react-router-dom';

const ApplicationPage = () => {
    const navigate=useNavigate();
  return (
    
    <div className="flex flex-col justify-center items-center gap-4 p-6 bg-gray-100 min-h-screen">
  <div className="p-6 bg-gray-200 text-center">
    <h1 className="text-3xl font-bold">Nuestros servicios disponibles:</h1>
    <p className="text-sm">Elija un servicio para continuar</p>
  </div>
  <div className="flex flex-col sm:flex-row gap-4">
    <button 
    onClick={()=>navigate("/application/reparation/new")}
    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
      Reparación
    </button>
    <button 
    onClick={()=>navigate("/application/maintenance/new")}
    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
      Mantenimiento
    </button>
    <button 
    onClick={()=>navigate("/application/installation/new")}
    className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all">
      Instalación
    </button>
  </div>
</div>

    
  )
}

export default ApplicationPage