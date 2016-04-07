/**
 * Created by Guillaume on 25/03/2016.
 */
import {Component} from 'angular2/core'
import {SpellComponent} from '../Components_Models/SpellsCreator'
import {HeroService} from '../../components/hero-service'
import {Store} from './../../store';

@Component({
    selector: 'spell-list',
    template: `
    <spell *ngFor="#spell of spells | async" [spell]=spell></spell>
  `,
    directives: [SpellComponent]
})

export class SpellList {
    constructor(store: Store) {
        this.store = store;
        this.heroData = this.store.state.map(state => state.hero);
        this.monsterData = this.store.state.map(state => state.monster);
        this.spells = this.heroData.map( hero =>[
            {
                name: 'X2',
                description: "attaque X2 pendant 30sec",
                effects: hero.attack * 2,
                price: 1000 * hero.level,
                cooldown: 600, //secondes
                timeEffect: 30,
                status: "Acheter"

            },

            {
                name: 'fireball',
                description: "inflige 1000 X lvl à l'ennemi",
                effects: [],
                price: 10000 * hero.level,
                cooldown: 1800, //secondes
                status: "Acheter"
            },

            {
                name: 'Warrior soul',
                description: "dps des armes X 3 pendant 1min",
                effects: [],
                price: 100000 * hero.level,
                cooldown: 3600, //seconde
                timeEffect: 60,
                status: "Acheter"
            },

            {
                name: "Punch of King",
                description: " inflige attaque X lvl",
                effects: hero.attack * hero.level,
                price: 1000000 * hero.level,
                cooldown: 1200, // secondes
                status: "Acheter"
            },

            {
                name: "Zeus roar",
                description: "divise la vie de l'ennemi par le lvl actuel",
                effect: [],
                price: 10000000 * this.heroData.level,
                cooldown: 86400, //secondes
                status: "Acheter"
            }
        ])
    }
}


