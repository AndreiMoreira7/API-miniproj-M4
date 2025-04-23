## 1. Introdução

A API EcoConsciente é uma interface de programação de aplicações (API) RESTful desenvolvida para fornecer dados relevantes e funcionalidades focadas na conscientização e engajamento ambiental. O objetivo principal é facilitar o acesso a informações cruciais sobre o meio ambiente para sistemas (web, mobile, etc.), permitindo a criação de aplicações que eduquem, informem e incentivem ações sustentáveis.

Atualmente, a API oferece acesso a dados sobre a qualidade do ar em localizações específicas, informações sobre espécies ameaçadas por país e dicas práticas para a adoção de um estilo de vida mais sustentável.

## 2. URL Base da API

Todas as rotas da API são prefixadas com a seguinte URL base:

`http://localhost:3000/api`

## 3. Rotas da API

### 3.1. Rota de Qualidade do Ar (`/ar/qualidade`)

**Método:** `GET`

**Endpoint:** `/api/ar/qualidade`

**Funcionalidade:** Retorna dados sobre a qualidade do ar para uma determinada localização geográfica, especificada por latitude e longitude.

**Parâmetros de Query:**

* `lat` (obrigatório): Latitude da localização desejada. Deve ser um valor numérico decimal representando a latitude.
* `lon` (obrigatório): Longitude da localização desejada. Deve ser um valor numérico decimal representando a longitude.

**Formato da Resposta (JSON):**

Em caso de sucesso (HTTP 200 OK), a API retorna um objeto JSON contendo as seguintes informações:

