import {Page, NavParams, ViewController} from 'ionic-angular'
import {HeroService} from '../../components/hero-service'
import {ShopService} from './../../components/shop-service';

@Page({
    template: `
        <ion-toolbar>
          <ion-title>
            Spells
          </ion-title>
          <ion-buttons start>
            <button (click)="dismiss()">
              <ion-icon name="md-close"></ion-icon>
            </button>
          </ion-buttons>
        </ion-toolbar>
        <ion-content>
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
                        <button class="button button-dark" (click)=actionOnSpell()>{{spell.status}}</button>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    `
})
export class SpellModal {

    constructor(params:NavParams, viewCtrl:ViewController, heroService: HeroService, shopService:ShopService) {
        this.spell = params.get('spell');
        this.view = viewCtrl;
        this.hero = heroService;
        this.shop = shopService
    }

    actionOnSpell() {
        if (this.spell.status == "Acheter") {
            this.spell.status = "Aqcuis";
            //this.shop.dispatch({type :'BUY_SPELL', item : this.spell});
        }

        else if (this.spell.status == "Aqcuis") {
            console.log(this.spell);
            /*this.spell.status = "Chosen";
            console.log('OK');
            this.store.initState.hero.inventory.spells = this.store.initState.hero.inventory.spells(spellTab => {
                console.log(typeof(spellTab));
                spellTab.push(JSON.stringify(this.spell));
                return spellTab
            });

            this.store.initState.hero.inventory.spells.subscribe(spellTab => {
                console.log(spellTab.description);
                this.store.storage.set("equippedSpells", spellTab)
            });*/
            this.hero.dispatch({type: 'SELECTED_SPELL', spell: this.spell})

        } else {
            console.log("error");
        }

    }


    dismiss() {
        this.view.dismiss();
    }
}
