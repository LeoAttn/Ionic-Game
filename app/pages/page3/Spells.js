/**
 * Created by Guillaume on 25/03/2016.
 */
import {Component} from 'angular2/core'
import {createSpell, SpellComponent} from '../Components_Models/SpellsCreator'
@Component({
    selector: 'spell-list',
    template: `
    <spell *ngFor="#spell of spells" [spell]=spell></spell>
  `,
    directives: [SpellComponent]
})

export class SpellList {
    constructor() {
        this.spells = [
            createSpell({
                name: 'Fireball',
                effects: [],
                price: 300
            }),

            createSpell({
                name: 'Chain Lightning',
                effects: [],
                price: 700
            })
        ]
    }
}


