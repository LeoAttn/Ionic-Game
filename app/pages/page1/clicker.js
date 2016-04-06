import {Component} from 'angular2/core'
import {IONIC_DIRECTIVES} from 'ionic-angular'
import {Subject, Observable} from 'rxjs'
import {HeroService} from '../../components/hero-service'
import {Store} from './../../store';


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
    constructor(store:Store, hero:HeroService) {
        this.hero = hero;
        this.store = store;
        this.levelStream = this.store.state.map(state => state.monster.level);
        this.healthStream = this.store.state.map(state => state.monster.health);
    };

    clickBtn() {
        this.hero.dispatch({type : "ATTACK"});//ATTACK THE CURRENT MONSTER
    };
}