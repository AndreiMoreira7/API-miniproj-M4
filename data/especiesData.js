const dadosEspeciesAmeacadas = {
    BR: [
      { nome_cientifico: 'Panthera onca', nome_popular: 'Onça-pintada', categoria: 'Vulnerável', descricao: 'O maior felino das Américas.' },
      { nome_cientifico: 'Amazona vinacea', nome_popular: 'Papagaio-de-peito-roxo', categoria: 'Em Perigo', descricao: 'Uma espécie endêmica da Mata Atlântica.' },
      { nome_cientifico: 'Chelonoidis denticulata', nome_popular: 'Jabuti-tinga', categoria: 'Vulnerável', descricao: 'Uma espécie de jabuti encontrada na Amazônia.' },
      // ... mais dados simulados para o Brasil
    ],
    US: [
      { nome_cientifico: 'Ursus arctos horribilis', nome_popular: 'Urso-pardo', categoria: 'Ameaçado', descricao: 'Uma subespécie de urso-pardo na América do Norte.' },
      // ... mais dados simulados para os EUA
    ],
    // ... mais dados simulados para outros países
  };
  
  export function getEspeciesAmeacadas(pais) {
    return dadosEspeciesAmeacadas[pais];
  }