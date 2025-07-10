'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaBars, FaTimes } from 'react-icons/fa'; // Ícones para logo e menu

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <FaLeaf className="text-eco-green-medium text-3xl mr-2" />
          <span className="text-2xl font-heading font-bold text-eco-green-dark">EcoConsciente</span>
        </div>

        <div className="hidden md:flex space-x-8">
          <button onClick={() => scrollToSection('qualidade-do-ar')} className="text-green-700 hover:text-eco-green-medium transition-colors duration-200 text-lg font-body">
            Qualidade do Ar
          </button>
          <button onClick={() => scrollToSection('especies-ameacadas')} className="text-green-700 hover:text-eco-green-medium transition-colors duration-200 text-lg font-body">
            Espécies Ameaçadas
          </button>
          <button onClick={() => scrollToSection('dicas-sustentaveis')} className="text-green-700 hover:text-eco-green-medium transition-colors duration-200 text-lg font-body">
            Dicas Sustentáveis
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-green-700 text-2xl focus:outline-none">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg py-4"
        >
          <div className="flex flex-col items-center space-y-4">
            <button onClick={() => scrollToSection('qualidade-do-ar')} className="text-gray-700 hover:text-eco-green-medium transition-colors duration-200 text-lg font-body">
              Qualidade do Ar
            </button>
            <button onClick={() => scrollToSection('especies-ameacadas')} className="text-gray-700 hover:text-eco-green-medium transition-colors duration-200 text-lg font-body">
              Espécies Ameaçadas
            </button>
            <button onClick={() => scrollToSection('dicas-sustentaveis')} className="text-gray-700 hover:text-eco-green-medium transition-colors duration-200 text-lg font-body">
              Dicas Sustentáveis
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
