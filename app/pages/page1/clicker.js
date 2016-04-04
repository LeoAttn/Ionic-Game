import {Component} from 'angular2/core'
import {Storage, LocalStorage, IONIC_DIRECTIVES} from 'ionic-angular'
import {Subject, Observable} from 'rxjs'
import {StorageService} from '../../storage-service'
import {HeroService} from '../../components/hero-service'

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
    constructor(hero:HeroService) {
        this.hero = hero;

        const savedLevel = hero.level
            .do(level => this.monsterHealth = level * 2)
            .do(() => this.healthStream = Observable.from([this.monsterHealth]));

        this.levelStream = new Observable.from(savedLevel);
    };

    clickBtn() {
        this.monsterHealth = this.hero.attack(this.monsterHealth);
        if (this.monsterHealth <= 0) {
            let nextLevel = this.hero.levelUp();
            this.levelStream = Observable.from([nextLevel]);
            this.monsterHealth = nextLevel * 2;
        }
        this.healthStream = Observable.from([this.monsterHealth]);
    };
}