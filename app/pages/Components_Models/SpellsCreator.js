/**
 * Created by Guillaume on 25/03/2016.
 */
export function createSpell({
    name,
    description,
    effects,
    price
    }) {
    if (!name) throw Error('Name must be specified')
    return {
        name,
        description,
        effects,
        price
    }

}
import {IONIC_DIRECTIVES} from 'ionic-angular'
import {Component, Input} from 'angular2/core'
import {Buyable} from '../../components/buyable'
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
          <button class="button button-dark" (clic)=buy()>Acheter</button>
        </ion-list>
      </ion-card-content>
    </ion-card>
  `,
    directives: [Buyable,IONIC_DIRECTIVES]
})

export class SpellComponent {
    @Input()
    spell
}

