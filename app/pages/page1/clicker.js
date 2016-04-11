import {Component} from 'angular2/core'
import {IONIC_DIRECTIVES} from 'ionic-angular'
import {Subject, Observable} from 'rxjs'
import {HeroService} from '../../components/hero-service'
import {Store} from './../../store';


@Component({
    selector: 'clicker',
    template: `
        <h3>Level : {{levelStream | async}}</h3>
        <div>
            <h4>Damages: {{damagesStream | async}}</h4>
        </div>
        <div>
            <h4>DPS: {{dmgSecStream | async}}</h4>
        </div>        
        <div>
            <h4>Health : {{healthStream | async}} / {{healthMaxStream | async}}</h4>
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
        this.levelStream = this.store.state.map(state => state.hero.level);
        this.damagesStream = this.store.state.map(state => state.hero.clickDamage);
        this.dmgSecStream = this.store.state.map(state => state.hero.dps);
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