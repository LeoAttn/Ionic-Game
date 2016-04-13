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
            <ion-col width-20 *ngFor="#spell of spells">
                <div *ngIf="spell.isCooldown">
                    <button disabled danger outline (click)="spellActive(spell)">{{spell.name}}</button>
                </div>
                <div *ngIf="!spell.isCooldown">
                    <button secondary outline (click)="spellActive(spell)">{{spell.name}}</button>
                </div>
            </ion-col>
        </ion-row>
    `,
    directives: [IONIC_DIRECTIVES]
})
export class SpellsBar {
    constructor(store:Store, hero:HeroService) {
        this.hero = hero;
        this.store = store;

        this.store.state.map(state => state.hero.inventory.spells).subscribe(spell => this.spells = spell);
    };

    spellActive(spell) {
        this.hero.dispatch({type: "ACTIVE_SPELL", spell: spell});//ACTIVE A SPELL
        // window.setTimeout(this.hero.dispatch({type: "DISABLE_SPELL", spell: spell}), 3000);//ACTIVE A SPELL
    };
}