import {Injectable} from 'angular2/core';
import {Storage, LocalStorage} from 'ionic-angular';
import {Observable} from 'rxjs'

@Injectable()
export class StorageService {
    constructor() {
        this.storage = new Storage(LocalStorage);
    }

    initOrGet(key, defaultValue) {
        var stream = this.get(key);
        stream
            .map(val => val ? val : defaultValue)
            .subscribe(val=> this.set(key, val));
        return stream;
    }

    get(key) {
        return Observable.fromPromise(this.storage.get(key));
    }

    set(key, value) {
        this.storage.set(key, value);
    }

    remove(key) {
        this.storage.remove(key);
    }
}