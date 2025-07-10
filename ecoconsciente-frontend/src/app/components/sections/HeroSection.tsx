'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {}
      <img
        src="/images/hero-background.jpg" 
        alt="Natureza exuberante"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div> {}

      <div className="relative z-20 text-center p-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Conecte-se. Conscientize-se. <br className="hidden md:block" /> Transforme.
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl font-body mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          Seu guia para um futuro mais verde, com dados essenciais e dicas para a sustentabilidade.
        </motion.p>

        <motion.button
          onClick={() => scrollToSection('qualidade-do-ar')}
          className="bg-eco-green-medium text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-eco-green-dark transition-colors duration-300 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore os Dados
        </motion.button>
      </div>
    </section>
  );
};