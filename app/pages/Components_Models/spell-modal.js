import {Page, NavParams, ViewController} from 'ionic-angular'
import {HeroService} from '../../components/hero-service'
import {StorageService} from '../../storage-service'

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

    constructor(params:NavParams, viewCtrl:ViewController, heroService:HeroService, storage:StorageService) {
        this.spell = params.get('spell');
        this.view = viewCtrl;
        this.hero = heroService;
        this.storage = storage;
    }

    buySpell() {
        if (this.spell.status == "Acheter") {
            this.spell.status = "Aqcuis";
        }

        else if (this.spell.status == "Aqcuis") {
            this.spell.status = "Chosen";
            console.log('OK');
            this.hero.spells = this.hero.spells.map(spellTab => {
                console.log(typeof(spellTab));
                spellTab.push(JSON.stringify(this.spell));
                return spellTab
            });

            this.hero.spells.subscribe(spellTab => {
                console.log(spellTab.description);
                this.storage.set("equippedSpells", spellTab)
            });

        } else {
            console.log("error");
        }

    }


    dismiss() {
        this.view.dismiss();
    }
}
