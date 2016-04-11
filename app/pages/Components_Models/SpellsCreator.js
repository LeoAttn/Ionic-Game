/**
 * Created by Guillaume on 25/03/2016.
 */
import {IONIC_DIRECTIVES} from 'ionic-angular'
import {Component, Input} from 'angular2/core'
import {HeroService} from '../../components/hero-service'
import {ShopService} from './../../components/shop-service';
import {Store} from '../../store'
@Component({
    selector: 'spell',
    template: `
        <ion-card>
            <ion-card-header>
                {{spell.name}}
            </ion-card-header>
            <ion-card-content>
                <ion-list>
                    <ion-list-header>Effects</ion-list-header>
                    <ion-item>{{spell.description}}</ion-item>
                </ion-list>
                <ion-list>
                    <ion-list-header>Cost</ion-list-header>
                    <ion-item>{{spell.price}} Gils</ion-item>
                        <div *ngIf="spell.status != 'Acheter' || spell.price < money">
                            <button dark (click)=actionOnSpell()>{{spell.status}}</button>
                        </div>
                        <div *ngIf="spell.status == 'Acheter' && spell.price > money">
                            <button disabled dark (click)=actionOnSpell()>{{spell.status}}</button>
                        </div>

                </ion-list>
            </ion-card-content>
        </ion-card>
    `,
    directives: [IONIC_DIRECTIVES]
})

export class SpellComponent {
    @Input() spell;

    constructor(heroService:HeroService, shopService:ShopService, store:Store) {
        this.hero = heroService;
        this.shop = shopService;
        this.store = store;
        this.error = this.store.state.map(state => state.action);
        this.store.state.map(state => state.hero.money).subscribe(money => this.money = money);
        this.status = "";
    }

    buySpell() {
        this.status = "Equiper";
        this.shop.dispatch({type: 'BUY_SPELL', spellComponent:{item:this.spell, status:this.status}});
    }

    actionSpellToInventory(){
        this.hero.dispatch({type: 'SELECTED_SPELL', spellComponent:{spell:this.spell, status:this.status }});
    }

    actionOnSpell(){
        this.status = this.spell.status;
        console.log("status",this.status)
        if(this.status == "Acheter"){
            this.buySpell()
        }
        else if(this.status == "Equiper"){
            this.actionSpellToInventory()
        }
        else{
            this.actionSpellToInventory();
            this.status = "Equiper"
        }

    }

}

