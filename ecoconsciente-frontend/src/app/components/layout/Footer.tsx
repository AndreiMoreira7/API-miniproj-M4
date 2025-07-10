import React from 'react';
import { FaGithub } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-eco-green-dark text-white py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-lg font-heading mb-4">EcoConsciente API &copy; {new Date().getFullYear()}</p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/seu-usuario/ecoconsciente-api" // Substitua pelo link real do seu repositório da API
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-eco-green-light transition-colors duration-200 flex items-center"
            title="Repositório da API"
          >
            <FaGithub className="text-2xl mr-2" />
            API no GitHub
          </a>
          <a
            href="https://github.com/seu-usuario/ecoconsciente-frontend" // Substitua pelo link real do seu repositório do Frontend
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-eco-green-light transition-colors duration-200 flex items-center"
            title="Repositório do Frontend"
          >
            <FaGithub className="text-2xl mr-2" />
            Frontend no GitHub
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-300">
          Juntos, construímos um futuro mais verde.
        </p>
      </div>
    </footer>
  );
};