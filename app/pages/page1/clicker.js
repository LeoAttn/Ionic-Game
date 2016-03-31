import {Component} from 'angular2/core'
import {Page, Storage, LocalStorage} from 'ionic-angular'
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
    constructor() {
        const localStorage = new Storage(LocalStorage);
        const savedCount = Observable.fromPromise(localStorage.get(COUNTER))
            .map(toIntOrZero);

        this.clickStream = new Subject();

        this.countStream = this.clickStream
            .map(click => 1)
            .merge(savedCount)
            .scan((accumulator, current) => accumulator + current);
        this.countStream.subscribe(count => localStorage.set(COUNTER, count));
    }
}

const toIntOrZero = saved => saved ? parseInt(saved) : 0;