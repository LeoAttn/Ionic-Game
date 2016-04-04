import {Page, NavParams, ViewController} from 'ionic-angular'

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
                  <button class="button button-dark" (click)=buySpell()>{{spell.status}}</button>
                </ion-list>
              </ion-card-content>
            </ion-card>
        </ion-content>
    `
})
export class SpellModal {

    constructor(params:NavParams, viewCtrl:ViewController) {
        this.spell = params.get('spell');
        this.view = viewCtrl
    }

    buySpell() {
        this.spell.status = "Aqcuis";
    }

    dismiss() {
        this.view.dismiss();
    }
}
