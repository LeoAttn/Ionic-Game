import {Component} from 'angular2/core'
import {IONIC_DIRECTIVES} from 'ionic-angular'
import {Subject, Observable} from 'rxjs'
import {HeroService} from '../../components/hero-service'
import {Store} from './../../store';


@Component({
    selector: 'spells-bar',
    template: `
        <h3>Spells</h3>
        <ion-row>
            <ion-col width-20 *ngFor="#spell of spellsJSON">
                <button secondary outline (click)="spellActive(spell)">{{spell.name}}</button>
            </ion-col>
        </ion-row>
    `,
    directives: [IONIC_DIRECTIVES]
})
export class SpellsBar {
    constructor(store:Store, hero:HeroService) {
        this.hero = hero;
        this.store = store;

        this.spells = this.store.state.map(state => state.hero.inventory.spells);
        this.spells.subscribe(spell => this.spellsJSON = spell);
    };

    spellActive(spell) {
        this.hero.dispatch({type: "ACTIVE_SPELL", spell: spell});//ACTIVE A SPELL
        window.setTimeout(this.hero.dispatch({type: "DISABLE_SPELL", spell: spell}), 3000);//ACTIVE A SPELL
    };
}