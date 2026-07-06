
export default class ContentCache{
    constructor(){
        this.cache = new Map();
    }

    has(key){
        return this.cache.has(key);
    }
    get(key){
        return this.cache.get(key);
    }
    set(key, value){
        this.cache.set(key, value);
    }
    clear(){
        this.cache.clear();
    }
}