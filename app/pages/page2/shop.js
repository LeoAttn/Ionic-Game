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
        <div>ARMS : </div>
        <buyable *ngFor="#arm of arms | async" [item]=arm></buyable>
        <div>EQUIPEMENTS : </div>
        <buyable *ngFor="#equipement of equipements | async" [item]=equipement></buyable>
    </ul>
    `
})

export class Shop {
    constructor(shopService : ShopService) {
        this.shopService = shopService;
        this.arms = this.shopService.arms;
        this.equipements = this.shopService.equipements;
    }
}
