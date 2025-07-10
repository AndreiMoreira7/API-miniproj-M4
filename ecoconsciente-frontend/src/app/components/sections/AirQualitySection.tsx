'use client'; 
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getAirQuality, AirQualityData } from '../../../lib/api';
import { FaWind, FaMapMarkerAlt, FaThermometerHalf } from 'react-icons/fa'; 
const getIqaColor = (iqa: number) => {
  if (iqa <= 50) return 'bg-green-500'; 
  if (iqa <= 100) return 'bg-yellow-500';
  if (iqa <= 150) return 'bg-orange-500'; 
  if (iqa <= 200) return 'bg-red-500';
  return 'bg-purple-700'; 
};

const pollutantIcons: { [key: string]: JSX.Element } = {
  pm25: <FaWind className="text-blue-500" />,
  o3: <FaThermometerHalf className="text-orange-500" />,
  no2: <FaWind className="text-gray-600" />,
  so2: <FaWind className="text-purple-500" />,
  co: <FaWind className="text-red-700" />,
};

export const AirQualitySection = () => {
  const [lat, setLat] = useState<string>('');
  const [lon, setLon] = useState<string>('');
  const [airData, setAirData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setLoading(true);
    setAirData(null);

    const parsedLat = parseFloat(lat);
    const parsedLon = parseFloat(lon);

    if (isNaN(parsedLat) || isNaN(parsedLon)) {
      setError('Por favor, insira valores válidos para Latitude e Longitude.');
      setLoading(false);
      return;
    }

    const result = await getAirQuality(parsedLat, parsedLon);
    if ('erro' in result) {
      setError(result.erro);
    } else {
      setAirData(result);
    }
    setLoading(false);
  };

  return (
    <section id="qualidade-do-ar" className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white text-center">
      <motion.h2
        className="text-4xl font-heading font-bold text-eco-green-dark mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Respire Melhor: A Qualidade do Ar ao Seu Redor
      </motion.h2>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="flex-1">
          <p className="text-lg text-gray-700 mb-6">
            Insira a latitude e longitude para verificar a qualidade do ar em qualquer lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
            <input
              type="text"
              placeholder="Latitude (ex: -23.5505)"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-eco-green-medium focus:border-eco-green-medium w-full sm:w-1/2"
            />
            <input
              type="text"
              placeholder="Longitude (ex: -46.6333)"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-eco-green-medium focus:border-eco-green-medium w-full sm:w-1/2"
            />
          </div>
          <motion.button
            onClick={handleSearch}
            className="bg-eco-green-medium text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-eco-green-dark transition-colors duration-300 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? 'Buscando...' : 'Buscar Dados'}
          </motion.button>
        </div>

        <div className="flex-1 w-full mt-8 md:mt-0">
          {loading && <p className="text-eco-green-medium">Carregando dados...</p>}
          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {airData && !error && (
            <motion.div
              className="border-l-4 border-eco-green-medium pl-6 text-left"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-eco-green-dark mb-4">Dados de Qualidade do Ar:</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold ${getIqaColor(airData.iqa)}`}>
                  {airData.iqa}
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">{airData.descricao}</p>
                  <p className="text-sm text-gray-500">Última atualização: {new Date(airData.data_hora).toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                {Object.entries(airData.poluentes).map(([pollutant, value]) => (
                  <div key={pollutant} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
                    {pollutantIcons[pollutant] || <FaWind className="text-gray-400" />}
                    <div>
                      <p className="font-semibold text-gray-700 uppercase">{pollutant}</p>
                      <p className="text-gray-600">{value} µg/m³</p> {/* Assumindo unidade, ajustar conforme API */}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {!airData && !loading && !error && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FaMapMarkerAlt className="text-5xl mb-4 text-eco-blue" />
              <p className="text-lg">Insira uma localização para começar!</p>
              <img src="/images/air-quality-illustration.svg" alt="Ilustração de qualidade do ar" className="mt-8 max-w-xs" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};