import {Component} from 'angular2/core'
import {Storage, LocalStorage} from 'ionic-angular'
import {Subject, Observable} from 'rxjs'
import {StorageService} from '../../components/storage-service'

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
    constructor(localStorage:StorageService) {
        localStorage.set(MONSTER_LIFE, 15);
        const savedLife = localStorage.get(MONSTER_LIFE)
            .map(toIntOrZero);
        const savedLevel = localStorage.get(LEVEL)
            .map(toIntOrZero);

        this.clickStream = new Subject();
        this.levelStream = new Subject().merge(savedLevel);

        const damage = this.clickStream
            .map(click => 1)
            .scan((a, b) => a + b)

        const lostHealthStream = Observable
            .combineLatest(damage, savedLife, (damage, life) => damage % life)
            .startWith(0)

        this.healthStream = Observable
            .combineLatest(lostHealthStream, savedLife, (lostHealth, life) => life - lostHealth)

        this.healthStream.subscribe(health => {
            localStorage.set(MONSTER_LIFE, health)
            if (health == 15) {
                this.levelStream = this.levelStream.map(level => level + 1)
            }
        });
        this.levelStream.subscribe(count => localStorage.set(LEVEL, count));
    }
}

const toIntOrZero = saved => saved ? parseInt(saved) : 0;