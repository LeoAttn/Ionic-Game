/**
 * Created by bluedragonfly on 3/25/16.
 */
import {Component, Input} from "angular2/core";
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {ShopService} from './../../components/shop-service';
import {Store} from '../../store';

@Component({
    selector: 'buyable',
    template: `
    <div>

        <h3>{{item.name}}</h3>
        <h4>{{item.price}}</h4>
        <div *ngIf="item.price < money">
            <button (click)="buy()">Acheter</button>
        </div>
        <div *ngIf="item.price > money">
            <button disabled (click)="buy()">Acheter</button>
        </div>
    </div>
    `,
    directives: [IONIC_DIRECTIVES]
})

export class Buyable {
    @Input() item;

    constructor(shopService:ShopService, store:Store) {
        this.shopService = shopService;
        this.store = store;

        this.store.state.map(state => state.hero.money).subscribe(money => this.money = money);
    }

    buy(){
        console.log("Type Item : ", this.item.type);
        if(this.item.type == "arm"){
            this.shopService.dispatch({type: 'BUY_ARM', item : this.item});
        }
        else if(this.item.type =="equipement"){
            this.shopService.dispatch({type: 'BUY_ITEM', item : this.item});
        }
    }
}