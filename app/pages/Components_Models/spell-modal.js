import {Page, NavParams, ViewController} from 'ionic-angular'
import {HeroService} from '../../components/hero-service'
import {ShopService} from './../../components/shop-service';
import {Store} from '../../store'

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
                        <button class="button button-dark" (click)=actionOnSpell()>ACHETER</button>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
        `
})
export class SpellModal {

    constructor(params:NavParams, viewCtrl:ViewController, heroService: HeroService, shopService:ShopService, store:Store) {
        this.spell = params.get('spell');
        this.view = viewCtrl;
        this.hero = heroService;
        this.shop = shopService;
        this.store = store
    }

    actionOnSpell() {
        this.shop.dispatch({type : 'BUY_SPELL', item: this.spell});
        this.hero.dispatch({type: 'SELECTED_SPELL', spell: this.spell});
        this.dismiss()
    }


    dismiss() {
        this.view.dismiss();
    }
}
