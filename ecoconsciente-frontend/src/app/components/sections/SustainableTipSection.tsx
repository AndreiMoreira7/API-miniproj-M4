'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSustainableTip } from '../../../lib/api';
import { FaLightbulb, FaRecycle, FaTree } from 'react-icons/fa'; // Ícones para dicas

export const SustainableTipSection = () => {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTip = async () => {
    setError(null);
    setLoading(true);
    setTip(null);
    const result = await getSustainableTip();
    if ('erro' in result) {
      setError(result.erro);
    } else {
      setTip(result.dica);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTip(); // Busca uma dica inicial ao carregar a página
  }, []);

  return (
    <section id="dicas-sustentaveis" className="py-20 px-4 bg-white text-center">
      <motion.h2
        className="text-4xl font-heading font-bold text-eco-green-dark mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Sua Ação Faz a Diferença: Dicas Sustentáveis
      </motion.h2>

      <div className="max-w-3xl mx-auto bg-gradient-to-br from-eco-green-light to-blue-50 p-10 rounded-lg shadow-xl relative overflow-hidden">
        <FaLightbulb className="absolute top-4 right-4 text-yellow-500 text-5xl opacity-40" />
        <FaRecycle className="absolute bottom-4 left-4 text-eco-green-medium text-5xl opacity-40" />

        {loading && <p className="text-eco-green-dark text-xl">Carregando sua próxima dica...</p>}
        {error && <p className="text-red-500 font-semibold text-xl">{error}</p>}

        {tip && !loading && !error && (
          <motion.div
            key={tip} // 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center"
          >
            <FaTree className="text-eco-green-dark text-6xl mb-6" />
            <p className="text-2xl md:text-3xl font-body font-semibold text-gray-800 mb-8 leading-relaxed">
              &ldquo;{tip}&rdquo;
            </p>
          </motion.div>
        )}

        <motion.button
          onClick={fetchTip}
          className="bg-eco-green-medium text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-eco-green-dark transition-colors duration-300 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? 'Gerando...' : 'Gerar Nova Dica'}
        </motion.button>
      </div>

      <img src="/images/sustainable-actions.svg" alt="Ilustração de ações sustentáveis" className="mt-12 mx-auto max-w-sm" />
    </section>
  );
};