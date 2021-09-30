'uses strict';
const program = require('commander');
const ApiRequest = require('../src/base/api-request');
const apiRequest = new ApiRequest();
const config = require('../config/index');
const neatCsv = require('neat-csv');
const fs = require('fs');

async function runImport() {
  console.log('Iniciando a Importação dos Cards');
 
  console.log('Carregando o Arquivo...');
  fs.readFile('../cards_para_importar.csv', async (err, data) => {
    if (err) {
      console.log('Erro ao carregar o arquivo CSV!');
      console.error(err);
      return
    }
    data = await neatCsv(data);
    console.log('Arquivo Carregado!');
    console.log('Realizando a importação dos dados...');
    ret = await apiRequest.post(config.url+'/v1/importData', data);
  
    console.log('Importação concluída!');
       
  })

}

program
  .description('Importar Cards do arquivo cards_para_importar.csv')
  .action(companyId => runImport());

process.on('uncaughtException', (err) => {
  console.log('Erro: ', err);
  process.exit(1);
});

program.parse(process.argv);
