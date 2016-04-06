/**
 * Created by bluedragonfly on 3/25/16.
 */
import {Component, Input} from 'angular2/core'
import {Buyable} from "./buyable"
import {ShopService} from "./../../components/shop-service"

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
    constructor(shopService : ShopService) {
        this.shopService = shopService;
        this.items = this.shopService.items;
    }
}
