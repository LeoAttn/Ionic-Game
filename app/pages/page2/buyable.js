/**
 * Created by bluedragonfly on 3/25/16.
 */
import {Component, Input} from "angular2/core";
import {ShopService} from './../../components/shop-service';

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

    constructor(shopService:ShopService) {
        this.shopService = shopService;
    }

    buy(){
        this.shopService.dispatch({type: 'BUY_ITEM', item : this.item});
    }
}