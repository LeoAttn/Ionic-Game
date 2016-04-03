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
        <button round large (click)="clickBtn()" id="clicBtn">OUTCH</button>
    `,
    directives: [IONIC_DIRECTIVES]
})
export class Clicker {
    constructor(storage:StorageService, hero:HeroService) {
        this.storage = storage;

        const savedLevel = storage.get(LEVEL)
            .map(toIntOrOne)
            .do(level => this.monsterHealth = level * 2)
            .do(() => this.healthStream = Observable.from([this.monsterHealth]));

        this.levelStream = new Observable.from(savedLevel);
    };

    clickBtn() {
        this.healthStream = Observable.from([this.monsterHealth -= 1]);
        if (this.monsterHealth <= 0) {
            this.levelStream = Observable.from(this.levelStream
                .map(level => {
                    let nextLevel = level + 1;
                    this.storage.set(LEVEL, nextLevel);
                    this.monsterHealth = nextLevel * 2;
                    this.healthStream = Observable.from([this.monsterHealth]);
                    return nextLevel;
                }));
        }
    };
}

const toIntOrOne = saved => saved ? parseInt(saved) : 1;