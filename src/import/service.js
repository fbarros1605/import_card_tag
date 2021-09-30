const uuidv1 = require('uuid/v1');
const ServiceCard = require('../card/service')
const serviceCard = new ServiceCard();
const ServiceTag = require('../tag/service')
const serviceTag = new ServiceTag();
/*
Conteúdo do arquivo CSV:
    texto,tags
    Principais fontes de noticias,jornais;revistas;internet
    Principais meios de transporte publicos,onibus;metro;trem
    Locais de maior impacto de midia,onibus;internet

Conteúdo do arquivo na variável "data", após carga no Console:
[
    {
      texto: 'Principais fontes de noticias',
      tags: 'jornais;revistas;internet'
    },
    {
      texto: 'Principais meios de transporte publicos',
      tags: 'onibus;metro;trem'
    },
    {
      texto: 'Locais de maior impacto de midia',
      tags: 'onibus;internet'
    }
]

OBS1: AS CLASSES DE CARD E TAGS PODERIAM SER HERDADAS DE UMA CLASSE PAI NA PASTA "base". 
PARA INFORMAÇÃO, ESTOU DEIXANDO ESSA SINALIZAÇÃO.

OBS2: COMO NÃO ESTOU FAZENDO PERSISTÊNCIAS EM BANCOS/ARQUIVOS, NÃO ME PREOCUPEI COM
INTEGRIDADE DAS INFORMAÇÕES, OU SEJA, É POSSÍVEL REMOVER UMA TAG UTILIZADA EM UM CARD.

OBS3: MUITO OBRIGADO PELA OPORTUNIDADE DE PARTICIPAR DO PROCESSO SELETIVO

*/

class serviceImport {
    
    constructor() {
    }
    
    async normalizeTags(tags) {

    }

    async importData(data) {
        try 
        {
            if (!Array.isArray(data)) {
                data = Object.values(data)
            }
            let cards = data;

            for (const [idx, card] of cards.entries()) {
                let tags = []
                //normaliza as tags em uma lista
                card.splitedTags = card.tags.split(';')
                
                // importação das tags
                for (const [idx, tag] of card.splitedTags.entries()) {
                    let index = tags.indexOf(tag);
                    // primeiro testo se o meu array já contém a tag. Isso evita a chamada desnecessária ao serviço.
                    if  (index > -1) {
                        return tags[index]
                    } else {
                        let newTag = await serviceTag.findOrCreateByName({name: tag});
                        tags.push(newTag);
                    }
                } 
                card.objTags = tags
                // importo os cards
                console.log('Importação do card: ', await serviceCard.findOrCreate(card))
            };
            console.log('Lista de todos os cards importados: ', await serviceCard.findAll());
            return cards;
        } catch (err) {
            console.log(err);
            return err
        }
    };
}

module.exports = serviceImport;