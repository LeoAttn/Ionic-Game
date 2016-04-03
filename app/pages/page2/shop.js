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
    <div>Money : {{money | async}} $</div>
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
        this.money = this.store.state.map(state => {return state.hero.money });
        this.store.addRoute('BUY_ITEM', this.buyItem);
    }

    buyItem(prev, action){
        if(prev.hero.money >= action.item.price){
            prev.hero.money = prev.hero.money - action.item.price;
            prev.hero.inventory.add(action.item);
            return prev;
        }
        action.error = "Not Enough Money";
    }
}
