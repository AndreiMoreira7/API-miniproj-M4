const dicasSustentaveis = [
    'Use sacolas reutilizáveis ao fazer compras.',
    'Economize água fechando a torneira ao escovar os dentes.',
    'Separe o lixo para a reciclagem.',
    'Opte por transporte público, bicicleta ou caminhada sempre que possível.',
    'Reduza o consumo de carne.',
    'Evite o desperdício de alimentos.',
    'Utilize lâmpadas LED.',
    'Desconecte aparelhos eletrônicos da tomada quando não estiverem em uso.',
    'Apoie negócios locais e sustentáveis.',
    'Plante árvores e cuide das áreas verdes.',
    // ... mais dicas simuladas
  ];
  
  export function getRandomDicaSustentavel() {
    const randomIndex = Math.floor(Math.random() * dicasSustentaveis.length);
    return dicasSustentaveis[randomIndex];
  }