/**
 * Created by Guillaume on 25/03/2016.
 */
import {Component} from 'angular2/core'
import {SpellComponent} from '../Components_Models/SpellsCreator'
import {HeroService} from '../../components/hero-service'

@Component({
    selector: 'spell-list',
    template: `
    <spell *ngFor="#spell of spells | async" [spell]=spell></spell>
  `,
    directives: [SpellComponent]
})

export class SpellList {
    constructor(heroService:HeroService) {
        this.spells = heroService.data.map(heroData => [
            {
                name: 'X2',
                description: "attaque X2 pendant 30sec",
                effects: heroData.attackDamage * 2,
                price: 1000 * heroData.level,
                cooldown: 600, //secondes
                status: "Acheter"
            },

            {
                name: 'fireball',
                description: "inflige 1000 X lvl à l'ennemi",
                effects: [],
                price: 10000 * heroData.level,
                cooldown: 1800, //secondes
                status: "Acheter"
            },

            {
                name: 'Warrior soul',
                description: "dps des armes X 3 pendant 1min",
                effects: [],
                price: 100000 * heroData.level,
                cooldown: 3600, //seconde
                status: false
            },

            {
                name: "Punch of King",
                description: " inflige attaque X lvl",
                effects: heroData.attackDamage * heroData.level,
                price: 1000000 * heroData.level,
                cooldown: 1200, // secondes
                status: false
            },

            {
                name: "Zeus roar",
                description: "divise la vie de l'ennemi par le lvl actuel",
                effect: [],
                price: 10000000 * heroData.level,
                cooldown: 86400, //secondes
                status: false
            }
        ])
    }
}


