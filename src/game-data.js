export default class GameData {

    get(key){
        return sessionStorage.getItem(key) || '';
    }

    getValue(key){
        return sessionStorage.getItem(key);
    }

    add(key, source){
        return sessionStorage.setItem(key, source)
    }

    remove(key){
        return sessionStorage.removeItem(key);
    }
}