```json
{
  "iqa": 65,
  "poluentes": {
    "pm25": 15,
    "o3": 40,
    "no2": 10,
    "so2": 5,
    "co": 2
    // Outros poluentes relevantes podem ser incluídos
  },
  "descricao": "Moderada",
  "data_hora": "2025-04-23T15:30:00Z"
}
iqa: Índice de Qualidade do Ar (um valor numérico que representa o nível geral de qualidade do ar). A escala e o significado dos valores podem variar dependendo da fonte dos dados simulados.
poluentes: Um objeto JSON onde as chaves são os nomes dos poluentes (e.g., "pm25" para partículas finas com diâmetro menor que 2.5 micrômetros, "o3" para ozônio, "no2" para dióxido de nitrogênio, "so2" para dióxido de enxofre, "co" para monóxido de carbono) e os valores são suas concentrações (as unidades podem variar dependendo da fonte simulada).
descricao: Uma descrição textual do nível de qualidade do ar correspondente ao IQA (e.g., "Boa", "Moderada", "Ruim", "Muito Ruim", "Péssima").
data_hora: Timestamp da leitura da qualidade do ar (formato ISO 8601 UTC).
Exemplos de Requisição:

GET /api/ar/qualidade?lat=-23.5505&lon=-46.6333 (Exemplo para São Paulo, Brasil)
GET /api/ar/qualidade?lat=40.7128&lon=-74.0060 (Exemplo para Nova York, EUA)
Exemplos de Resposta:

Sucesso (HTTP 200 OK):

JSON

{
  "iqa": 42,
  "poluentes": {
    "pm25": 10,
    "o3": 35
  },
  "descricao": "Boa",
  "data_hora": "2025-04-23T15:25:00Z"
}
Erro (HTTP 400 Bad Request - Parâmetros ausentes):

JSON

{
  "erro": "Parâmetros de latitude (lat) e longitude (lon) são obrigatórios."
}
Erro (HTTP 404 Not Found - Dados não encontrados):

JSON

{
  "erro": "Dados de qualidade do ar não encontrados para a localização fornecida."
}
3.2. Rota de Espécies Ameaçadas (/especies/ameacadas)
Método: GET

Endpoint: /api/especies/ameacadas

Funcionalidade: Retorna uma lista de espécies classificadas como ameaçadas em um determinado país. A identificação do país é feita através do código ISO 3166-1 alpha-2.

Parâmetros de Query:

pais (obrigatório): Código do país ISO 3166-1 alpha-2 (sempre em letras maiúsculas, e.g., "BR" para Brasil, "US" para Estados Unidos).
Formato da Resposta (JSON):

Em caso de sucesso (HTTP 200 OK), a API retorna um array de objetos JSON, onde cada objeto representa uma espécie ameaçada:

JSON

[
  {
    "nome_cientifico": "Panthera onca",
    "nome_popular": "Onça-pintada",
    "categoria": "Vulnerável",
    "descricao": "O maior felino das Américas, importante para o equilíbrio dos ecossistemas."
  },
  {
    "nome_cientifico": "Amazona vinacea",
    "nome_popular": "Papagaio-de-peito-roxo",
    "categoria": "Em Perigo",
    "descricao": "Ave endêmica da Mata Atlântica, criticamente ameaçada pela perda de habitat e tráfico."
  },
  // ... mais espécies ameaçadas para o país especificado
]
nome_cientifico: O nome científico da espécie (em latim).
nome_popular: O nome comum da espécie (se disponível).
categoria: A categoria de ameaça da espécie, seguindo classificações como as da IUCN (e.g., "Em Perigo Crítico", "Em Perigo", "Vulnerável", "Ameaçado").
descricao: Uma breve descrição da espécie e/ou das principais ameaças que enfrenta.
Exemplos de Requisição:

GET /api/especies/ameacadas?pais=BR
GET /api/especies/ameacadas?pais=AU (Exemplo para Austrália)
Exemplos de Resposta:

Sucesso (HTTP 200 OK):

JSON

[
  {
    "nome_cientifico": "Pteropus poliocephalus",
    "nome_popular": "Morcego-de-cabeça-cinza",
    "categoria": "Vulnerável",
    "descricao": "Um grande morcego frugívoro nativo da Austrália."
  },
  {
    "nome_cientifico": "Sarcophilus harrisii",
    "nome_popular": "Diabo-da-tasmânia",
    "categoria": "Em Perigo",
    "descricao": "Um marsupial carnívoro encontrado na ilha da Tasmânia."
  }
]
Erro (HTTP 400 Bad Request - Parâmetro ausente):

JSON

{
  "erro": "O parâmetro de país (pais) é obrigatório."
}
Erro (HTTP 404 Not Found - País não encontrado ou sem espécies ameaçadas registradas):

JSON

{
  "erro": "Espécies ameaçadas não encontradas para o país: JP"
}
3.3. Rota de Dica Sustentável (/dica/sustentavel)
Método: GET

Endpoint: /api/dica/sustentavel

Funcionalidade: Retorna uma dica aleatória e prática que os usuários podem implementar em seu dia a dia para contribuir com a sustentabilidade e a preservação do meio ambiente.

Parâmetros de Query:

Nenhum parâmetro de query é necessário para esta rota.
Formato da Resposta (JSON):

Em caso de sucesso (HTTP 200 OK), a API retorna um objeto JSON contendo a dica:

JSON

{
  "dica": "Use garrafas de água reutilizáveis para reduzir o consumo de plástico."
}
dica: Uma string contendo uma sugestão para um comportamento mais sustentável.
Exemplo de Requisição:

GET /api/dica/sustentavel

Exemplos de Resposta:

Sucesso (HTTP 200 OK - Exemplo 1):

JSON

{
  "dica": "Prefira produtos a granel ou com embalagens recicláveis."
}
Sucesso (HTTP 200 OK - Exemplo 2):

JSON

{
  "dica": "Economize energia desligando as luzes ao sair de um cômodo."
}

4. Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript para o servidor.
Express: Framework web minimalista e flexível para Node.js, utilizado para construir a API RESTful.
Módulos ES6: Sistema de módulos padrão do JavaScript para organização e reutilização do código.
cors (Middleware): Utilizado para habilitar o Cross-Origin Resource Sharing, permitindo que sistemas em diferentes origens (domínios, portas) acessem a API.
5. Configuração e Execução da API
Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina.
Clone o repositório do projeto (se aplicável).
Navegue até a pasta raiz do projeto (ecoconsciente-api/).
Instale as dependências:
Bash

npm install
ou
Bash

yarn install
Execute o servidor da API:
Bash

node api.js
O servidor estará rodando em http://localhost:3000.

6. Armazenamento de Dados
Neste projeto, para simplificar o desenvolvimento e focar na lógica da API, os dados são simulados em arquivos JavaScript dentro da pasta data/. Em um cenário de produção real, a API se conectaria a bancos de dados (como PostgreSQL, MongoDB, etc.) ou a APIs de terceiros para obter dados mais dinâmicos e abrangentes.

Os arquivos de dados simulados incluem:

data/arData.js: Contém um array de objetos representando dados de qualidade do ar para diferentes localizações.
data/especiesData.js: Contém um objeto onde as chaves são códigos de países (ISO 3166-1 alpha-2) e os valores são arrays de objetos representando espécies ameaçadas naquele país.
data/dicasData.js: Contém um array de strings representando dicas para um estilo de vida sustentável.
7. Estrutura do Código
ecoconsciente-api/
├── api.js           (Ponto de entrada da API - Configura o servidor Express e as rotas)
├── controllers/
│   ├── arController.js       (Lógica para a rota de qualidade do ar)
│   ├── especiesController.js (Lógica para a rota de espécies ameaçadas)
│   └── dicasController.js    (Lógica para a rota de dicas sustentáveis)
├── data/
│   ├── arData.js           (Dados simulados de qualidade do ar)
│   ├── especiesData.js     (Dados simulados de espécies ameaçadas)
│   └── dicasData.js        (Dados simulados de dicas sustentáveis)
└── README.md        (Documentação do projeto)

8. CORS (Cross-Origin Resource Sharing)
A API está configurada para permitir requisições de diferentes origens através do middleware cors. Isso é essencial para que sistemas (que podem estar rodando em um domínio ou porta diferente do back-end) possam fazer chamadas à API sem problemas de segurança de origem cruzada. A configuração atual permite todas as origens para facilitar o desenvolvimento. Em um ambiente de produção, é recomendável restringir as origens permitidas por segurança.

9. Boas Práticas de Codificação
O código do projeto segue boas práticas de codificação em JavaScript, incluindo:

Identação consistente: Utilização de espaços para indentação, facilitando a leitura do código.
Nomes descritivos: Utilização de nomes claros e significativos para variáveis, funções e arquivos.
Modularização: O código é separado em módulos ES6 para melhor organização e reutilização.
Tratamento de erros: As rotas incluem tratamento básico de erros para requisições inválidas ou dados não encontrados.
10. Contribuição
Contribuições para o projeto são bem-vindas! Se você encontrar bugs, tiver sugestões de melhorias ou quiser adicionar novas funcionalidades, por favor, siga os seguintes passos:

Crie uma issue no repositório do projeto no GitHub descrevendo o problema ou a sugestão.
Faça um fork do repositório para sua conta.
Crie uma branch com um nome descritivo para sua alteração (e.g., feat/nova-funcionalidade ou fix/bug-na-rota-ar).
Implemente suas alterações e faça commits com mensagens claras e concisas.
Envie suas alterações para o seu fork no GitHub.
Crie um pull request (PR) para a branch principal do repositório original.
As pull requests serão revisadas e, se aprovadas, mergeadas no projeto.

11. Próximos Passos e Melhorias Futuras
Integração com fontes de dados reais: Conectar a API a APIs de qualidade do ar e de espécies ameaçadas de fontes confiáveis e atualizadas.
Implementação de mais rotas: Adicionar funcionalidades como informações sobre desmatamento, energias renováveis, pegada de carbono, etc.
Suporte a diferentes formatos de resposta: Permitir que o cliente solicite dados em formatos diferentes (e.g., XML).
Autenticação e autorização: Implementar mecanismos de segurança para proteger o acesso à API, se necessário.
Testes automatizados: Adicionar testes unitários e de integração para garantir a qualidade e a estabilidade da API.
Documentação mais avançada: Utilizar ferramentas como Swagger/OpenAPI para gerar uma documentação interativa da API.
Implementação de rotas POST, PUT e DELETE (se aplicável para futuras funcionalidades).
Cache de dados: Implementar mecanismos de cache para melhorar o desempenho da API