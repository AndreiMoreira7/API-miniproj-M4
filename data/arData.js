const dadosQualidadeAr = [
    { lat: -23.5505, lon: -46.6333, iqa: 65, poluentes: { pm25: 15, o3: 40 }, descricao: 'Moderada' },
    { lat: -22.9068, lon: -43.1729, iqa: 30, poluentes: { pm25: 8, o3: 25 }, descricao: 'Boa' },
    { lat: -15.7958, lon: -47.8667, iqa: 80, poluentes: { pm25: 20, no2: 50 }, descricao: 'Ruim' },
    // ... mais dados simulados
  ];
  
  export function getQualidadeAr(lat, lon) {
    return dadosQualidadeAr.find(
      (item) => item.lat.toFixed(4) === lat.toFixed(4) && item.lon.toFixed(4) === lon.toFixed(4)
    );
  }