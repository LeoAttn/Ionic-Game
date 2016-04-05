/**
 * Created by bluedragonfly on 3/25/16.
 */
import {Component, Input} from 'angular2/core'
import {Buyable} from "./buyable"
import {Store} from "./../../store"

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
    constructor(store:Store) {
        this.store = store;
        this.items = [
            {
                name: "Doigt",//Un clic supplémentaire par doigt,
                price: 1,
                type :"equipement"
            },
            {
                name: "Bras Mécanique",//Structure de base
                price: 10,
                type :"equipement"
            },
            {
                name: "",//
                price: 100,
                type :"equipement"
            }
        ];
        this.store.addRoute('BUY_ITEM', this.buyItem);
    }



    buyItem(prev, action){

        if(prev.hero.money >= action.item.price){
            prev.hero.money = prev.hero.money - action.item.price;
            prev.hero.inventory[action.item.type].push(action.item);
            console.log(prev.hero.inventory);
        }
        action.error = "Not Enough Money";
        return prev;
    }
}
