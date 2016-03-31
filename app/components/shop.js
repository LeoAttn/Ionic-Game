/**
 * Created by bluedragonfly on 3/25/16.
 */
import {Component, Input} from 'angular2/core'
import {Buyable} from "./buyable"

@Component({
    selector: 'shop',
    directives: [Buyable],
    template: `
    <ul>
        <buyable *ngFor="#item of items" [item]=item></buyable>
    </ul>
    `
})

export class Shop {
    constructor() {
        this.items = [
            {
                name: "Doigt",//Un clic supplémentaire par doigt,
                price: 1
            },
            {
                name: "Bras Mécanique",//Structure de base
                price: 10
            },
            {
                name: "",//
                price: 100
            }
        ];
    }
}
