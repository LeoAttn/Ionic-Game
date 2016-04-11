import {Component} from 'angular2/core'
import {IONIC_DIRECTIVES} from 'ionic-angular'
import {Subject, Observable} from 'rxjs'
import {HeroService} from '../../components/hero-service'
import {Store} from './../../store';


@Component({
    selector: 'clicker',
    template: `
        <h2>Level : {{levelStream | async}}</h2>
        <div>
            <h2>Health : {{healthStream | async}} / {{healthMaxStream | async}}</h2>
            <progress max="{{healthMaxStream | async}}" value="{{healthStream | async}}"></progress> 
        </div>
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
        this.healthMaxStream = this.store.state.map(state => state.monster.healthMax);

        this.dpsStream = Observable.interval(1000, ()=> {
            console.log("XD");
            this.hero.dispatch({type : 'DPS'});
        });

    };

    clickBtn() {
        this.hero.dispatch({type: "ATTACK"});//ATTACK THE CURRENT MONSTER
    };
}