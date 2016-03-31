import {Component} from 'angular2/core'
import {Storage, LocalStorage} from 'ionic-angular'
import {Subject, Observable} from 'rxjs'

const MONSTER_LIFE = 'monster_life_key';
const LEVEL = 'level_key';

@Component({
    selector: 'clicker',
    template: `
        <h2>Level : {{levelStream | async}}</h2>
        <h2>Value : {{healthStream | async}}</h2>
        <button (click)="clickStream.next()" id="clicBtn">Increment</button>
    `
})
export class Clicker {
    constructor() {
        const localStorage = new Storage(LocalStorage);
        localStorage.set(MONSTER_LIFE, 10);
        const savedCount = Observable.fromPromise(localStorage.get(MONSTER_LIFE))
            .map(toIntOrZero);
        const savedLevel = Observable.fromPromise(localStorage.get(LEVEL))
            .map(toIntOrZero);

        this.clickStream = new Subject();
        //this.levelStream = new Subject().merge(savedLevel);

        const lostHealthStream =  this.clickStream
            .map(click => 1)
            .scan( (a,b) => a + b)
            .map(sum => sum % 10)
            .startWith(0)

        this.healthStream = lostHealthStream.map(x => 10 - x)

        this.healthStream.subscribe(count => localStorage.set(MONSTER_LIFE, count));
        //this.levelStream.subscribe(count => localStorage.set(LEVEL, count));
    }
}

const toIntOrZero = saved => saved ? parseInt(saved) : 0;