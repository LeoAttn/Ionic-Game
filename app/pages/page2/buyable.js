/**
 * Created by bluedragonfly on 3/25/16.
 */
import {Component, Input} from "angular2/core";
import {Store} from './../../store';

@Component({
    selector: 'buyable',
    template: `
    <div>
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
    }

    buy(){
        this.store.dispatch({type: 'BUY_ITEM', item : this.item});
    }
}