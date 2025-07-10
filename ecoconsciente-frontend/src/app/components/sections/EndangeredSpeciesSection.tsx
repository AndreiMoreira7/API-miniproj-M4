'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getEndangeredSpecies, EndangeredSpecies } from '../../../lib/api';
import { FaGlobeAmericas, FaPaw, FaLeaf as FaGreenLeaf } from 'react-icons/fa'; 

interface Country {
  code: string;
  name: string;
}

// Lista simulada de países com dados
const COUNTRIES: Country[] = [
  { code: 'BR', name: 'Brasil' },
  { code: 'AU', name: 'Austrália' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'JP', name: 'Japão' }, // País sem dados na API simulada para testar erro
  
];

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'em perigo crítico': return 'bg-red-600';
    case 'em perigo': return 'bg-orange-500';
    case 'vulnerável': return 'bg-yellow-500';
    case 'ameaçado': return 'bg-purple-600'; // Exemplo
    default: return 'bg-gray-500';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'em perigo crítico': return <span className="text-xl">🚨</span>;
    case 'em perigo': return <span className="text-xl">⚠️</span>;
    case 'vulnerável': return <span className="text-xl">🔸</span>;
    default: return <span className="text-xl">❓</span>;
  }
};

export const EndangeredSpeciesSection = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('');
  const [speciesList, setSpeciesList] = useState<EndangeredSpecies[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
  }, []);

  const handleFetchSpecies = async () => {
    setError(null);
    setSpeciesList(null);
    if (!selectedCountryCode) {
      setError('Por favor, selecione um país.');
      return;
    }

    setLoading(true);
    const result = await getEndangeredSpecies(selectedCountryCode);
    if ('erro' in result) {
      setError(result.erro);
    } else {
      setSpeciesList(result);
    }
    setLoading(false);
  };

  return (
    <section id="especies-ameacadas" className="py-20 px-4 bg-eco-green-light text-center">
      <motion.h2
        className="text-4xl font-heading font-bold text-eco-green-dark mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Biodiversidade em Risco: Conheça e Proteja
      </motion.h2>

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <p className="text-lg text-gray-700 mb-6">
          Descubra quais espécies estão ameaçadas em diferentes países.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
          <select
            value={selectedCountryCode}
            onChange={(e) => setSelectedCountryCode(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-eco-green-medium focus:border-eco-green-medium w-full sm:w-64 appearance-none pr-8 bg-white"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%236B9080' d='M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 11.293l-3.586-3.586L5 9.707l4.293 3.243z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="">Selecione um país</option>
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          <motion.button
            onClick={handleFetchSpecies}
            className="bg-eco-blue text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading || !selectedCountryCode}
          >
            {loading ? 'Buscando...' : 'Buscar Espécies'}
          </motion.button>
        </div>

        {loading && <p className="text-eco-green-medium mt-4">Carregando espécies...</p>}
        {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}

        {speciesList && speciesList.length > 0 && !error && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {speciesList.map((species, index) => (
              <motion.div
                key={species.nome_cientifico}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-left flex flex-col items-start"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {}
                  <img
                    src={`https://via.placeholder.com/200x160?text=${species.nome_popular.replace(/\s/g, '+')}`}
                    alt={species.nome_popular}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-eco-green-dark mb-2">{species.nome_popular}</h3>
                <p className="text-sm italic text-gray-600 mb-3">{species.nome_cientifico}</p>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white flex items-center gap-1 ${getCategoryColor(species.categoria)} mb-4`}>
                  {getCategoryIcon(species.categoria)} {species.categoria}
                </span>
                <p className="text-gray-700 text-base flex-grow">{species.descricao}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!speciesList && !loading && !error && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-8">
            <FaGlobeAmericas className="text-5xl mb-4 text-eco-blue" />
            <p className="text-lg">Selecione um país para ver as espécies ameaçadas.</p>
            <img src="/images/endangered-illustration.svg" alt="Ilustração de espécies ameaçadas" className="mt-8 max-w-xs" />
          </div>
        )}

        {speciesList && speciesList.length === 0 && !loading && !error && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-8">
              <FaPaw className="text-5xl mb-4 text-gray-400" />
              <p className="text-lg">Nenhuma espécie ameaçada encontrada para o país selecionado.</p>
              <img src="/images/no-species-illustration.svg" alt="Nenhuma espécie encontrada" className="mt-8 max-w-xs" />
            </div>
          )}
      </div>
    </section>
  );
};