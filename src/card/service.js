const uuidv1 = require('uuid/v1');
const moment = require('moment');


class ServiceCard {
    
    constructor() {
        this.cards = [];
    }

    async findAll() {
        return this.cards;
    };

    async findCardsPerTag(tagName) {
        //variável "cards" definida LOCALMENTE. Atenção com o escopo!
        let cards = []

        cards = this.cards.filter(card => {
            let tagList = card.tags.filter(tag => {
                return tag.name == tagName
            })
            return tagList.length > 0 
        })
        return cards;
    };

    async findOne(id) {
        let card = this.cards.filter(x =>{
            return x.id == id;
        })

        if (card.length > 0 && card[0].id) {
            return card[0];
        } else {
            return null;
        }
    };

    async findOrCreate(data) {
        if (data.id) {
            let card = await this.findOne(data.id);
            if (card) {
                return card;
            }
        } else {
            data.id = uuidv1();
        }
        data.data_criacao = moment(new Date()).format('YYYY-MM-DD');
        this.cards.push(data);
        return data;
    };

    async update(data, id) {
        try {
            if (data && id) {
                this.cards.forEach(card => {
                    if (card.id == id) {
                        card.texto = data.texto;
                        card.name = data.name;
                        card.data_modificacao = moment(new Date()).format('YYYY-MM-DD');
                        card.tags = data.tags;
                        }
                    })
                return true;
            } else {
                return false;
            }
    
        } catch (err) {
            return false;
        }
    }

    async destroy(id) {
        try {
            if (id) {
                let card = this.cards.filter(x =>{
                    return x.id == id;
                    
                })
                if (card) {
                    this.cards.splice(card, 1)
                }
                return true;
            }
        } catch (err) {
            return false;
        }
    };

    async count() {
        return this.cards.length;
    };
}

module.exports = ServiceCard;