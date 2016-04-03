/**
 * Created by bluedragonfly on 3/25/16.
 */
import {Component, Input} from "angular2/core";
import {Store} from './store';
import {Subject, Observable} from 'rxjs'

@Component({
    selector: 'buyable',
    template: `
    <div>
        <div>{{level | async | json}}</div>
        <img src={{item.name}}.png />
        <h3>{{item.name}}</h3>
        <h4>{{item.price}}</h4>
        <button (click)="buy()">Acheter</button>
    </div>
    `
})
export class Buyable {
    @Input() item

    constructor(store:Store) {
        this.store = store;
        this.level = this.store.state.map(state => {console.log("State:",state); return state.hero.level });
    }

    buy() {
        this.store.dispatch({type: 'LEVEL_UP'});
        /*
         * Need to get player money verify if he has enough money, and then, set it minus the item price
         * increment lvl of this item and rec        this.storage = new Storage(LocalStorage); vomp this.storage = new Storage(LocalStorage);ute stats
         *
         */
    }
}