import {Component} from 'angular2/core'
import {Storage, LocalStorage, IONIC_DIRECTIVES} from 'ionic-angular'
import {Subject, Observable} from 'rxjs'
import {StorageService} from '../../components/storage-service'
import {HeroService} from '../../components/hero-service'

const MONSTER_LIFE = 'monster_life_key';
const LEVEL = 'level_key';

@Component({
    selector: 'clicker',
    template: `
        <h2>Level : {{levelStream | async}}</h2>
        <h2>Health : {{healthStream | async}}</h2>
        <button round large (click)="clickStream.next()" id="clicBtn">OUTCH</button>
    `,
    directives: [IONIC_DIRECTIVES]
})
export class Clicker {
    constructor(localStorage:StorageService, hero:HeroService) {
        localStorage.set(MONSTER_LIFE, 15);
        const savedLife = localStorage.get(MONSTER_LIFE)
            .map(toIntOrZero);
        const savedLevel = localStorage.get(LEVEL)
            .map(toIntOrZero);

        this.clickStream = new Subject();
        this.levelStream = new Subject().merge(savedLevel);

        const damage = this.clickStream
            .map(click => 1)
            .scan((a, b) => a + b);

        this.healthStream = hero.attack(savedLife, damage);

        this.healthStream.subscribe(health => {
            localStorage.set(MONSTER_LIFE, health);
            if (health == 15) {
                console.log('plop');
                this.levelStream = this.levelStream.map(level => level + 1)
                    .do(level => console.log('level ' + level));
            }
        });
        this.levelStream.subscribe(count => {
            console.log('UPDATE');
            localStorage.set(LEVEL, count);
        });
    }
}

const toIntOrZero = saved => saved ? parseInt(saved) : 0;