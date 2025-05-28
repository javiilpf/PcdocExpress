import React from 'react';
import { useParams } from 'react-router-dom';

const ErrorPage = () => {
  const { error } = useParams();

  let title = "Error";
  let message = "Todavía no tenemos esta página. ¡Vuelve más tarde!";

  if (error === '404') {
    title = "404";
    message = "Página no encontrada";
  } else if (error) {
    message = error;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-100">
      <h1 className="text-6xl font-bold text-amber-600">{title}</h1>
      <p className="text-xl mt-4 text-amber-700">{message}</p>
    </div>
  );
};

export default ErrorPage;