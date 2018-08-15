
//API URL
export const ApiUrl = process.env.API_URL || 'http://localhost:3002/';

//GET processo - ?q Busca
export const ApiSearch = ApiUrl + 'processo/?q=';

//POST processo - Novo processo
export const ApiProcesso = ApiUrl + 'processo/';
