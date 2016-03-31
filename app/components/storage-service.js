import {Injectable} from 'angular2/core';
import {Storage, LocalStorage} from 'ionic-angular';

@Injectable()
export class StorageService {
    constructor() {
        this.storage = new Storage(LocalStorage);
    }

    initOrGet(key, defaultValue){
        var val;
        var promise = this.get(key).then(v => val = v);
        val = val ? val : defaultValue;
        this.set(key, defaultValue);
        return promise;
    }

    get(key){
        return this.storage.get(key);
    }

    set(key, value){
        this.storage.set(key, value);
    }

    remove(key){
        this.storage.remove(key);
    }
}