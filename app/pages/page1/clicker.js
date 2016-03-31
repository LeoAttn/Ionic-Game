import {Component} from 'angular2/core'
import {Page} from 'ionic-angular'
import {StorageService} from '../../components/storage-service'
import {Subject, Observable} from 'rxjs'

const COUNTER = 'counter_storage_key'

@Component({
    selector: 'clicker',
    template: `
        <h2>Value : {{countStream | async}}</h2>
        <button (click)="clickStream.next()" id="clicBtn">Increment</button>
    `
})
export class Clicker {
    constructor(storage:StorageService) {

        const savedCount = Observable.fromPromise(storage.get(COUNTER))
            .map(toIntOrZero);

        this.clickStream = new Subject();

        this.countStream = this.clickStream
            .map(click => 1)
            .merge(savedCount)
            .scan((accumulator, current) => accumulator + current);
        this.countStream.subscribe(count => storage.set(COUNTER, count));
    }
}

const toIntOrZero = saved => saved ? parseInt(saved) : 0;