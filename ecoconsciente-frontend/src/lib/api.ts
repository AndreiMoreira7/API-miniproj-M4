const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'; // Fallback para dev

// Tipos para a API de Qualidade do Ar
export interface AirQualityData {
  iqa: number;
  poluentes: {
    pm25?: number;
    o3?: number;
    no2?: number;
    so2?: number;
    co?: number;
    [key: string]: number | undefined; // Para outros poluentes relevantes
  };
  descricao: string;
  data_hora: string;
}

// Tipos para a API de Espécies Ameaçadas
export interface EndangeredSpecies {
  nome_cientifico: string;
  nome_popular: string;
  categoria: string;
  descricao: string;
}

// Tipos para a API de Dicas Sustentáveis
export interface SustainableTip {
  dica: string;
}

export const getAirQuality = async (lat: number, lon: number): Promise<AirQualityData | { erro: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/ar/qualidade?lat=${lat}&lon=${lon}`);
    const data = await response.json();
    if (!response.ok) {
      return { erro: data.erro || 'Erro ao buscar dados de qualidade do ar.' };
    }
    return data as AirQualityData;
  } catch (error) {
    console.error('Erro na requisição de qualidade do ar:', error);
    return { erro: 'Falha ao conectar com o servidor da API.' };
  }
};

export const getEndangeredSpecies = async (countryCode: string): Promise<EndangeredSpecies[] | { erro: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/especies/ameacadas?pais=${countryCode}`);
    const data = await response.json();
    if (!response.ok) {
      return { erro: data.erro || 'Erro ao buscar espécies ameaçadas.' };
    }
    return data as EndangeredSpecies[];
  } catch (error) {
    console.error('Erro na requisição de espécies ameaçadas:', error);
    return { erro: 'Falha ao conectar com o servidor da API.' };
  }
};

export const getSustainableTip = async (): Promise<SustainableTip | { erro: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/dica/sustentavel`);
    const data = await response.json();
    if (!response.ok) {
      return { erro: data.erro || 'Erro ao buscar dica sustentável.' };
    }
    return data as SustainableTip;
  } catch (error) {
    console.error('Erro na requisição de dica sustentável:', error);
    return { erro: 'Falha ao conectar com o servidor da API.' };
  }
};