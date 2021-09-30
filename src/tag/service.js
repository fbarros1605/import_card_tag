const uuidv1 = require('uuid/v1');

class serviceTag {
    
    constructor() {
        this.tags = []
    }

    async findAll() {
        return this.tags;
    };

    async findOne(id) {
        let tag = this.tags.filter(x =>{
            return x.id == id;
        })

        if (tag.length > 0 && tag[0].id) {
            return tag[0];
        } else {
            return null
        }
    };
    
    async findOneByName(name) {
        let tag = this.tags.filter(x =>{
            return x.name == name;
        })

        if (tag.length > 0 && tag[0].id) {
            return tag[0];
        } else {
            return null
        }
    };

    async findOrCreate(data) {
        if (data.id) {
            let tag = await this.findOne(data.id);
            if (tag) {
                return tag;
            }
        } else {
            data.id = uuidv1();
        }
        this.tags.push(data);
        return data;
    };

    async findOrCreateByName(data) {
        if (data.name && !data.id) {
            let tag = await this.findOneByName(data.name);
            if (tag) {
                return tag;
            } else {
                data.id = uuidv1();
            }
        } 
        this.tags.push(data);
        return data;
    }; 


    async update(data, id) {
        try {
            if (data && id) {
                this.tags.forEach(tag => {
                    if (tag.id == id) {
                        tag.name = data.name;
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
                let tag = this.tags.filter(x =>{
                    return x.id == id;
                })
        
                if (tag) {
                    this.tags.splice(tag, 1);
                }
                return true;
            }
        } catch (err) {
            return false;
        }
    };

    async count() {
        return this.tags.length;
    };
}

module.exports = serviceTag;