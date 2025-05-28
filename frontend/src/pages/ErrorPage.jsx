import React from 'react'
import { useParams } from 'react-router-dom'

const ErrorPage = () => {
  const {error}=useParams();
  if (error === '404') {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-xl mt-4">Página no encontrada</p>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600">Error</h1>
            <p className="text-xl mt-4">{error}</p>
          </div>
        );
      }
    
  return (
      <div>
        <h1 className="text-4xl font-bold text-center mt-20">Error</h1>
        <p className="text-center mt-4">Ha ocurrido un error inesperado.</p>
      </div>
  )
}

export default ErrorPage