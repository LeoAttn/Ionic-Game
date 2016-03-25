/**
 * Created by Guillaume on 25/03/2016.
 */
export function createSpell({
    name,
    effects,
    price
    }) {
    if (!name) throw Error('Name must be specified')
    return {
        name,
        effects,
        price
    }

}
import {Component, Input} from 'angular2/core'
@Component({
    selector: 'spell',
    template: `
    <div>
      <h1>{{spell.name}}</h1>
      <h3>Effects</h3>
      <h4 *ngFor="#effect of spell.effects">{{effect}}</h4>
      <h3>Costs : {{spell.price}}</h3>
    </div>
  `
})

export class SpellComponent {
    @Input()
    spell
}

